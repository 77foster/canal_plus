const url = "https://fleet.securysat.com/json/";
axios.defaults.headers.post["Content-Type"] = "application/json";

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
  
        const select = document.getElementById("select");
  
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


  function date(date){
    const IsoDAte = new Date(date)
    IsoDAte.setHours(24,59,59,0)
    console.log(IsoDAte.toISOString())
   // return date.toISOString()
  }


  date('2023-12-12')


connexion()