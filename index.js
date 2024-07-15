const url = "https://fleet.securysat.com/json/";
axios.defaults.headers.post["Content-Type"] = "application/json";
var pdfData = {};

function connexion() {
  axios
    .post(url + "login", {
      login: "WS3618",
      password: ")VX8G4oWJ!",
      appKey: "A5QM-FVQS-6O92-PGGQ",
    })
    .then(function (response) {
      var res = response.data.userProfile.vehicleIds;
      sessionId = response.data.sessionId;
      sessionStorage.setItem("sessionId", sessionId);
      console.log(res);
      getVehicules();
    })
    .catch(function (error) {
      console.log(error);
    });
}

function getVehicules() {
  const sessionId = sessionStorage.getItem("sessionId");
  axios
    .post(url + "getVehicles", {
      sessionId: sessionId,
    })
    .then(function (response) {
      var res = response.data.vehicles;

      const options = Object.values(res).map((item) => ({
        id: item.id,
        name: item.name,
      }));

      const select = document.getElementById("voiture");

      options.forEach((item) => {
        const option = document.createElement("option");
        option.value = item.id;
        option.textContent = item.name;
        select.appendChild(option);
      });
      console.log(options);
    })
    .catch(function (error) {
      console.log(error);
    });

  console.log(sessionId);
}

function date(date) {
  const IsoDate = new Date(date);
  const lastDate = new Date(date);
  lastDate.setHours(24, 59, 59, 0);

  const startDate = IsoDate.toISOString();
  const endDate = lastDate.toISOString();

  return {
    startDate: startDate,
    endDate: endDate,
  };
}

console.log(date("2023-12-12"));

connexion();
const form = document.getElementById("form");
form.addEventListener('submit', async function(event) {

  event.preventDefault();
  spinner(true)
  // Récupérer les valeurs des champs date
  const dateField1 = form.elements.startDate;
  const startDateValue = dateField1.value;

  const dateField2 = form.elements.endDate;
  const endDateValue = dateField2.value;

  // Récupérer la valeur du champ select
  const selectField = form.elements.voiture;
  const selectValue = selectField.value;
  const nomVoiture = selectField.options[selectField.selectedIndex].text;

 

  const startDate = new Date(startDateValue);
  const endDate = new Date(endDateValue);



const allDates = [];
  var kilometre = 0;
  const numDays =
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) + 1;
  for (let i = 0; i < numDays; i++) {
    const currentDate = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
    allDates.push(date(currentDate));
  }

  for (let i = 0; i < allDates.length; i++) {
    const km = await dailyReport(
      allDates[i].startDate,
      allDates[i].endDate,
      selectValue
    );
    kilometre += km;
  }

  spinner(false)
  const nom = document.getElementById("nameV");
  nom.textContent = nomVoiture;
  const dateDebut = document.getElementById("dateDebut");
  dateDebut.textContent =dateString(startDateValue);
  const detaFin = document.getElementById("dateFin");
  detaFin.textContent = dateString(endDateValue);
  const Kilometrage = document.getElementById("kilometrage");
  Kilometrage.textContent = kilometre.toFixed(2) + ' km'; 

  pdfData = {
    nomVoiture:nomVoiture,
    dateDebut:dateString(startDateValue),
    dateFin:dateString(endDateValue),
    km:kilometre.toFixed(2) + ' km'
  }

  console.log(pdfData)
}
)


async function dailyReport(startDate, endDate, idVoiture) {
  const sessionId = sessionStorage.getItem("sessionId");

  return new Promise((resolve, reject) => {
    var km = 0;
    axios
      .post(url + "getDailyVehicleEcoSummary", {
        sessionId: sessionId,
        startDate: startDate,
        endDate: endDate,
      })
      .then(function (response) {
        var res = response.data.dailyEcoSummaries;
        const options = Object.values(res).map((item) => ({
          id: item.vehicleId,
          km: item.realMileage,
        }));
        const vehicule = options.find((item) => item.id == idVoiture);

        if (vehicule) {
          km = vehicule.km;
          console.log(vehicule.km);
          resolve(km);
        } else {
          console.log(0);
          resolve(0);
        }
      })
      .catch(function (error) {
        console.log(error);
        reject(error);
      });
  });
}

function dateString(date){
  const myDate = new Date(date);

  const daysOfWeek = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];

  // Tableau des noms de mois
  const monthsOfYear = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

  // Récupérer le jour de la semaine, le jour du mois et l'année
  const dayOfWeek = daysOfWeek[myDate.getDay()];
  const dayOfMonth = myDate.getDate();
  const year = myDate.getFullYear();
  const monthOfYear = monthsOfYear[myDate.getMonth()];

  // Formater la date
  const formattedDate = `${dayOfWeek} ${dayOfMonth} ${monthOfYear} ${year}`;
  return formattedDate
}

function spinner (data){
  const spinner = document.getElementById('spinner')

  if (data == false) {
    if (!spinner.classList.contains('visually-hidden')) {
      // Si l'élément ne l'a pas, on l'ajoute
      spinner.classList.add('visually-hidden');
    }
  }else{
    if (spinner.classList.contains('visually-hidden')) {
      // Si l'élément l'a, on la retire
      spinner.classList.remove('visually-hidden');
    }
  }
}


function generatePDF() {
  // Remplacez 'chemin/vers/fichier.html' par le chemin réel de votre fichier HTML
  const url = '/rapport.html';

  fetch(url)
    .then(response => response.text())
    .then(html => {
      const element = document.createElement('div');
      element.innerHTML = html;

      document.getElementById("nomVoiture").textContent = pdfData.nomVoiture;
      document.getElementById("debut").textContent = pdfData.dateDebut
      document.getElementById("fin").textContent = pdfData.dateFin;
      document.getElementById("km").textContent = pdf.km
        .from(element)
        .save();
    })
    .catch(error => {
      console.error('Erreur lors du chargement du fichier HTML :', error);
    });
}