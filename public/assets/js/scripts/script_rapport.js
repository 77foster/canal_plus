const select = document.getElementById("select-float");
const floatRapport = document.getElementById("body-float");
const loading = document.getElementById("loading-message");
const btnNew = document.getElementById("new");
const start = document.getElementById("start");
const end = document.getElementById("end");
const startText = document.getElementById("start-text");
const endText = document.getElementById("end-text");

var floatData;

function newRapport() {
  btnNew.classList.add();
  select.classList.remove("d-none");
  select.classList.add("d-flex");
  loading.classList.add("d-none");
}

function dateString(dateString) {
  // Conversion de la date en objet Date
  let date = new Date(dateString);

  // Extraction des éléments de la date
  let jour = date.getDate().toString().padStart(2, "0");
  let mois = getMonthName(date.getMonth());
  let annee = date.getFullYear().toString();

  // Formatage de la date
  let nouvelleDate = `${jour} ${mois} ${annee}`;
  return nouvelleDate;
}

function getMonthName(mois) {
  const nomsMois = [
    "Jan",
    "Fév",
    "Mar",
    "Avr",
    "Mai",
    "Juin",
    "Juil",
    "Août",
    "Sept",
    "Oct",
    "Nov",
    "Déc",
  ];
  return nomsMois[mois];
}

start.addEventListener("input", function () {
  const valueStart = this.value;
  startText.textContent = "Rapport du " + dateString(valueStart);
});
end.addEventListener("input", function () {
  const valueEnd = this.value;
  endText.textContent = "au " + dateString(valueEnd);
});

const form = document.getElementById("formRapport");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  select.classList.add("d-none");
  select.classList.remove("d-flex");
  loading.classList.remove("d-none");
  let formData = new FormData(event.currentTarget);
  let formObj = Object.fromEntries(formData);

  console.log(formObj);
  fetch("/api/rapport", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(formObj),
  })
    .then((response) => response.json())
    .then((data) => {
      float(data);
      floatRapport.classList.remove("d-none");
      loading.classList.add("d-none");
      console.log("Reponse du serveur :", data);
    })
    .catch((error) => {
      select.classList.remove("d-none");
      select.classList.add("d-flex");
      loading.classList.add("d-none");

      console.log("Erreur:", error);
    });
});

function float(data) {
  var source = document.getElementById("entry-template").innerHTML;
  var template = Handlebars.compile(source);

  var context = { data: data };
  var html = template(context);
  document.getElementById("float").innerHTML = html;
}
function date() {
  let dateActuelle = new Date();

  let jour = dateActuelle.getDate().toString().padStart(2, "0");
  let mois = (dateActuelle.getMonth() + 1).toString();
  let annee = dateActuelle.getFullYear().toString();

  // Formatage de la date
  let nouvelleDate = `${jour}_${mois}_${annee}`;
  return nouvelleDate;
}
const selectAllCheckbox = document.getElementById("selectAll");
const optionCheckboxes = document.querySelectorAll(".option");

selectAllCheckbox.addEventListener("change", function () {
  optionCheckboxes.forEach((checkbox) => {
    checkbox.checked = this.checked;
  });
});

optionCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", function () {
    const allChecked = Array.from(optionCheckboxes).every(
      (checkbox) => checkbox.checked
    );
    selectAllCheckbox.checked = allChecked;
  });
});

function dateActuelle() {
  let dateActuelle = new Date();

  // Extraire les éléments de la date
  let jour = dateActuelle.getDate();
  let mois = dateActuelle.getMonth() + 1;
  let annee = dateActuelle.getFullYear();

  // Formater la date
  let dateFormatee = `${jour.toString().padStart(2, "0")}/${mois
    .toString()
    .padStart(2, "0")}/${annee}`;

  // Récupérer l'élément paragraphe et y insérer la date
  let paragraphe = document.getElementById("date-actuelle");
  paragraphe.textContent = "Kinshasa le " + dateFormatee;
}

dateActuelle();

function toPdf() {
  window.print()
  /* const nameFile = "Rapport_du_"+date()+".pdf"
  const element = document.getElementById("content-pdf");
  var opt = {
    margin: 0.5,
    filename: nameFile,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  console.log(element);
  console.log(element.offsetWidth, element.offsetHeight)
  // New Promise-based usage:
 html2pdf().set(opt).from(element).toPdf().save();


 
 */

  // Chemin relatif vers le fichier HTML du template
 /*  var templatePath = "assets/js/scripts/template.html";

  // Chargez le contenu du template
  fetch(templatePath)
    .then(function (response) {
      return response.text();
    })
    .then(function (templateHTML) {
      var template = Handlebars.compile(templateHTML);

      // Données à insérer dans le template
      var data = {
        data: data,
      };

      // Génération du HTML à partir du template et des données
      var html = template(data);

      generatePDF(html);
    })
    .catch(function (error) {
      console.error("Erreur lors du chargement du template :", error);
    });

  function generatePDF(template) {
    // Utilisez le template pour générer le PDF
    var opt = {
      margin: 1,
      filename: "mon-pdf-personnalise.pdf",
      image: { type: "jpeg", quality: 0.25 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf()
      .from(template)
      .set(opt)
      .save()
      .then(function (pdf) {
        // Récupérez le chemin du fichier PDF
        var pdfPath = pdf.output("datauristring");
        console.log("Chemin du PDF :", pdfPath);
      });
  } */
}
