const userJSON = localStorage.getItem("user");
const user = JSON.parse(userJSON);

if (user != null) {
  const nom = document.getElementById("nom");
  const email = document.getElementById("email");
  const nom2 = document.getElementById("nom-2");
  const img = document.getElementById("img-profil");
  const img2 = document.getElementById("img-profil-2");

  nom.textContent = user.prenom + " " + user.nom;
  nom2.textContent = user.prenom + " " + user.nom;
  email.textContent = user.email;
  img.src = user.photo;
  img2.src = user.photo;
}

if (user != null) {
  const nom = document.getElementById("nom-side");
  const email = document.getElementById("email-side");
  const img = document.getElementById("img-profil-side");
  const role = document.getElementById("role-side");
  nom.textContent = user.prenom + " " + user.nom;
  email.textContent = user.email;
  img.src = user.photo;
  role.textContent = user.role
}
