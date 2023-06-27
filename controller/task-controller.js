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

    // renderTaskDetails(req, res) {
    //     res.render('newTask', {taskName: req.body.taskName}); // taskName: req.userSettings.orderBy
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
            res.render('allTasks', {tasks: await taskStore.all()});
        } catch (error) {
            res.render('error', {error});
        }
    }

    async sortTasks(req, res) {
        // TODO: implement sorting by dueDate, creationDate, importance URL params (e.g. /tasks/sort?orderBy=dueDate&orderDirection=desc)
        const { orderBy, orderDirection } = req.userSettings;

        try {
            let tasks = await taskStore.all();

            if (orderBy === 'title') {
                tasks.sort((a, b) => {
                    if (a.title < b.title) return -1;
                    if (a.title > b.title) return 1;
                    return 0;
                });
            } else if (orderBy === 'dueDate') {
                tasks.sort((a, b) => a.dueDate - b.dueDate);
            } else if (orderBy === 'creationDate') {
                tasks.sort((a, b) => a.creationDate - b.creationDate);
            } else if (orderBy === 'importance') {
                tasks.sort((a, b) => b.importance - a.importance);
            }

            if (orderDirection === 'desc') {
                tasks.reverse();
            }

            res.render('allTasks', { tasks });
        } catch (error) {
            res.render('error', { error });
        }
    }
}

export const taskController = new TaskController();
