import express from 'express'
var router = express.Router();
import apiController from '../controllers/apiController.js';

const ctrl = new apiController()


router.get('/', (req, res) => ctrl.index(req, res))
router.post('/', (req, res) => ctrl.store(req, res))
router.put('/status/:id', (req, res) => ctrl.status(req, res))
router.put('/update/:id', (req, res) => ctrl.status(req, res))
router.get('/:id', (req, res) => ctrl.userById(req, res))



export default router