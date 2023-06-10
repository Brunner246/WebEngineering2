class Task {
    constructor(id, description, assignedTo) {
        this.id = id;
        this.description = description;
        this.assignedTo = assignedTo;
        this.creationDate = new Date();
        this.completed = false;
    }
}

class TaskStore {
    constructor() {
        this.tasks = [];
    }

    add(description, assignedTo) {
        const task = new Task(this.tasks.length, description, assignedTo);
        this.tasks.push(task);
        return task;
    }

    delete(id) {
        const task = this.get(id);
        if (task) {
            task.completed = true;
        }
        return task;
    }

    get(id) {
        return this.tasks.find((task) => task.id === id);
    }

    all() {
        return this.tasks;
    }
}

const taskStore = new TaskStore();
export default taskStore;
