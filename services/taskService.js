import Datastore from '@seald-io/nedb';

const TaskImportance = {
    NONE: 0,
    LOW: 1,
    MEDIUM: 2,
    HIGH: 3,
    VERY_HIGH: 4,
    URGENT: 5
}

export class Task {
    constructor(title, description, dueDate, importance) {
        this.title = title;
        this.description = description;
        this.creationDate = new Date();
        this.dueDate = dueDate; // TODO this.formatDueDate(dueDate);
        this.importance = importance || TaskImportance.NONE
        this.completed = false;
    }

    formatDueDate(aDueDate) {
        if (aDueDate === null) {
            return null;
        }
        return `${aDueDate.getDate()}/${aDueDate.getMonth() + 1}/${aDueDate.getFullYear()}`;
    }
}

export class TaskStore {
    constructor() {
        this.db = new Datastore({filename: './data/tasks.db', autoload: true});
    }


    add(title, description, dueDate, importance) {
        const task = new Task(title, description, dueDate, importance);
        return new Promise((resolve, reject) => {
            this.db.insert(task, (err, newTask) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(newTask); // Resolve with the entire newTask object
                }
            });
        });
    }

    delete(id) {
        return new Promise((resolve, reject) => {
            this.db.remove({_id: id}, {}, (err, numRemoved) => {
                if (err) {
                    reject(err);
                } else if (numRemoved === 0) {
                    resolve(null);
                } else {
                    resolve({_id: id});
                }
            });
        });
    }

    get(id) {
        return new Promise((resolve, reject) => {
            this.db.findOne({_id: id}, (err, task) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(task);
                }
            });
        });
    }

    update(id, title, importance, dueDate, completed, description) {
        return new Promise((resolve, reject) => {
            this.db.update({_id: id}, {
                $set: {
                    title,
                    importance,
                    dueDate,
                    completed,
                    description
                }
            }, {}, (err, numUpdated) => {
                if (err) {
                    reject(err);
                } else if (numUpdated === 0) {
                    resolve(null);
                } else {
                    resolve({_id: id, title, importance, dueDate, completed, description});
                }
            });
        });
    }

    all() {
        return new Promise((resolve, reject) => {
            this.db.find({}, (err, tasks) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(tasks);
                }
            });
        });
    }

    completed() {
        return new Promise((resolve, reject) => {
            this.db.find({completed: true}, (err, tasks) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(tasks);
                }
            });
        });
    }
}

const taskStore = new TaskStore();
export default taskStore;
