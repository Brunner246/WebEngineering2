import taskStore from '../services/taskService.js';

export class TaskController {

    async createTask(req, res) {
        const {title, description, dueDate, importance} = req.body;
        try {
            await taskStore.add(title, description, dueDate, importance);
            res.redirect("/");
        } catch (error) {
            res.status(500).render('error', { error });
        }
    }

    async renderTask(req, res) {
        const tasks = await taskStore.all();
        const sortDirection = req.userSettings.orderDirection;
        res.render('allTasks', {tasks, sortDirection});
    }

    async createAndRenderTask(req, res) {
        try {
            // TODO: get rid off code repetition
            const {title, description, dueDate, importance} = req.body;
            await taskStore.add(title, description, dueDate, importance);
            const tasks = await taskStore.all();
            const sortDirection = req.userSettings.orderDirection;
            res.render('allTasks', {tasks, sortDirection});
        } catch (error) {
            res.render('error', {error});
        }
    }


    async deleteTask(req, res) {
        const id = req.params.id;
        try {
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
        const {id, description} = req.params;
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
            res.render('allTasks', {tasks: await taskStore.all(), sortDirection: await req.userSettings});
        } catch (error) {
            res.render('error', {error});
        }
    }

    async getOpenTasks(req, res) {
        try {
            res.render('allTasks', {
                tasks: await taskStore.completed(),
                sortDirection: await req.userSettings
            });
        } catch (error) {
            res.render('error', {error});
        }
    }

    async sortTasks(req, res) {
        const {orderBy, orderDirection} = req.userSettings;

        let sortFunction;
        if (orderBy === "importance") {
            sortFunction = (a, b) => a.importance - b.importance;
        } else if (orderBy === "dueDate") {
            sortFunction = (a, b) => new Date(a.dueDate) - new Date(b.dueDate);
        } else if (orderBy === "title") {
            sortFunction = (a, b) => a.title.localeCompare(b.title);
        }

        try {
            let tasks = await taskStore.all();

            if (sortFunction) {
                tasks.sort(orderDirection === "-1" ? sortFunction : (a, b) => sortFunction(b, a));
            }
            res.render('allTasks', {tasks: tasks, sortDirection: req.userSettings});
            req.userSettings.orderDirection = req.userSettings.orderDirection === "-1" ? "1" : "-1";

        } catch (error) {
            res.render('error', {error});
        }
    }
}

export const taskController = new TaskController();
