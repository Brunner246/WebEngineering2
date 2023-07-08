import express from 'express';
import { taskController } from "../controller/task-controller.js";

const router = express.Router();

router.post("/", taskController.createTask);
router.get("/", taskController.getAllTasks);
router.get("/sort", taskController.sortTasks);
router.post('/tasks/:id/state', taskController.setState);
router.get("/:id/edit", taskController.editTask);
router.post("/:id/delete", taskController.deleteTask);
router.post("/:id/update", taskController.updateTask);
router.get("/completed", taskController.getCompletedTasks);

export const taskRoutes = router;
