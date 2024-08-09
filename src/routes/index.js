import express from "express";
import User from "../model/user.js";
var router = express.Router();
import indexController from "../controllers/indexControllers.js";
const ctrl = new indexController();

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

router.get("/", auth, (req, res) => ctrl.dashboard(req, res));
router.get("/float", auth, (req, res) => ctrl.float(req, res));
router.get("/rapports", auth, (req, res) => ctrl.rapports(req, res));
router.get("/profil", auth,async (req, res) => ctrl.profil(req, res));
router.get("/chart", async (req, res) => ctrl.chart(req, res));

export default router;
