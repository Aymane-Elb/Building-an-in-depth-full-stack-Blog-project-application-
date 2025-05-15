import React from 'react';

// Constantes utilisées pour styliser les cartes
const statusColors = {
  "Non résolu": "bg-red-100 text-red-800",
  "En cours": "bg-yellow-100 text-yellow-800",
  "Résolu": "bg-green-100 text-green-800"
};

const categoryIcons = {
  "Voirie": (
    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  "Éclairage Public": (
    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  "Propreté": (
    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  ),
  "Propreté": (
    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  )
};

const UrbanIssueCard = ({ issue }) => {
  return (
    <div className="p-4 md:w-1/2 lg:w-1/3 w-full">
      <div className="h-full border border-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="relative">
          <img className="lg:h-48 md:h-36 w-full object-cover object-center" src={issue.thumbnail} alt={issue.title} />
          <div className="absolute top-0 right-0 mt-2 mr-2">
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColors[issue.status]}`}>
              {issue.status}
            </span>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-center mb-2">
            {categoryIcons[issue.category]}
            <span className="tracking-widest text-xs font-medium text-indigo-500">{issue.category}</span>
          </div>
          
          <h2 className="text-lg font-medium text-gray-900 mb-2">{issue.title}</h2>
          
          <div className="flex items-center mb-3 text-sm text-gray-600">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{issue.location}</span>
          </div>
          
          <p className="leading-relaxed mb-3 text-gray-700 line-clamp-2">
            {issue.content[0]}
          </p>
          
          <div className="flex items-center flex-wrap mt-auto pt-3 border-t border-gray-200">
            <a className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0 cursor-pointer hover:text-indigo-600" >
              Voir détails
              <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </a>
            <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1">
              <svg className="w-4 h-4 mr-1" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              42 vues
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UrbanIssueCard;