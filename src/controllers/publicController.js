import indexApi from '../api/indexApi.js';
const api = new indexApi()

export default class publicController{

        async index(req, res){
            const data = await api.chart()
            res.json(data)
        }
}