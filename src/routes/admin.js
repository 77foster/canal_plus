import express from 'express'
var router = express.Router();
import adminController from '../controllers/adminController.js';

const ctrl = new adminController()


router.get('/', (req, res) => ctrl.index(req, res))



export default router