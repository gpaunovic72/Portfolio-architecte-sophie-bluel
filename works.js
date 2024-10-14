const reponse = await fetch("http://localhost:5678/api/works");
const projets = await reponse.json();

function genererProjets(projets) {
  for (let i = 0; i < projets.length; i++) {
    const projet = projets[i];

    // Récupération de l'élément du DOM pour accueillir les projets
    const sectionGallery = document.querySelector(".gallery");

    // Création d’une balise dédiée à un projet
    const projetElement = document.createElement("figure");
    projetElement.dataset.id = projets[i].id;

    // Création des balises

    const imageElement = document.createElement("img");
    imageElement.src = projet.imageUrl;
    const titleElement = document.createElement("figcaption");
    titleElement.innerText = projet.title;

    sectionGallery.appendChild(projetElement);
    projetElement.appendChild(imageElement);
    projetElement.appendChild(titleElement);
  }
}
genererProjets(projets);

//gestion des boutons
const boutonTous = document.querySelector(".btn-tous");

boutonTous.addEventListener("click", () => {
  const btnTous = projets.filter((projet) => {
    return projet.category;
  });
  document.querySelector(".gallery").innerHTML = "";
  genererProjets(btnTous);
});

const boutonObjets = document.querySelector(".btn-objets");
boutonObjets.addEventListener("click", () => {
  // Filtrer les projets ayant la catégorie "Objets"
  const projetsObjets = projets.filter((projet) => projet.category.id === 1);
  document.querySelector(".gallery").innerHTML = "";
  genererProjets(projetsObjets);
});

const boutonAppartement = document.querySelector(".btn-appartements");
boutonAppartement.addEventListener("click", () => {
  // Filtrer les projets ayant la catégorie "Appartements"
  const projetsAppartements = projets.filter(
    (projet) => projet.category.id === 2
  );
  document.querySelector(".gallery").innerHTML = "";
  genererProjets(projetsAppartements);
});

const boutonHotelsRestaurents = document.querySelector(
  ".btn-hotelsRestaurants"
);
boutonHotelsRestaurents.addEventListener("click", () => {
  // Filtrer les projets ayant la catégorie "Hotels & Restaurents"
  const projetsHotelsRestaurents = projets.filter(
    (projet) => projet.category.id === 3
  );
  document.querySelector(".gallery").innerHTML = "";
  genererProjets(projetsHotelsRestaurents);
});
