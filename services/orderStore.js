import Datastore from "nedb";

const db = new Datastore({ filename: "./data/order.db", autoload: true });

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
        this.db = new Datastore({ filename: "./data/orders.db", autoload: true });
    }

    delete(id) {
        const order = this.get(id);
        if (order) {
            order.state = "DELETED";
            this.db.update({ _id: order.id }, order);
        }
        return order;
    }

    get(id) {
        return new Promise((resolve, reject) => {
            this.db.findOne({ _id: id }, (err, order) => {
                if (!err) {
                    resolve(order);
                } else {
                    reject(err);
                }
            });
        });
    }

    all() {
        return new Promise((resolve, reject) => {
            this.db.find({}, (err, orders) => {
                if (!err) {
                    resolve(orders);
                } else {
                    reject(err);
                }
            });
        });
    }
}

export const orderStore = new OrderStore();
