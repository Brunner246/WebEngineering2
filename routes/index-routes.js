import express from 'express';

const router = express.Router();
import {indexController} from '../controller/index-controller.js';
import taskController from "../controller/task-controller.js";

router.get("/", indexController.index.bind(indexController));
router.get("/orders", indexController.createOrder);
router.post("/orders", indexController.createPizza);
router.post("/tasks", taskController.createTask);
router.post("/tasks", taskController.createTask, taskController.renderTaskDetails);



export const indexRoutes = router;
