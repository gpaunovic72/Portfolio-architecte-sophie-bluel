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
