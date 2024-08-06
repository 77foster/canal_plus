import axios from "axios";

const url = "https://fleet.securysat.com/json/";
axios.defaults.headers.post["Content-Type"] = "application/json";

export default class indexApi {
    sessionId = '';
    vehicules = {};
  async #connexion() {
   try {
    const res = await axios
    .post(url + "login", {
      login: "WS3618",
      password: ")VX8G4oWJ!",
      appKey: "A5QM-FVQS-6O92-PGGQ",
    })

   return res.data.sessionId;
   } catch (error) {
    throw error
   }
  }

  async getVehicules(){
     const sessionId = await this.#connexion()
    try {
        const response = await axios
        .post(url + "getVehicles", {
          sessionId: sessionId,
        })
        var res = response.data.vehicles;
          const options = Object.values(res).map((item) => ({
            id: item.id,
            name: item.name,
            model: item.model,
            brand: item.brand,
            status: item.status
          }));     
          return options
    } catch (error) {
        
    }
  }
  async chart(){
     const sessionId = await this.#connexion()
    try {
        const response = await axios
        .post(url + "getVehicles", {
          sessionId: sessionId,
        })
        var res = response.data.vehicles;
        const options = Object.values(res).map((item) => ({
          id: item.id,
          name: item.name,
          model: item.model,
          brand: item.brand,
          status: item.status
        }));    
        var model = {};
        options.forEach((element) => {
          if (element.brand in model) {
            let i = model[element.brand];
            i = i + 1;
            model[element.brand] = i;
          } else {
            model[element.brand] = 1;
          }
        });
          return model
    } catch (error) {
        
    }
  }

  async  dailyReport(startDate, endDate, idVoiture) {
    const sessionId = await this.#connexion()
  
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
}
