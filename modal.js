// Ouvrir la modal au clic sur "Modifier"
const boutonModier = document.querySelector(".btn-modifier");
boutonModier.addEventListener("click", async (event) => {
  event.preventDefault();

  const modal = document.getElementById("modal");
  modal.style.display = "flex";
  // Ajouter un attribut aria-hidden à false pour l'accessibilité
  modal.setAttribute("aria-hidden", "false");
});

// Fermer la modal au clic
const fermerModal = document.querySelector(".fa-solid");
fermerModal.addEventListener("click", (event) => {
  event.preventDefault();

  const modal = document.getElementById("modal");
  modal.style.display = "none";
  // Ajouter un attribut aria-hidden à false pour l'accessibilité
  modal.setAttribute("aria-hidden", "true");

  // Fermer la modal au clic en-dehors
  modal.addEventListener("click", (event) => {
    event.preventDefault();
    const modalWrapper = document.querySelector(".modal-wrapper");

    if (!modalWrapper.contains(event.target)) {
      modal.style.display = "none";
      modal.setAttribute("aria-hidden", "true");
    }
  });
});
