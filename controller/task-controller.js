import taskStore from '../services/taskService.js';

export class TaskController {
    async createTask(req, res) {
        const title = req.body.taskTitle;
        const description = req.body.description;
        const importance = req.body.importance;

        try {
            await taskStore.add(title, description, new Date(), false, importance); // TODO: dueDate (atm just new Date() as placeholder), status
            res.redirect('/tasks');
        } catch (error) {
            res.render('error', {error});
        }
    }

    // async deleteTask(req, res) {
    //     const id = parseInt(req.params.id);
    //     try {
    //         const task = await taskStore.delete(id);
    //         if (task) {
    //             res.redirect('/tasks');
    //         } else {
    //             res.render('taskNotFound');
    //         }
    //     } catch (error) {
    //         res.render('error', { error });
    //     }
    // }

    deleteTask(req, res) {
        const id = req.params.id;
        const task = taskStore.delete(id);
        if (task) {
            res.redirect('/tasks');
        } else {
            res.render('taskNotFound');
        }
    }

    async editTask(req, res) {
        const id = parseInt(req.params.id);
        try {
            const task = await taskStore.get(id);
            if (task) {
                res.render('editTask', {task});
            } else {
                res.render('taskNotFound');
            }
        } catch (error) {
            res.render('error', {error});
        }
    }

    async updateTask(req, res) {
        const id = parseInt(req.params.id);
        const description = req.body.taskName;
        try {
            const task = await taskStore.update(id, description);
            if (task) {
                res.redirect('/tasks');
            } else {
                res.render('taskNotFound');
            }
        } catch (error) {
            res.render('error', {error});
        }
    }

    async getAllTasks(req, res) {
        try {
            const tasks = await taskStore.all();
            res.render('allTasks', {tasks});
        } catch (error) {
            res.render('error', {error});
        }
    }
}

export const taskController = new TaskController();
