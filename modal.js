function validerFormulaireAjout() {
  const formAjouterPhoto = document.querySelector(".form-ajoutPhoto");
  const output = document.querySelector("#output");
  previewImg();

  formAjouterPhoto.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = document.getElementById("title");
    // Récupération du token
    let token = window.localStorage.getItem("authToken");

    // Crée un objet FormData pour capturer les données du formulaire
    const formData = new FormData(formAjouterPhoto);
  });
}
validerFormulaireAjout();

// Fonction pour charger les catégories venant de l'API aujout photo
async function chargerCategorie() {
  const categorieSelect = document.getElementById("categorie");
  const reponse = await fetch("http://localhost:5678/api/categories");
  const datas = await reponse.json();

  // Vérifier si les catégories ont été chargées
  let categoriesChargees = false;

  // Charger les catégories au click sur le select
  categorieSelect.addEventListener("focus", () => {
    if (!categoriesChargees) {
      //récupérer les catégorie
      for (let i = 0; i < datas.length; i++) {
        const data = datas[i];

        const option = document.createElement("option");
        option.value = data.id;
        option.innerText = data.name;

        categorieSelect.appendChild(option);
      }
      categoriesChargees = true;
    }
  });
}
// Fonction pour prévisualisation d'image
function previewImg() {
  const uploadButton = document.querySelector(".btn-upload");
  const imgIcon = document.getElementById("image-icon");
  const formP = document.querySelector(".form-p");
  const load = document.querySelector(".load");
  const fileInput = document.getElementById("fileInput");

  fileInput.addEventListener("change", (event) => {
    // Récupèration du premier fichier sélectionné par l'utilisateur
    const file = event.target.files[0];

    if (file) {
      const baliseImage = document.createElement("img");
      // Création d'un nouvel objet FileReader pour lire le fichier
      const reader = new FileReader();

      // Définir ce qui se passe lorsque le fichier est chargé
      reader.onload = function (e) {
        baliseImage.src = e.target.result; // Définir la source de l'image à l'URL du fichier
        load.innerHTML = ""; // Effacer le contenu précédent
        load.appendChild(baliseImage); // Ajouter l'image à la div load

        // Masquer les éléments non nécessaires
        imgIcon.style.display = "none";
        uploadButton.style.display = "none";
        formP.style.display = "none";
        fileInput.style.display = "none";
      };

      // Lire le fichier en tant qu'URL de données pour affichage
      reader.readAsDataURL(file);
    }
  });
}

// Fonction supprimer projets dans la modal Galerie Photo
function deleteProjetGaleriPhoto() {
  const boutonDelete = document.querySelectorAll(
    ".fa-solid.fa-trash-can.fa-2xs"
  );

  for (let i = 0; i < boutonDelete.length; i++) {
    boutonDelete[i].addEventListener("click", async () => {
      // Récupération du token
      let token = window.localStorage.getItem("authToken");

      // Récupération balise parent
      const figureElement = boutonDelete[i].parentElement;

      // Récupérer l'ID du projet à partir de l'attribut data-id
      const projetID = figureElement.getAttribute("data-id");

      if (token) {
        // Appel de la fonction fetch avec toutes les informations nécessaires
        const reponse = await fetch(
          `http://localhost:5678/api/works/${projetID}`,
          {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
            accept: "*/*",
          }
        );

        if (reponse.ok) {
          figureElement.remove();
        } else {
          alert("Une erreur est survenu ");
        }
      }
    });
  }
}
deleteProjetGaleriPhoto();

//Fonction pour choisir la modal
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
boutonAjoutPhoto.addEventListener("click", () => {
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
boutonModier.addEventListener("click", async () => {
  ouvrirModal(projets);
  chargerCategorie();
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

  modal.addEventListener("click", (event) => {
    if (
      event.target === fermerModalGalerie ||
      event.target === fermerModalAjout ||
      (!modalGaleriePhoto.contains(event.target) &&
        !modalAjoutPhoto.contains(event.target))
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
