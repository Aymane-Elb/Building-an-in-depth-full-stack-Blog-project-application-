import React, { useState, useEffect } from 'react';
import UrbanIssueCard from '../components/UrbanIssueCard';
import IssueFilters from '../components/IssueFilers';

// Données fictives pour simuler les problèmes urbains
const mockIssues = [
  {
    id: 1,
    title: "Nid de poule dangereux",
    category: "Voirie",
    status: "Non résolu",
    location: "Rue Victor Hugo, 75011",
    content: ["Ce nid de poule représente un danger pour les cyclistes et les véhicules. Présent depuis plusieurs semaines, il s'agrandit à chaque pluie."],
    thumbnail: "/api/placeholder/800/600",
    dateCreated: "2025-04-28",
    votes: 24,
    views: 89
  },
  {
    id: 2,
    title: "Lampadaire défectueux",
    category: "Éclairage Public",
    status: "En cours",
    location: "Avenue de la République, 75003",
    content: ["Le lampadaire à l'angle de la rue ne fonctionne plus depuis deux semaines, rendant ce passage dangereux la nuit."],
    thumbnail: "/api/placeholder/800/600",
    dateCreated: "2025-05-01",
    votes: 18,
    views: 45
  },
  {
    id: 3,
    title: "Dépôt sauvage d'ordures",
    category: "Propreté",
    status: "Résolu",
    location: "Place des Vosges, 75004",
    content: ["Accumulation de déchets au pied des arbres. Cela attire des nuisibles et dégrade l'image de ce lieu historique."],
    thumbnail: "/api/placeholder/800/600",
    dateCreated: "2025-04-15",
    votes: 31,
    views: 102
  },
  {
    id: 4,
    title: "Trottoir effondré",
    category: "Voirie",
    status: "En cours",
    location: "Boulevard Saint-Germain, 75006",
    content: ["Une partie du trottoir s'est effondrée, créant un risque de chute pour les piétons, particulièrement problématique pour les personnes à mobilité réduite."],
    thumbnail: "/api/placeholder/800/600",
    dateCreated: "2025-05-03",
    votes: 27,
    views: 78
  },
  {
    id: 5,
    title: "Passage piéton effacé",
    category: "Voirie",
    status: "Non résolu",
    location: "Rue de Rivoli, 75001",
    content: ["Les marquages du passage piéton sont presque totalement effacés, posant un problème de sécurité aux carrefours très fréquentés."],
    thumbnail: "/api/placeholder/800/600",
    dateCreated: "2025-04-20",
    votes: 15,
    views: 42
  },
  {
    id: 6,
    title: "Éclairage intermittent",
    category: "Éclairage Public",
    status: "Non résolu",
    location: "Rue Oberkampf, 75011",
    content: ["Les lampadaires de toute la rue s'allument et s'éteignent de façon aléatoire depuis une semaine, créant une ambiance inquiétante."],
    thumbnail: "/api/placeholder/800/600",
    dateCreated: "2025-05-05",
    votes: 22,
    views: 56
  },
  {
    id: 7,
    title: "Poubelles non collectées",
    category: "Propreté",
    status: "Résolu",
    location: "Rue Montorgueil, 75002",
    content: ["Les poubelles de la rue commerçante n'ont pas été collectées depuis quatre jours, provoquant des odeurs et débordements."],
    thumbnail: "/api/placeholder/800/600",
    dateCreated: "2025-04-18",
    votes: 29,
    views: 83
  },
  {
    id: 8,
    title: "Banc public cassé",
    category: "Voirie",
    status: "Résolu",
    location: "Parc des Buttes-Chaumont, 75019",
    content: ["Un banc public présente des lattes cassées qui peuvent blesser les utilisateurs."],
    thumbnail: "/api/placeholder/800/600",
    dateCreated: "2025-04-25",
    votes: 12,
    views: 37
  },
  {
    id: 9,
    title: "Graffitis sur monument",
    category: "Propreté",
    status: "En cours",
    location: "Place de la Bastille, 75012",
    content: ["Des graffitis ont été faits sur le socle du monument, nécessitant un nettoyage spécial pour ne pas endommager la pierre."],
    thumbnail: "/api/placeholder/800/600",
    dateCreated: "2025-05-02",
    votes: 16,
    views: 51
  }
];

const IssuesList = () => {
  const [issues, setIssues] = useState(mockIssues);
  const [filters, setFilters] = useState({
    category: "Tous",
    status: "Tous"
  });
  const [sortOption, setSortOption] = useState("recent");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Filtrer les problèmes en fonction des critères sélectionnés
  useEffect(() => {
    setIsLoading(true);
    
    // Simuler un délai de chargement pour l'effet
    const timer = setTimeout(() => {
      let filteredIssues = [...mockIssues];
      
      // Filtrer par catégorie
      if (filters.category !== "Tous") {
        filteredIssues = filteredIssues.filter(issue => issue.category === filters.category);
      }
      
      // Filtrer par statut
      if (filters.status !== "Tous") {
        filteredIssues = filteredIssues.filter(issue => issue.status === filters.status);
      }
      
      // Filtrer par recherche
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        filteredIssues = filteredIssues.filter(issue => 
          issue.title.toLowerCase().includes(query) || 
          issue.location.toLowerCase().includes(query) || 
          issue.content.some(text => text.toLowerCase().includes(query))
        );
      }
      
      // Trier les résultats
      switch (sortOption) {
        case "recent":
          filteredIssues.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));
          break;
        case "popular":
          filteredIssues.sort((a, b) => b.votes - a.votes);
          break;
        case "mostViewed":
          filteredIssues.sort((a, b) => b.views - a.views);
          break;
        default:
          break;
      }
      
      setIssues(filteredIssues);
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [filters, sortOption, searchQuery]);

  // Gérer les changements de filtre
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  // Gérer les changements de tri
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Signalements urbains</h1>
        <p className="text-gray-600">Découvrez et suivez les problèmes signalés dans votre quartier</p>
      </div>
      
      {/* Barre de recherche */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Rechercher par mot-clé, localisation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-10 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>
      
      {/* Filtres et options de tri */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <IssueFilters onFilterChange={handleFilterChange} />
        
        <div className="flex items-center ml-auto">
          <label htmlFor="sort" className="mr-2 text-gray-700 font-medium">Trier par:</label>
          <select
            id="sort"
            value={sortOption}
            onChange={handleSortChange}
            className="border border-gray-300 rounded-md shadow-sm py-2 pl-3 pr-8 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="recent">Plus récents</option>
            <option value="popular">Plus populaires</option>
            <option value="mostViewed">Plus vus</option>
          </select>
        </div>
      </div>
      
      {/* Affichage des résultats */}
      <div>
        {/* En-tête des résultats */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">
            {issues.length} résultat{issues.length !== 1 ? 's' : ''}
          </h2>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Nouveau signalement
          </button>
        </div>
        
        {/* État de chargement */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        )}
        
        {/* Liste des cartes */}
        {!isLoading && (
          <>
            {issues.length > 0 ? (
              <div className="flex flex-wrap -m-4">
                {issues.map(issue => (
                  <UrbanIssueCard key={issue.id} issue={issue} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 border-2 border-dashed border-gray-300 rounded-lg">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">Aucun résultat trouvé</h3>
                <p className="mt-1 text-gray-500">Essayez de modifier vos filtres ou votre recherche.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default IssuesList;