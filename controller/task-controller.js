import taskStore from '../services/taskService.js';

let showAllTasks = true;

export class TaskController {
    async createTask(req, res) {
        const {title, description, dueDate, importance} = req.body;
        try {
            const task = await taskStore.add(title, description, dueDate, importance);
            res.redirect('/' + task._id + '/edit');
        } catch (error) {
            res.status(500).render('error', {error});
        }
    }

    async renderTask(req, res) {
        try {
            res.render('index', {tasks: await taskStore.all(), sortDirection: await req.userSettings});
        } catch (error) {
            res.render('error', {error});
        }
    }

    async createAndRenderTask(req, res) {
        try {
            const {title, description, dueDate, importance} = req.body;
            await taskStore.add(title, description, dueDate, importance);
            res.redirect("/");
        } catch (error) {
            res.render('error', {error});
        }
    }

    async deleteTask(req, res) {
        const id = req.params.id;
        try {
            const task = await taskStore.delete(id);
            if (task) {
                res.redirect('/');
            } else {
                res.render('taskNotFound');
            }
        } catch (error) {
            res.render('error', {error});
        }
    }

    async getTaskDetails(req, res) {
        const id = req.params.id;
        try {
            const task = await taskStore.get(id);
            if (task) {
                res.render('taskDetails', {task});
            } else {
                console.log('Task not found');
                res.render('error', {error: 'Task not found'});
            }
        } catch (error) {
            res.render('error', {error});
        }
    }

    async createNewTask(req, res) {
        res.render('taskDetails', {});
    }


    async updateTask(req, res) {
        const {id} = req.params;
        const {title, importance, dueDate, completed, description, button} = req.body;
        try {
            const task = await taskStore.update(id, title, importance, dueDate, completed === 'on' ? "DONE" : "OPEN", description);
            if (button === "update" || button === "create") {
                if (task) {
                    res.redirect('/' + task._id + '/edit');
                } else {
                    res.status(404).render('error', {error: 'Task not found'});
                }
            } else {
                res.redirect('/');
            }
        } catch (error) {
            res.render('error', {error});
        }
    }

    async getAllTasks(req, res) {
        try {
            res.render('index', {tasks: await taskStore.all(), sortDirection: await req.userSettings});
        } catch (error) {
            res.render('error', {error});
        }
    }

    async getOpenTasks(req, res) {
        try {
            res.render('index', {
                tasks: await taskStore.completed(),
                sortDirection: await req.userSettings
            });
        } catch (error) {
            res.render('error', {error});
        }
    }

    async filterOpenTasks(req, res) {
        try {
            showAllTasks = !showAllTasks;
            if (showAllTasks) {
                taskStore.filteredTasks = [];
            } else {
                taskStore.filteredTasks = await taskStore.completed();
            }

            let tasks;
            if (showAllTasks) {
                tasks = await taskStore.all();
            } else {
                tasks = taskStore.filteredTasks;
            }

            res.render('index', {tasks, sortDirection: req.userSettings});
        } catch (error) {
            res.status(500).render('error', {error});
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

        let tasks;
        try {
            console.log(showAllTasks);
            if (showAllTasks === false) {
                tasks = taskStore.filteredTasks;
            } else {
                tasks = await taskStore.all();
            }

            if (sortFunction) {
                tasks.sort(orderDirection === "-1" ? sortFunction : (a, b) => sortFunction(b, a));
            }
            res.render('index', {tasks: tasks, sortDirection: req.userSettings});
            req.userSettings.orderDirection = req.userSettings.orderDirection === "-1" ? "1" : "-1";

        } catch (error) {
            res.render('error', {error});
        }
    }

    async toggleDarkMode(req, res) {
        if (req.session.userSettings) {
            req.session.userSettings.darkMode = !req.session.userSettings.darkMode;
        } else {
            req.session.userSettings = { darkMode: true };
        }
        res.redirect('/');
    }
}

export const taskController = new TaskController();
