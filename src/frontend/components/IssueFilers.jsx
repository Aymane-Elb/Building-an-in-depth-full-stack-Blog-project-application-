import React, { useState } from 'react';

const IssueFilters = ({ onFilterChange, initialCategory = "Tous", initialStatus = "Tous" }) => {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [activeStatus, setActiveStatus] = useState(initialStatus);
  
  const categories = ["Tous", "Voirie", "Éclairage Public", "Propreté"];
  const statuses = ["Tous", "Non résolu", "En cours", "Résolu"];
  
  const categoryIcons = {
    "Tous": (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    ),
    "Voirie": (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    "Éclairage Public": (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    "Propreté": (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    )
  };
  
  const statusColors = {
    "Tous": "bg-gray-100 hover:bg-gray-200 text-gray-800",
    "Non résolu": "bg-red-100 hover:bg-red-200 text-red-800", 
    "En cours": "bg-yellow-100 hover:bg-yellow-200 text-yellow-800",
    "Résolu": "bg-green-100 hover:bg-green-200 text-green-800"
  };
  
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    onFilterChange('category', category);
  };
  
  const handleStatusChange = (status) => {
    setActiveStatus(status);
    onFilterChange('status', status);
  };

  return (
    <div className="mb-6 space-y-4 sm:space-y-0 sm:flex sm:flex-wrap sm:items-center sm:gap-6">
      <div className="space-y-2">
        <h3 className="text-gray-700 font-medium">Filtres</h3>
        <div className="h-0.5 w-16 bg-indigo-500"></div>
      </div>
      
      <div className="space-y-4 sm:space-y-0 sm:flex sm:flex-wrap sm:gap-6">
        <div className="flex flex-col gap-2">
          <span className="text-gray-700 font-medium">Catégorie:</span>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                aria-pressed={activeCategory === category}
                className={`px-3 py-1.5 text-sm rounded-full transition-all flex items-center gap-1.5
                  ${activeCategory === category 
                    ? "ring-2 ring-indigo-500 bg-indigo-50 text-indigo-700 font-medium shadow-sm" 
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700 hover:shadow-sm"}`}
              >
                {categoryIcons[category]}
                {category}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col gap-2">
          <span className="text-gray-700 font-medium">Statut:</span>
          <div className="flex flex-wrap gap-2">
            {statuses.map(status => (
              <button
                key={status}
                onClick={() => handleStatusChange(status)}
                aria-pressed={activeStatus === status}
                className={`px-3 py-1.5 text-sm rounded-full transition-all
                  ${activeStatus === status 
                    ? `${statusColors[status]} ring-2 ring-offset-1 ring-gray-400 font-medium shadow-sm` 
                    : `${statusColors[status]}`}`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueFilters;