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
        let i = 0
          const options = Object.values(res).map((item) => ({
            num:i++,
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

}
