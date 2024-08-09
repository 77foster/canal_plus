import User from "../model/user.js";
export default class adminRouter {
  async index(req, res) {
    const users = await User.findAll();
    var i = 0
    res.render("admin/index", {users, i});
  }

  async store(req, res) {
    async function strHash(a, b) {
      b = b || 'SHA-256';
      var c = new TextEncoder().encode(a),
          d = await crypto.subtle.digest(b, c),
          e = Array.from(new Uint8Array(d)),
          f = e.map(function(c) {
            return c.toString(16).padStart(2, '0');
          }).join('');
      return f;
    }

    const cookie = await strHash(req.body?.email)
    const data = {
      nom:req.body?.nom,
      prenom:req.body?.prenom,
      email:req.body?.email,
      role:req.body?.role,
      password:"12345678",
      cookie:cookie,
      photo:"assets/img/users/personn.jpg"
    }
    const user = await User.create(data);

    if(user){
      res.status(201).json({
        msg:'erreur',
        data: user
      })
    }else{
      res.status(500).json({
        msg:'erreur',
      })
    }
  }
}
