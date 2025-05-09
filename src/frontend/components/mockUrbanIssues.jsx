
const mockUrbanIssues = [
  {
    name: "nid-de-poule-avenue-republique",
    title: "Nid-de-poule dangereux Avenue de la République",
    thumbnail: "/api/placeholder/400/250", // Remplacer par le chemin réel des images
    category: "Voirie",
    date: "3 mai 2025",
    location: "Avenue de la République, Paris 11e",
    status: "Non résolu",
    content: [
      "Un nid-de-poule profond est apparu après les dernières pluies. Il présente un danger pour les cyclistes et les voitures.",
      "La profondeur est d'environ 15cm et sa largeur de 50cm. Plusieurs personnes ont déjà signalé des dommages à leurs véhicules.",
      "La municipalité a été informée mais aucune intervention n'est encore programmée."
    ],
  },
  {
    name: "eclairage-defectueux-parc-central",
    title: "Éclairage défectueux au Parc Central",
    thumbnail: "/api/placeholder/400/250",
    category: "Éclairage Public",
    date: "1 mai 2025",
    location: "Parc Central, entrée nord",
    status: "En cours",
    content: [
      "Plusieurs lampadaires ne fonctionnent plus dans la zone nord du parc, créant une zone d'insécurité le soir.",
      "Le problème persiste depuis trois semaines malgré plusieurs signalements. Les promeneurs évitent désormais cette zone après 19h.",
      "Les services techniques ont confirmé avoir reçu le signalement et prévoient une intervention dans les jours qui viennent."
    ],
  },
  {
    name: "graffiti-ecole-primaire",
    title: "Graffitis sur le mur de l'école primaire",
    thumbnail: "/api/placeholder/400/250",
    category: "Propreté",
    date: "30 avril 2025",
    location: "École Jean Moulin, Rue des Lilas",
    status: "Résolu",
    content: [
      "Des graffitis à caractère inapproprié sont apparus sur le mur extérieur de l'école primaire face à l'entrée principale.",
      "Les parents d'élèves ont exprimé leur inquiétude concernant ces inscriptions visibles par les enfants chaque jour.",
      "Suite à la mobilisation des habitants du quartier, la mairie a envoyé une équipe de nettoyage qui a effacé les graffitis le jour même du signalement."
    ],
  }
];

export default mockUrbanIssues;