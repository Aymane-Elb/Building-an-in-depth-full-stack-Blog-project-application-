const mockUrbanIssues = [
  {
    id: "1", // Added unique ID, crucial for React lists
    name: "nid-de-poule-avenue-republique",
    title: "Nid-de-poule dangereux Avenue de la République",
    thumbnail: "/images/damage1.jpg", 
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
    id: "2", // Added unique ID
    name: "eclairage-defectueux-parc-central",
    title: "Éclairage défectueux au Parc Central",
    thumbnail: "/images/damage2.jpeg", // This path looks correct if the image exists
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
    id: "3", // Added unique ID
    name: "graffiti-ecole-primaire",
    title: "Graffitis sur le mur de l'école primaire",
    thumbnail: "/images/graffiti.jpg", // <--- CHANGED THIS PATH
    category: "Propreté",
    date: "30 avril 2025",
    location: "École Jean Moulin, Rue des Lilas",
    status: "Résolu",
    content: [
      "Des graffitis à caractère inapproprié sont apparus sur le mur extérieur de l'école primaire face à l'entrée principale.",
      "Les parents d'élèves ont exprimé leur inquiétude concernant ces inscriptions visibles par les enfants chaque jour.",
      "Suite à la mobilisation des habitants du quartier, la mairie a envoyé une équipe de nettoyage qui a effacé les graffitis le jour même du signalement."
    ],
  },
  // Added a fourth item for testing the "Load More" functionality properly
  {
    id: "4", // Added unique ID
    name: "trottoir-endommage",
    title: "Trottoir endommagé près du marché",
    thumbnail: "/images/sidewalk.jpg", // <--- New image
    category: "Voirie",
    date: "10 mai 2025",
    location: "Rue du Commerce, devant le marché",
    status: "Non résolu",
    content: [
      "Une large fissure et des dalles soulevées rendent le trottoir dangereux pour les piétons, surtout les personnes âgées.",
      "Plusieurs trébuchements ont été observés. Le problème est aggravé par le passage fréquent de véhicules de livraison.",
      "Un signalement a été envoyé mais le problème persiste."
    ],
  },
  {
    id: "5", // Added unique ID
    name: "poubelle-deversante",
    title: "Poubelle publique débordante",
    thumbnail: "/images/trash.jpg", // <--- New image
    category: "Propreté",
    date: "8 mai 2025",
    location: "Place de la Liberté, à côté de la fontaine",
    status: "Non résolu",
    content: [
      "La poubelle publique est constamment pleine et des déchets s'accumulent autour, attirant des nuisibles.",
      "Le ramassage semble insuffisant pour la fréquentation de la place. L'odeur est également un problème, surtout par temps chaud.",
      "Les habitants du quartier demandent une fréquence de ramassage accrue."
    ],
  },
  {
    id: "6", // Added unique ID
    name: "lampadaire-clignotant",
    title: "Lampadaire clignotant rue Victor Hugo",
    thumbnail: "/images/flashing_light.jpg", // <--- New image
    category: "Éclairage Public",
    date: "12 mai 2025",
    location: "Rue Victor Hugo, près du numéro 25",
    status: "En cours",
    content: [
      "Un lampadaire clignote de manière intermittente toute la nuit, provoquant une nuisance visuelle et une mauvaise illumination.",
      "Le problème est récent et semble être un dysfonctionnement électrique. Cela affecte la visibilité et le confort des résidents.",
      "Un technicien a été alerté et une intervention est planifiée."
    ],
  },
];

export default mockUrbanIssues;