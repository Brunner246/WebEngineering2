import Datastore from '@seald-io/nedb';

const db = new Datastore({filename: './data/order.db', autoload: true});

class Order {
    constructor(id, task, orderedBy) {
        this.id = id;
        this.orderedBy = orderedBy;
        this.task = task;
        this.orderDate = new Date();
        this.state = "OK";
    }
}


class OrderStore {
    constructor() {
        this.orders = [];
    }

    add(pizzaName, orderedBy) {
        let order = new Order(this.orders.length, pizzaName, orderedBy);
        this.orders.push(order);
        return order;

    }

    delete(id) {
        let order = this.get(id);
        if (order) {
            order.state = "DELETED";
        }
        return order;
    }

    get(id) {
        return this.orders[id];
    }

    all() {
        return this.orders;
    }
}

export const orderStore = new OrderStore();
