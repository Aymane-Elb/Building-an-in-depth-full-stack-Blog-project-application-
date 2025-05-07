import React from "react";
import GsapButton from "../components/GsapButton";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-screen overflow-x-hidden">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center py-16 px-6 text-center bg-white w-full">
        <h1 className="text-4xl font-bold mb-4">
          Signalez un Problème Urbain
        </h1>
        <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
          Améliorons notre ville ensemble. Signalez facilement les incidents en un clic.
        </p>
        <div className="flex flex-wrap justify-center gap-6 mb-10">
          <GsapButton text="Commencer" darkMode={true}/>
          <GsapButton text="En savoir plus" darkMode={true} />
        </div>
        {/* Product image */}
        <div className="w-full max-w-4xl mx-auto">
          <img
            src="/images/blog1.jpg"
            alt="une urbaine"
            className="w-full h-auto"
          />
        </div>
      </div>
      
      {/* Wave divider section - Fixed */}
      <div className="relative w-full h-64 bg-gradient-to-r from-pink-500 via-red-500 to-pink-500 overflow-hidden">
        {/* Background image layer */}
        <div className="absolute inset-0 opacity-20">
          <img
            src="/images/blog1.jpg"
            alt="Background texture"
            className="w-full h-full object-cover"
          />
        </div>
        {/* SVG Wave - Fixed */}
        <svg
          className="absolute bottom-0 left-0 w-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            fill="white"
            className="opacity-30"
          ></path>
        </svg>
        {/* Center image */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <img
            src="/images/blog1.jpg"
            alt="Decorative element"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      {/* Add flex-grow to push footer to bottom */}
      <div className="flex-grow"></div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}