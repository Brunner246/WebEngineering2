import express from 'express';
import { taskController } from "../controller/task-controller.js";

const router = express.Router();

router.post("/tasks/create", taskController.createTask);
router.post("/tasks/create", taskController.createTask);
router.post("/tasks/render", taskController.renderTask);
router.get("/", taskController.getAllTasks);
router.get("/tasks/sort", taskController.sortTasks);
router.post('/tasks/:id/state', taskController.setState);
router.get("/:id/edit", taskController.editTask);
router.post("/:id/delete", taskController.deleteTask);
router.post("/:id/update", taskController.updateTask);
router.get("/completed", taskController.getCompletedTasks);

export const taskRoutes = router;
