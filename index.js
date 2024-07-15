const url = "https://fleet.securysat.com/json/";
axios.defaults.headers.post["Content-Type"] = "application/json";
//const axios = require('axios')
const div = document.getElementById("app");
const texte = document.getElementById("paragraphe");
var sessionId = "";
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
      //  div.append( res)

      /*   res.forEach(item => {
        const paragraphe = document.createElement('p')
        paragraphe.textContent = item
        div.append(paragraphe)
      }); */
      texte.innerText = sessionId;
      getVehicules();
    })
    .catch(function (error) {
      console.log(error);
      div.append("<p>Echec</p>");
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
      console.log(res);

      const options = Object.values(res).map((item) => ({
        id: item.id,
        name: item.name,
      }));

      const select = document.getElementById("select");

      options.forEach((item) => {
        const option = document.createElement("option");
        option.value = item.id;
        option.textContent = item.name;
        select.appendChild(option);
      });
      /* res.forEach(item => {
            const paragraphe = document.createElement('p')
            paragraphe.textContent = item.name
            div.append(paragraphe)
          });  */
    })
    .catch(function (error) {
      console.log(error);
    });

  console.log(sessionId);
}


async function dailyReport() {
  const sessionId = sessionStorage.getItem("sessionId");
  let startDate = "2023-06-11T00:00:00.000Z";
  let endDate = "2023-06-11T23:59:59.000Z";

  axios
    .post(url + "getDailyVehicleEcoSummary", {
      sessionId: sessionId,
      startDate: startDate,
      endDate: endDate,
    })
    .then(function (response) {
        var res = response.data.dailyEcoSummaries
        const options = Object.values(res).map((item) => ({
            id:item.vehicleId,
            km: item.realMileage,
            fuel:item.usedFuel
          }));
        const vehicule = options.find(item => item.id === 1237)
    
      console.log(vehicule.);
    })
    .catch(function (error) {
      console.log(error);
    });

  //console.log(isoDateTime);
}
