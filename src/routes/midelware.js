import User from "../model/user.js";
export default class midelware {
  auth(req, res, next) {
    const sessionId = req.cookies.sessionId;
    if (sessionId && sessions[sessionId]) {
      return next();
    } else {
      return res.redirect("/");
    }
  }

  connected(req, res, next) {
    const sessionId = req.cookies.sessionId;
    if (sessionId && sessions[sessionId]) {
      return res.redirect("/protect");
    } else {
      return next();
    }
  }
}
