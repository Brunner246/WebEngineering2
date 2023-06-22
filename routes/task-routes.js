import express from 'express';

const router = express.Router();

import {taskController} from "../controller/task-controller.js";

router.post("/tasks", taskController.createTask);

export const taskRoutes = router;