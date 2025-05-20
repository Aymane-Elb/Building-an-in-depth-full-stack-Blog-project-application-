import React from "react";
import GsapButton from "../components/GsapButton";
import Footer from "../components/Footer";

const About = () => {
  return (
    <>
 <div className="flex flex-col min-h-screen w-full bg-white text-black overflow-x-hidden">
      <div className="w-full text-center py-20 px-4">
        <h1 className="text-5xl md:text-7xl font-semibold mb-4">À Propos</h1>
        <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto">
          UrbanSignal est une plateforme citoyenne dédiée à la détection, la remontée et le suivi des problèmes urbains. Notre objectif : créer un lien direct entre les citoyens et les autorités locales, pour une ville plus réactive, propre et sécurisée.
        </p>
      </div>

      {/* Section: Mission */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 bg-gray-100 ">
        <div className="bg-white text-black py-16 px-8">
          <h2 className="text-3xl md:text-4xl font-semibold mb-2">Notre Mission</h2>
          <p className="text-lg font-light">
            Offrir aux citoyens un outil simple et intuitif pour signaler tout problème urbain : routes dégradées, éclairage public défaillant, déchets abandonnés, etc. Nous croyons en un engagement collectif pour une ville meilleure.
          </p>
          <div className="justify-center center w-full">
            <GsapButton text="Commencer" darkMode={true} to={"/Signalez"} />
          </div>
        </div>
        <div className="bg-white py-16 px-8 flex items-center justify-center">
          <img 
            src="/images/urbain1.jpg" 
            alt="Notre mission" 
            className="w-full h-auto rounded-lg shadow-lg max-w-md" 
          />
        </div>
      </div>

      {/* Section: Valeurs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 bg-white m-2">
        <div className="bg-black text-white py-16 px-8">
          <h2 className="text-3xl md:text-4xl font-semibold mb-2">Nos Valeurs</h2>
          <p className="text-lg font-light">
            Transparence. Réactivité. Responsabilité. Collaboration. UrbanSignal place l'utilisateur au cœur de l'action pour que chaque signalement soit traité avec sérieux et suivi dans le temps.
          </p>
        </div>
        <div className="bg-black py-16 px-8 flex items-center justify-center">
          <img 
            src="/images/urbain2.jpg" 
            alt="Nos valeurs" 
            className="w-full h-auto rounded-lg shadow-lg max-w-md" 
          />
        </div>
      </div>

      {/* Closing Statement */}
      
      <Footer />
    </div>
        </>
  );
};

export default About;
