function validerFomulaireLogin() {
  const formulaireLogin = document.querySelector(".form-login");
  formulaireLogin.addEventListener("submit", async (Event) => {
    Event.preventDefault();
    // Création de l’objet du formulaire login.
    const login = {
      email: Event.target.querySelector("[name=email]").value,
      password: Event.target.querySelector("[name=password]").value,
    };

    // Création de la charge utile au format JSON
    const chargeUtile = JSON.stringify(login);

    // Appel de la fonction fetch avec toutes les informations nécessaires
    const reponse = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: chargeUtile,
    });
    const errorMessage = document.getElementById("errorMessage");
    // Traitement de la réponse du serveur
    const data = await reponse.json();
    // Stockage des informations dans localStorage après une connexion réussie
    if (reponse.ok) {
      window.localStorage.setItem("userEmail", login.email);
      window.localStorage.setItem("authToken", data.token);

      // Redirection vers la page d'accueil si la connexion réussit
      window.location.href = "./index.html";
    } else {
      errorMessage.textContent = `Erreur ${reponse.status} : ${data.message}`;
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
