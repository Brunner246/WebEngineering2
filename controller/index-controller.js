export class IndexController {
    index(req, res) {
        res.render("index");
        // res.redirect("/orders");
    };

    // createTask(req, res) {
    //     res.redirect("/tasks/new");
    // }
}

export const indexController = new IndexController();
