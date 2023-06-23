import Datastore from '@seald-io/nedb';
class Task {
    constructor(id, description) {
        this.id = id;
        this.description = description;
        this.creationDate = new Date();
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
}

class TaskStore {
    constructor() {
        this.db = new Datastore({ filename: 'tasks.db', autoload: true });
    }

    add(description) {
        const task = new Task(undefined, description);
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