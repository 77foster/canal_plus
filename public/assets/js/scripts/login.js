let form = document.getElementById("form-login");
let erreur = document.getElementById("erreur");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let formData = new FormData(event.currentTarget);
  let formObj = Object.fromEntries(formData);

  console.log(formObj);
  fetch("/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(formObj),
  })
    .then((response) => {
      // Récupérer le code de statut HTTP
      const statusCode = response.status;

      // Vérifier si la réponse est un succès (code 2xx)
      if (response.ok && statusCode == 200) {
        // Traiter la réponse avec succès
        //  window.location.href = "/admin";
        console.log("le code : ", statusCode);
        return response.json();
      } else {
        // Gérer les erreurs
        erreur.classList.remove("d-none");
        console.log("le code : ", statusCode);
      }
    })
    .then((data) => {
      const user = data.data;
      const userJSON = JSON.stringify(user);
      localStorage.setItem("user", userJSON);

      const cookieValue = user.cookie;

      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 60);
      document.cookie = `sessionId=${cookieValue}; expires=${expirationDate.toUTCString()}; path=/`;

      // Rediriger vers une URL relative
      window.location.href = "/";
    })
    .catch((error) => {
      console.log(error);
    });
});
