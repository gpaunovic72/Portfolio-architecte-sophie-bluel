function validerFomulaireLogin() {
  const formulaireLogin = document.querySelector(".form-login");
  formulaireLogin.addEventListener("submit", async (event) => {
    event.preventDefault();
    // Création de l’objet du formulaire login.
    const login = {
      email: event.target.querySelector("[name=email]").value,
      password: event.target.querySelector("[name=password]").value,
    };

    // Création de la charge utile au format JSON
    const chargeUtile = JSON.stringify(login);

    // Valide l'email avant d'envoyer les données à l'API
    try {
      validerEmail(login.email);
    } catch (error) {
      afficherMessageErreur(error);
      document.getElementById("password").value = "";
      return;
    }

    // Appel de la fonction fetch avec toutes les informations nécessaires
    const reponse = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: chargeUtile,
    });
    // Traitement de la réponse du serveur
    const data = await reponse.json();

    // Stockage des informations dans localStorage après une connexion réussie
    if (reponse.ok) {
      window.localStorage.setItem("userEmail", login.email);
      window.localStorage.setItem("authToken", data.token);

      // Redirection vers la page d'accueil
      window.location.href = "./index.html";
    } else {
      afficherMessageErreur(`Erreur dans l'identifiant ou le mot de passe`);
      document.getElementById("password").value = "";
    }
  });
}
validerFomulaireLogin();

// Cette fonction prend un email en paramètre et valide qu'il est au bon format.
function validerEmail(email) {
  const emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");
  if (!emailRegExp.test(email)) {
    throw new Error("L'email n'est pas valide.");
  }
}

// Fonction pour afficher un message d'erreur
function afficherMessageErreur(message) {
  const errorMessage = document.getElementById("errorMessage");
  errorMessage.textContent = message;
  setTimeout(() => {
    errorMessage.textContent = "";
  }, 1500);
}
