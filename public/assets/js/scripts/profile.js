if (user != null) {
  const nom = document.getElementById("profil-nom");
  const email = document.getElementById("profil-email");
  const img = document.getElementById("profil-img");

  nom.textContent = user.prenom + " " + user.nom;
  email.textContent = user.email;
  img.src = user.photo;
}

const edit = document.getElementById("edit");
const btnEdit = document.getElementById("btn-edit")

function afficherForm(){
    if (edit.classList.contains('d-none')) {
        edit.classList.remove('d-none');
    }
    btnEdit.classList.add('d-none')
}

function retirerForm(){
    edit.classList.add('d-none')
    btnEdit.classList.remove('d-none')
}


let form = document.getElementById('edit-profil"')
let erreur = document.getElementById("erreur");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    let formData = new FormData(event.currentTarget);
    let formObj = Object.fromEntries(formData);
    const url = "/update/"+user.id
    console.log(formObj);
    fetch(url, {
      method: "PUT",
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
        // Rediriger vers une URL relative
        console.log("Voici les données : ", data)
       // window.location.href = "/";
      })
      .catch((error) => {
        console.log(error);
      });
  });