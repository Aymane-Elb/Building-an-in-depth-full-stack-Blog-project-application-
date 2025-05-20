import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-yellow-50 text-black w-full mt-12 shadow-inner">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10 ">
        {/* Logo and Description */}
        <div>
          <div className="flex items-center mb-4">
            <img 
              src="/images/logo.jpeg" 
              alt="Urbain Signalez Logo" 
              className="h-12 w-12 rounded mr-3" 
            />
            <h3 className="text-2xl font-bold text-gray-800">Urbain Signalez</h3>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">
            Plateforme citoyenne dédiée à la remontée rapide des problèmes urbains. 
            Ensemble, construisons des villes plus sûres, propres et réactives.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-yellow-600 border-b border-yellow-600 pb-1">Navigation</h4>
          <ul>
            <li className="mb-2">
              <Link to="/" className="hover:text-yellow-500 transition">Accueil</Link>
            </li>
            <li className="mb-2">
              <Link to="/Signalez" className="hover:text-yellow-500 transition">Signaler un Problème</Link>
            </li>
            <li className="mb-2">
              <Link to="/articles-list" className="hover:text-yellow-500 transition">Historique des Signalements</Link>
            </li>
            <li className="mb-2">
              <Link to="/about" className="hover:text-yellow-500 transition">À Propos</Link>
            </li>
          </ul>
        </div>

        {/* Contact or Info */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-yellow-600 border-b border-yellow-600 pb-1">Informations</h4>
          <ul className="text-sm text-gray-700">
            <li className="mb-2">support@urbainsignalez.com</li>
            <li className="mb-2">Disponible 7j/7 - 24h/24</li>
            <li>Service gratuit pour tous les citoyens</li>
          </ul>
        </div>
        </div>
      {/* Bottom bar */}
      <div className="border-t border-gray-300 py-4 text-center text-sm text-gray-500">
        © {currentYear} Urbain Signalez. Tous droits réservés.
      </div>
    </footer>
  );
};

export default Footer;
