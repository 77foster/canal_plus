import express from 'express'
var router = express.Router();
import indexController from '../controllers/indexControllers.js';
const ctrl = new indexController()
/* GET home page. */
router.get('/', (req, res) =>ctrl.index(req, res));

router.get('/float', (req, res) =>ctrl.float(req, res));

router.get('/rapports', (req, res) =>ctrl.rapports(req, res));
router.post('/rapports', (req, res) =>ctrl.rapportsPost(req, res));
router.get('/pdf', async (req, res) => ctrl.pdf(req, res));


export default router;