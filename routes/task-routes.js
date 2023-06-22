import express from 'express';

const router = express.Router();

import {taskController} from "../controller/task-controller.js";

router.get("/", taskController.createTask);
router.post("/", taskController.renderTaskDetails);

export const taskRoutes = router;