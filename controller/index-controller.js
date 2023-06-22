export class IndexController {
    index(req, res) {
        res.render("index", {data: "Hello World", dark: false});
        // res.redirect("/orders");
    };
    createOrder(req, res) {
        res.render("createOrder", {data: "Hello World", dark: false});
    };

    createPizza(req, res) {
        res.render("succeeded", {data: "Hello World", dark: false});
    }
}

export const indexController = new IndexController();
