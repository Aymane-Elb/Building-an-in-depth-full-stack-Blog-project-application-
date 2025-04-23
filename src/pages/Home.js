import React from "react";
import GsapButton from "../components/GsapButton";


export default function Home() {
  return (
    <div className="relative w-full">
      <div className="flex flex-col items-center justify-center py-16 px-6 text-center bg-white">
        <h1 className="flex items-center justify-center text-4xl font-bold mb-4">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />

            Signalez un Problème Urbain
        </h1>
        
        {/* Tagline */}
        <p className="text-xl text-gray-700 mb-8">
        Améliorons notre ville ensemble. Signalez facilement les incidents en un clic.
        </p>
        
        {/* CTA buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <GsapButton  text="Commencer" darkMode={true}/>
          <GsapButton text="En savoir plus" darkMode={true} />
        </div>
        
        {/* Product image */}
        <div className="relative w-full max-w-4xl mx-auto">
          <img 
            src="/api/placeholder/900/400" 
            alt="Apple Watch collection showing three watches with different faces and bands" 
            className="w-full"
          />
        </div>
      </div>
      
      {/* Wave divider section */}
      <div className="relative w-full h-64 bg-gradient-to-r from-pink-500 via-red-500 to-pink-500 overflow-hidden">
        {/* First wave layer */}
        <div className="absolute inset-0 opacity-20">
            <path 
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
              fill="currentColor" 
              className="text-white"
            ></path>
        </div>
        
        {/* Second wave layer */}
        <div className="absolute inset-0 opacity-30">
            <path 
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" 
              fill="currentColor" 
              className="text-white"
            ></path>
        </div>
        
        {/* Center heart shape graphic */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <path d="M256 448l-30.164-27.211C118.718 322.442 48 258.61 48 179.095 48 114.221 97.961 64 162.465 64c36.157 0 70.997 17.08 93.535 44.242C278.538 81.08 313.378 64 349.535 64 414.039 64 464 114.221 464 179.095c0 79.516-70.718 143.348-177.836 241.694L256 448z" />
        </div>
      </div>
    </div>
  );
}