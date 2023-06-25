export class IndexController {
    index(req, res) {
        res.render("index", {data: "Hello World", dark: false});
        // res.redirect("/orders");
    };

    // createTask(req, res) {
    //     res.redirect("/tasks/new");
    // }
}

export const indexController = new IndexController();
