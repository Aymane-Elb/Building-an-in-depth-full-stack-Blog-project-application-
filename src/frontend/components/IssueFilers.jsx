import React from 'react';


const IssueFilters = ({ onFilterChange }) => {
  const categories = ["Tous", "Voirie", "Éclairage Public", "Propreté"];
  const statuses = ["Tous", "Non résolu", "En cours", "Résolu"];
  
  return (
    <div className="mb-6 flex flex-wrap items-center gap-4">
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-gray-700 font-medium">Catégorie:</span>
        {categories.map(category => (
          <button 
            key={category}
            onClick={() => onFilterChange('category', category)}
            className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
          >
            {category}
          </button>
        ))}
      </div>
      
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-gray-700 font-medium">Statut:</span>
        {statuses.map(status => (
          <button 
            key={status}
            onClick={() => onFilterChange('status', status)}
            className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
          >
            {status}
          </button>
        ))}
      </div>
    </div>
  );
};

export default IssueFilters;