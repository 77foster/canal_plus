import User from "../model/user.js";
export default class adminRouter {
  async index(req, res) {
    const users = await User.findAll();
    var i = 0
    res.render("admin/index", {users, i});
  }
}
