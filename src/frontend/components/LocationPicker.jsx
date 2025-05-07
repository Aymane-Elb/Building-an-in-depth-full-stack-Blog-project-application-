import React, { useState, useEffect, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const LocationMarker = ({ onChange , initialPosition}) => 
  {
  const [position, setPosition] = useState(initialPosition);
  const map = useMap();

  const fetchCity = useCallback(async (lat, lng) => 
    {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
      const data = await response.json();
      const city =
        data.address.city ||
        data.address.town ||
        data.address.village ||
        data.address.county ||
        'Unknown';
      onChange({ lat, lng, city });
    } catch (error) {
      console.error('Failed to get location', error);
      onChange({ lat, lng, city: '' });
    }
  }, [onChange]);

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition(e.latlng);
      fetchCity(lat, lng);
    },
    locationfound(e) {
      const { lat, lng } = e.latlng;
      setPosition(e.latlng);
      fetchCity(lat, lng);
    },
  });

  useEffect(() => {
    if (initialPosition && initialPosition.lat !== null && initialPosition.lng !== null) {
      // If we have an initial position, use it
      setPosition(initialPosition);
      map.flyTo([initialPosition.lat, initialPosition.lng], map.getZoom());
    } else {
      // Otherwise try to get current position
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          const latlng = { lat, lng };
          setPosition(latlng);
          map.flyTo([lat, lng], map.getZoom());
          fetchCity(lat, lng);
        },
        (err) => {
          console.warn(`Geolocation failed: ${err.message}`);
        }
      );
    }
  }, [initialPosition, map, fetchCity]);

  return position ? <Marker position={position} /> : null;
};

const LocationPicker = ({ onLocationChange }) => {
  return (
    <div className='border-2 border-black m-10 h-96 max-w-5xl w-full mx-auto'>
      <MapContainer center={[31.630000, -7.990000]} zoom={10} className="h-full w-full">
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker onChange={onLocationChange} />
      </MapContainer>
    </div>
  );
};

export default LocationPicker;
