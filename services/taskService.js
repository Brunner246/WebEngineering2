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
        this.tasks = [];
    }

    add(description) {
        const task = new Task(this.tasks.length, description);
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
