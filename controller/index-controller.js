export class IndexController {
    index(req, res) {
        res.render("index", {data: "Hello World", dark: true});
        // res.redirect("/orders");
    };
    createOrder(req, res) {
        res.render("createOrder", {data: "Hello World", dark: true});
    };

    createPizza(req, res) {
        res.render("succeeded", {data: "Hello World", dark: true});
    }
}

export const indexController = new IndexController();
