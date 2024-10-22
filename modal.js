function choixModal(nomModal) {
  const modalAjoutPhoto = document.getElementById("modal-ajoutPhoto");
  const modalGaleriePhoto = document.getElementById("modal-galeriePhoto");

  if (nomModal === "ajout") {
    modalAjoutPhoto.style.display = "flex";
    modalGaleriePhoto.style.display = "none";
  } else if (nomModal === "galerie") {
    modalAjoutPhoto.style.display = "none";
    modalGaleriePhoto.removeAttribute("style");
  } else {
    modalAjoutPhoto.style.display = "none";
    modalGaleriePhoto.removeAttribute("style");
  }
}

// Affichage de la modal ajout photo après le click
const boutonAjoutPhoto = document.querySelector(".btn-ajouterPhoto");
boutonAjoutPhoto.addEventListener("click", (Event) => {
  Event.preventDefault();
  choixModal("ajout");
});

// Variable pour vérifier si les projets ont déjà été chargés
let projetsCharger = false;

// Ouvrir la modal
function ouvrirModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "flex";
  // Ajouter un attribut aria-hidden à false pour l'accessibilité
  modal.setAttribute("aria-hidden", "false");
}
// Ouvrir la modal avec le click sur le btn Modifier
const boutonModier = document.querySelector(".btn-modifier");
boutonModier.addEventListener("click", async (event) => {
  event.preventDefault();
  ouvrirModal(projets);
});

//Fonction fermer la modal
function fermerLaModal() {
  modal.style.display = "none";
  // Ajouter un attribut aria-hidden à false pour l'accessibilité
  modal.setAttribute("aria-hidden", "true");
  choixModal("galerie");
}

//Fonction pour gérer la fermeture
function gererFermetureModal() {
  const modal = document.getElementById("modal");
  const modalGaleriePhoto = document.getElementById("modal-galeriePhoto");
  const modalAjoutPhoto = document.getElementById("modal-ajoutPhoto");
  const fermerModalGalerie = document.querySelector(
    "#modal-galeriePhoto .fa-solid.fa-xmark.fa-2xl"
  );
  const fermerModalAjout = document.querySelector(
    "#modal-ajoutPhoto .fa-solid.fa-xmark.fa-2xl"
  );

  modal.addEventListener("click", (Event) => {
    Event.preventDefault();

    if (
      Event.target === fermerModalGalerie ||
      Event.target === fermerModalAjout ||
      (!modalGaleriePhoto.contains(Event.target) &&
        !modalAjoutPhoto.contains(Event.target))
    ) {
      fermerLaModal();
    }
  });
}
gererFermetureModal();

// Récupération des projets pour l'affichage dans la modal
const reponse = await fetch("http://localhost:5678/api/works");
const projets = await reponse.json();
genererProjetsModal(projets);

function genererProjetsModal(projets) {
  for (let i = 0; i < projets.length; i++) {
    const projet = projets[i];

    // Récupération de l'élément du DOM pour accueillir les projets
    const modalGallery = document.querySelector(".modal-gallery");

    // Création d’une balise dédiée à un projet
    const projetElementModal = document.createElement("figure");
    projetElementModal.dataset.id = projets[i].id;

    // Création des balises
    const imageElement = document.createElement("img");
    imageElement.src = projet.imageUrl;
    const baliseI = document.createElement("a");
    baliseI.classList.add("fa-solid", "fa-trash-can", "fa-2xs");
    baliseI.href = "#";

    modalGallery.appendChild(projetElementModal);
    projetElementModal.appendChild(imageElement);
    projetElementModal.appendChild(baliseI);
  }
}
