import taskStore from '../services/taskService.js';

class TaskController {
    createTask(req, res) {
        const { description, assignedTo } = req.body;
        const task = taskStore.add(description, assignedTo);
        res.render('createTask', { task });
    }

    renderTaskDetails(req, res) {
        const { task } = req; // Retrieve the task from the request object
        res.render('taskDetails', { task });
    }

    deleteTask(req, res) {
        const id = parseInt(req.params.id);
        const task = taskStore.delete(id);
        if (task) {
            res.render('deleteTask', { task });
        } else {
            res.render('taskNotFound');
        }
    }

    getTask(req, res) {
        const id = parseInt(req.params.id);
        const task = taskStore.get(id);
        if (task) {
            res.render('task', { task });
        } else {
            res.render('taskNotFound');
        }
    }

    getAllTasks(req, res) {
        const tasks = taskStore.all();
        res.render('allTasks', { tasks });
    }
}

const taskController = new TaskController();
export default taskController;
