import express from 'express';
import { taskController } from "../controller/task-controller.js";

const router = express.Router();

router.get("/", taskController.renderTask);
router.post("/tasks/render", taskController.renderTask);
router.post("/tasks", taskController.createTask);
router.post("/tasks/create-overview", taskController.createAndRenderTask);
router.post("/tasks/:id/update", taskController.updateTask);
router.post("/tasks/:id/update-overview", taskController.updateTask);
router.get("/", taskController.getAllTasks);
router.get("/new", taskController.createNewTask);
router.get("/sort", taskController.sortTasks);
router.post("/:id/edit", taskController.getTaskDetails);
router.post("/:id/edit", taskController.updateTask);
router.post("/:id/delete", taskController.deleteTask);
router.get("/completed", taskController.getOpenTasks);
router.post('/tasks/:id/state', taskController.setState);

export const taskRoutes = router;
