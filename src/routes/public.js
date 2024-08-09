import express from "express";  
import User from "../model/user.js";
var router = express.Router();
import publicController from "../controllers/publicController.js";

const publicCtrl = new publicController();

function auth(req, res, next) {
  const sessionId = req.cookies.sessionId;
  if (sessionId) {
    try {
      User.findOne({
        where: {
          cookie: sessionId,
        },
      }).then((result) => {
        if (!result) {
          return next()
        } else {
          return res.redirect("/");
        }
      });
    } catch (error) {
      return next()
    }
  } else {
    return next()
  }
}

router.get("/", auth, (req, res) => publicCtrl.login(req, res));
router.post("/", (req, res) => publicCtrl.signIn(req, res));

export default router;
