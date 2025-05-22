import React from "react";
import GsapButton from "../components/GsapButton";
import Footer from "../components/Footer";

const About = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen w-full bg-gray-50 text-gray-800 font-sans antialiased overflow-x-hidden">
        {/* Hero Section: À Propos */}
        <div className="w-full text-center py-24 md:py-32 px-4 bg-gradient-to-br from-yellow-100 to-white">
          <h1 className="text-5xl md:text-7xl font-extrabold text-yellow-300 mb-6 leading-tight">
            À Propos
          </h1>
          <p className="text-lg md:text-xl font-light max-w-4xl mx-auto text-gray-700 leading-relaxed">
            **UrbanSignal** est une plateforme citoyenne dédiée à la détection, la remontée et le suivi des problèmes urbains. Notre objectif : créer un lien direct entre les citoyens et les autorités locales, pour une ville plus réactive, propre et sécurisée.
          </p>
        </div>

        {/* Section: Notre Mission */}
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 md:gap-16">
            <div className="order-2 md:order-1 bg-white p-8 md:p-12 rounded-xl shadow-lg flex flex-col justify-center h-full">
              <h2 className="text-3xl md:text-4xl font-bold text-yellow-300 mb-4">Notre Mission</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Offrir aux citoyens un outil simple et intuitif pour signaler tout problème urbain : routes dégradées, éclairage public défaillant, déchets abandonnés, etc. Nous croyons en un engagement collectif pour une ville meilleure et en une participation citoyenne active.
              </p>
              <div className="mt-6">
                <GsapButton text="Signaler un Problème" darkMode={true} to="/Signalez" />
              </div>
            </div>
            <div className="order-1 md:order-2 flex items-center justify-center p-4">
              <img
                src="/images/urbain1.jpg"
                alt="Notre mission - Engagement citoyen"
                className="w-full h-auto max-w-md rounded-xl shadow-xl border-4 border-white transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>

        {/* Section: Nos Valeurs */}
        <div className="bg-yellow-300 text-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 md:gap-16">
              <div className="flex items-center justify-center p-4">
                <img
                  src="/images/urbain2.jpg"
                  alt="Nos valeurs - Transparence et Réactivité"
                  className="w-full h-auto max-w-md rounded-xl shadow-xl border-4 border-yellow-200 transform hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="bg-white p-8 md:p-12 rounded-xl shadow-lg flex flex-col justify-center h-full">
                <h2 className="text-3xl md:text-4xl font-bold text-yellow-300 mb-4">Nos Valeurs</h2>
                <ul className="list-disc list-inside text-lg leading-relaxed space-y-2 text-gray-600">
                  <li>**Transparence:** Chaque signalement est traçable.</li>
                  <li>**Réactivité:** Des délais de traitement optimisés.</li>
                  <li>**Responsabilité:** Suivi rigoureux des actions.</li>
                  <li>**Collaboration:** Unir citoyens et autorités.</li>
                </ul>
                <p className="text-lg mt-4 leading-relaxed">
                  UrbanSignal place l'utilisateur au cœur de l'action pour que chaque signalement soit traité avec sérieux et suivi dans le temps, renforçant ainsi la confiance et l'efficacité.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action (Optional, can be added here) */}
        {/* <div className="w-full text-center py-16 bg-gray-100">
          <h3 className="text-3xl font-semibold text-gray-800 mb-6">Prêt à Améliorer Votre Ville ?</h3>
          <GsapButton text="Rejoignez UrbanSignal" darkMode={false} to="/Register" />
        </div> */}

        <Footer />
      </div>
    </>
  );
};

export default About;