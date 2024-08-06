import express from 'express'
var router = express.Router();
import indexController from '../controllers/indexControllers.js';
import publicController from '../controllers/publicController.js';
const ctrl = new indexController()
const publicCtrl = new publicController()
/* GET home page. */
router.get('/', (req, res) => ctrl.index(req, res));
router.get('/chart', (req, res) => publicCtrl.index(req, res));

router.get('/float', (req, res) =>ctrl.float(req, res));

router.get('/rapports', (req, res) =>ctrl.rapports(req, res));
router.post('/rapports', (req, res) =>ctrl.rapportsPost(req, res));
router.get('/pdf', async (req, res) => ctrl.pdf(req, res));
router.get('/profil', async (req, res) => ctrl.profil(req, res));


export default router;