import React, { useState, useEffect } from 'react';
import UrbanIssueCard from '../components/UrbanIssueCard';
import IssueFilters from '../components/IssueFilers';
import AddIssueButton from '../components/AddIssueButton';
import Footer from '../components/Footer';

// Import direct du tableau des problèmes urbains
// Vérifie le chemin - assure-toi qu'il correspond à l'emplacement réel du fichier
import urbanIssuesData from '../components/mockUrbanIssues';

const UrbanIssuesPage = () => {
  console.log("Type de urbanIssuesData:", typeof urbanIssuesData);
  console.log("Est-ce un tableau?", Array.isArray(urbanIssuesData));
  console.log("Contenu:", urbanIssuesData);

  // État local pour les filtres et les problèmes
  const [filter, setFilter] = useState({ category: 'Tous', status: 'Tous' });
  const [issues, setIssues] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      // Vérifier que les données importées sont un tableau
      if (Array.isArray(urbanIssuesData)) {
        setIssues(urbanIssuesData);
      } else {
        console.error("Les données importées ne sont pas un tableau:", urbanIssuesData);
        setError("Erreur de format de données");
      }
    } catch (err) {
      console.error("Erreur lors du chargement des données:", err);
      setError(err.message || "Erreur inconnue");
    }
  }, []);

  // Gestionnaire pour mettre à jour les filtres
  const handleFilterChange = (type, value) => {
    setFilter(prev => ({ ...prev, [type]: value }));
  };

  // Filtrer les problèmes urbains en fonction des critères sélectionnés
  const filteredIssues = issues.length > 0 ? issues.filter(issue => {
    const categoryMatch = filter.category === 'Tous' || issue.category === filter.category;
    const statusMatch = filter.status === 'Tous' || issue.status === filter.status;
    return categoryMatch && statusMatch;
  }) : [];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow">
        <div className="container px-5 py-8 mx-auto">
          {/* En-tête de la page */}
          <div className="text-center mb-12">
            <h1 className="sm:text-4xl text-3xl font-bold mb-4 text-gray-900">
              Signalements Urbains
            </h1>
            <div className="w-16 h-1 bg-indigo-500 rounded mt-2 mb-6 mx-auto"></div>
            <p className="text-gray-600 max-w-xl mx-auto">
              Découvrez et signalez les problèmes urbains dans votre quartier. Ensemble, améliorons notre cadre de vie quotidien.
            </p>
          </div>

          {error ? (
            <div className="text-center py-10">
              <p className="text-red-500">Erreur: {error}</p>
            </div>
          ) : (
            <>
              {/* Composant de filtres */}
              <IssueFilters onFilterChange={handleFilterChange} />
              
              {/* Grille de cartes de problèmes urbains */}
              <div className="flex flex-wrap justify-center -m-4">
                {filteredIssues.map((issue, index) => (
                  <UrbanIssueCard key={index} issue={issue} />
                ))}
              </div>
              
              {/* Message si aucun résultat */}
              {filteredIssues.length === 0 && (
                <div className="text-center py-10">
                  <p className="text-gray-500">Aucun problème urbain ne correspond à vos critères.</p>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
      {/* Bouton d'ajout flottant */}
      <AddIssueButton />
    </div>
  );
};

export default UrbanIssuesPage;