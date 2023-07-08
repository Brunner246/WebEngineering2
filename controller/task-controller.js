import taskStore from '../services/taskService.js';

export class TaskController {
    async createTask(req, res) {
        const {title, description, dueDate, importance} = req.body;
        try {
            await taskStore.add(title, description, dueDate, importance);
            res.redirect('/tasks');
        } catch (error) {
            res.render('error', {error});
        }
    }

    async deleteTask(req, res) {
        const id = req.params.id;
        try {
            console.log(id);
            const task = await taskStore.delete(id);
            if (task) {
                res.redirect('/tasks');
            } else {
                res.render('taskNotFound');
            }
        } catch (error) {
            res.render('error', {error});
        }
    }


    async editTask(req, res) {
        const id = req.params.id;
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
        const id = req.params.id;
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

    async setState(req, res) {
        const id = req.params.id;
        const completed = req.body.completed === "on";
        try {
            const task = await taskStore.updateState(id, completed);
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
            res.render('allTasks', {tasks: await taskStore.all()});
        } catch (error) {
            res.render('error', {error});
        }
    }

    async getCompletedTasks(req, res) {
        try {
            res.render('allTasks', {tasks: await taskStore.completed()});
        } catch (error) {
            res.render('error', {error});
        }
    }

    async sortTasks(req, res) {
        // TODO: implement sorting by dueDate, creationDate, importance URL params (e.g. /tasks/sort?orderBy=dueDate&orderDirection=desc)
        const { orderBy, orderDirection } = req.userSettings;
        let sortFunction;

        if (orderBy === "importance") {
            sortFunction = (a, b) => a.importance - b.importance;
        } else if (orderBy === "dueDate") {
            sortFunction = (a, b) => new Date(a.dueDate) - new Date(b.dueDate);
        }

        try {
            let tasks = await taskStore.all();

            if (sortFunction) {
                tasks.sort(orderDirection === "asc" ? sortFunction : (a, b) => sortFunction(b, a));
            }

            res.render('allTasks', { tasks });
        } catch (error) {
            res.render('error', { error });
        }
    }
}

export const taskController = new TaskController();
