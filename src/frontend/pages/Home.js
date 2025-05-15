import React from "react";
import GsapButton from "../components/GsapButton";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden">

      <div className="w-full bg-white text-black text-center py-20 px-4">
        <h1 className="text-5xl md:text-7xl font-semibold mb-2">UrbanSignal</h1>
        <p className="text-xl md:text-2xl font-light mb-6">La voix des citoyens. En temps réel.</p>
        
        <div className="flex justify-center items-center space-x-4 mb-10">
          <GsapButton text={'Commencer'} darkMode={true} to={'/Signalez'}  />
          <GsapButton text={'En savoir plus'}  darkMode={true}   to={'/About'} />
        </div>
        
        <div className="w-full mx-auto mt-8 relative">
          <img
            src="/images/urbain1.jpg"
            alt="Plateforme UrbanSignal"
            className="w-screen h-screen rounded-lg shadow-xl"
          />
          {/* PRO text effect like Apple */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <h2 className="text-8xl md:text-9xl font-bold tracking-tight opacity-20">PRO</h2>
          </div>
        </div>
        <div className="w-full mx-auto mt-8 relative">
          <img
            src="/images/urbain2.jpg"
            alt="Plateforme UrbanSignal"
            className="w-screen h-screen rounded-lg shadow-xl"
          />
          {/* PRO text effect like Apple */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <h2 className="text-8xl md:text-9xl font-bold tracking-tight opacity-20">PRO</h2>
          </div>
        </div>
      </div>


      {/* Product Showcase Section - Split Layout */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 bg-white m-2">
        {/* Left Section - Dark */}
        <div className="bg-black text-white text-center py-16 px-8">
          <h2 className="text-3xl md:text-4xl font-semibold mb-1">Carte Interactive</h2>
          <p className="text-lg font-light mb-4">Impossibly fine. Incredibly powerful.</p>
          <GsapButton text={'Reportez'} darkMode={false} to={'/Signalez'}/>
          <div className="w-full max-w-md mx-auto mt-4">
            <img
              src="/images/urbain1.jpg"
              alt="Carte interactive"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
        
        {/* Right Section - Light */}
        <div className="bg-gray-100 text-black text-center py-16 px-8">
          <h2 className="text-3xl md:text-4xl font-semibold mb-1">Signalement <span className="text-gray-500">rapide</span></h2>
          <p className="text-lg font-light mb-4">Votre idée. Notre solution. Ensemble.</p>
          <GsapButton text={'Signalez votre probleme'} darkMode={true} to={'/Signalez'}/>
          <div className="w-full max-w-md mx-auto mt-4">
            <img
              src="/images/urbain2.jpg"
              alt="Signalement rapide"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Wave divider section */}
      <div className="relative w-full h-64 bg-white overflow-hidden">
        {/* Background image layer */}
        <div className="absolute inset-0 opacity-20">
          <img
            src="/images/blog1.jpg"
            alt="Background texture"
            className="w-full h-full object-cover"
          />
        </div>
        {/* SVG Wave */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-4xl md:text-6xl font-bold text-black text-center">Ensemble pour notre ville</h2>
        </div>
      </div>
      <Footer/>
    </div>
  );
}