import express from "express";
import User from "../model/user.js";
var router = express.Router();
import adminController from "../controllers/adminController.js";

const ctrl = new adminController();

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
        return res.redirect("/login");
      } else {
        return next();
      }
    });
  } catch (error) {
   return res.redirect("/login");
  }
 } else {
  return res.redirect("/login");
 }
}

router.post("/", (req, res) => ctrl.store(req, res));
router.get("/", auth, (req, res) => ctrl.index(req, res));

export default router;
