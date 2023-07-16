import express from 'express';
import { taskController } from "../controller/task-controller.js";

const router = express.Router();

router.get("/", taskController.renderTask);
router.get("/tasks/render", taskController.renderTask);
router.post("/tasks", taskController.createTask);
router.post("/tasks/create-overview", taskController.createAndRenderTask);
router.post("/tasks/:id/update", taskController.updateTask);
router.post("/tasks/:id/update-overview", taskController.updateTask);
router.get("/", taskController.getAllTasks);
router.get("/new", taskController.createNewTask);
router.get("/sort", taskController.sortTasks);
router.post("/filter", taskController.filterOpenTasks);
router.get("/:id/edit", taskController.getTaskDetails);
router.post("/:id/delete", taskController.deleteTask);
router.get("/completed", taskController.getOpenTasks);
router.post("/dark-mode", taskController.toggleDarkMode);

export const taskRoutes = router;
