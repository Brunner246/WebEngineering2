import express from 'express';

const router = express.Router();
import {indexController} from '../controller/index-controller.js';

router.get("/", indexController.index.bind(indexController));
router.get("/orders", indexController.createOrder);
router.post("/orders", indexController.createPizza);


export const indexRoutes = router;
