import User from "../model/user.js";
import indexApi from "../api/indexApi.js";
const api = new indexApi();
export default class apiController {
  async index(req, res) {
    const users = await User.findAll();
    const data = {
      msg: "success",
      data: users,
      code: 200,
    };
    res.json(data);
  }

  async store(req, res) {
    const data = {
      nom:req.body?.nom,
      prenom:req.body?.prenom,
      email:req.body?.email,
      role:req.body?.role,
      password:req.body?.password
    }
    const user = await User.create(data);

    if(user){
      res.redirect("/admin");
    }
  }

  async status(req, res) {
    const user = await User.findByPk(req.params.id);
    if (user && user.status == true) {
      await user.update({
        status: false,
      });
    } else {
      await user.update({
        status: true,
      });
    }

    const data = {
      msg: "success",
      data: req.body,
      code: 201,
    };
    res.send(user.status);
  }
  async update(req, res) {
    const user = await User.findByPk(req.params.id);
    if (user.password == req.body.last) {
      if (user) {
        const update = await user.update(req.body);
       update.then(result => {
        if (!result) {
          res.status(500).json({
            msg: "erreur",
          });
        } else {
          const users = {
            id:result.id,
            nom: result.nom,
            prenom: result.prenom,
            cookie: result.cookie,
            email: result.email,
            photo: result.photo,
            status: result.status,
            role: result.role,
          };
          res.status(200).json({
            msg: "erreur",
            data: users,
          });
        }
       })
      }
    }
    
  }

  async userById(req, res) {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.json(user);
    }
  }
  async rapport(req, res) {
    let data = req.body;
    const newData = {};
    for (const key in data) {
      if (key !== "start" && key !== "end") {
        newData[key] = data[key];
      }
    }
    const nData = await api.rapport(data["start"], data["end"], newData);
    res.json(nData);
  }
}
