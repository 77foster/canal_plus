import indexApi from "../api/indexApi.js";
import User from "../model/user.js";
const api = new indexApi();
export default class publicController {
  async login(req, res) {
    res.render("login");
  }

  async signIn(req, res) {
    User.findOne({
      where: {
        email: req.body.email,
        password: req.body.password,
        status: true,
      },
    }).then((user) => {
      if (!user) {
        res.status(500).json({
          msg: "erreur",
          data: user.length,
        });
      } else {
        const users = {
          id:user.id,
          nom: user.nom,
          prenom: user.prenom,
          cookie: user.cookie,
          email: user.email,
          photo: user.photo,
          status: user.status,
          role: user.role,
        };
        res.status(200).json({
          msg: "erreur",
          data: users,
        });
      }
    });
  }
}
