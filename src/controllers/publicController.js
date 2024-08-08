import indexApi from '../api/indexApi.js';
const api = new indexApi()

export default class publicController{

    async login(req, res ){
        res.render('login');
      }

      async signIn(req, res){

      }
}