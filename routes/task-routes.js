import express from 'express';
import { taskController } from "../controller/task-controller.js";
import {indexController} from "../controller/index-controller.js";

const router = express.Router();

router.post("/", taskController.createTask);
router.get("/", taskController.getAllTasks);
router.get('/tasks/sort', taskController.sortTasks);
router.get("/:id/edit", taskController.editTask.bind(taskController));
router.post("/:id/delete", taskController.deleteTask.bind(taskController));
router.post("/:id/update", taskController.updateTask.bind(taskController));

export const taskRoutes = router;
