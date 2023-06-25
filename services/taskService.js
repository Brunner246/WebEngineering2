import Datastore from '@seald-io/nedb';

const TaskImportance = {
    NONE: 0,
    LOW: 1,
    MEDIUM: 2,
    HIGH: 3,
    VERY_HIGH: 4,
    URGENT: 5

}

class Task {
    constructor(id, title, description, dueDate, importance) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.creationDate = new Date();
        this.dueDate = this.formatDueDate(dueDate);
        this.importance = importance || TaskImportance.NONE
        this.completed = false;
    }

    isCompleted() {
        return this.completed;
    }

    setCompleted(completed) {
        this.completed = completed;
    }

    getDescription() {
        return this.description;
    }

    setDescription(description) {
        this.description = description;
    }

    getCreationDate() {
        return this.creationDate;
    }

    formatDueDate(aDueDate) {
        if (aDueDate === null) {
            return null;
        }
        return `${aDueDate.getDate()}/${aDueDate.getMonth() + 1}/${aDueDate.getFullYear()}`;
    }

    isOverdue() {
        return this.dueDate !== null && this.dueDate < new Date();
    }
}

class TaskStore {
    constructor() {
        this.db = new Datastore({ filename: 'tasks.db', autoload: true });
    }

    add(title, description, dueDate, importance) {
        const task = new Task(undefined, title, description, dueDate, importance);
        return new Promise((resolve, reject) => {
            this.db.insert(task, (err, newTask) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(newTask);
                }
            });
        });
    }

    delete(id) {
        return new Promise((resolve, reject) => {
            this.db.remove({ _id: id }, {}, (err, numRemoved) => {
                if (err) {
                    reject(err);
                } else if (numRemoved === 0) {
                    resolve(null);
                } else {
                    resolve({ _id: id });
                }
            });
        });
    }

    get(id) {
        return new Promise((resolve, reject) => {
            this.db.findOne({ _id: id }, (err, task) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(task);
                }
            });
        });
    }

    update(id, description) {
        return new Promise((resolve, reject) => {
            this.db.update({ _id: id }, { $set: { description } }, {}, (err, numUpdated) => {
                if (err) {
                    reject(err);
                } else if (numUpdated === 0) {
                    resolve(null);
                } else {
                    resolve({ _id: id, description });
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
}

const taskStore = new TaskStore();
export default taskStore;
