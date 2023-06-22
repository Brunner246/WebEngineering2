import taskStore from '../services/taskService.js';

export class TaskController {
    createTask(req, res) {
        console.log(req.body);
        res.render('newTask');
    }

    renderTaskDetails(req, res) {
        res.render('newTask', {taskName: req.body.taskName}); // taskName: req.userSettings.orderBy
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

export const taskController = new TaskController();

