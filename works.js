const reponse = await fetch("http://localhost:5678/api/works");
const projets = await reponse.json();

function genererProjets(projets) {
  for (const projet of projets) {
    // Récupération de l'élément du DOM pour accueillir les projets
    const sectionGallery = document.querySelector(".gallery");

    // Création d’une balise dédiée à un projet
    const projetElement = document.createElement("figure");
    projetElement.dataset.id = projet.id;

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

function homePageEdit() {
  // Vérifier si le token est présent dans le localStorage
  let token = window.localStorage.getItem("authToken");

  // Sélection des éléments à modifier
  const boutonLogin = document.querySelector(".login");
  const boutonLogout = document.querySelector(".logout");
  const navEdition = document.querySelector(".nav-edition");
  const boutonModifier = document.querySelector(".btn-modifier");
  const menuCategorie = document.querySelector(".menu-categorie");

  const loginToken = token;

  // Basculer l'affichage en fonction de la présence du token
  if (boutonLogin) boutonLogin.style.display = loginToken ? "none" : "flex";
  if (boutonLogout) boutonLogout.style.display = loginToken ? "flex" : "none";
  if (navEdition) navEdition.style.display = loginToken ? "flex" : "none";
  if (boutonModifier)
    boutonModifier.style.display = loginToken ? "flex" : "none";
  if (menuCategorie) menuCategorie.style.display = loginToken ? "none" : "flex";
}

function logout() {
  const boutonLogout = document.querySelector(".logout");
  boutonLogout.addEventListener("click", () => {
    // Supprimer le token du localStorage
    window.localStorage.removeItem("authToken");

    // Appeler homePageEdit pour mettre à jour l'affichage
    homePageEdit();
  });
}

// Appeler la fonction pour initialiser l'affichage
homePageEdit();

// Initialiser la fonction de logout
logout();
