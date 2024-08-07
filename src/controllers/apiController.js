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
    const user = await User.create(req.body);
    if (user) {
      const users = await User.findAll();
      const data = {
        msg: "succes",
        data: users,
        code: 201,
      };
      res.json(data);
    } else {
      res.json({
        msg: "Erreur",
      });
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
    if (user) {
      await user.update(req.body);
      res.json(user);
    }
  }

  async userById(req, res) {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.json(user);
    }
  }
  async rapport(req, res){
    let data = req.body;
    const newData = {};
    for (const key in data) {
      if (key !== "start" && key !== "end") {
        newData[key] = data[key];
      }
    }
    const nData = await api.rapport(data['start'], data['end'], newData)
    res.json(nData);
  }
}
