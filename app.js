var Express = require('express');
var app = Express();
var dbConnection = require("./db");

app.use(Express.json());

var controllers = require("./controllers");

app.use("/log", controllers.logController);
app.use("/user", controllers.userController);

dbConnection.authenticate()
    .then(() => dbConnection.sync())
    .then(() => {
        app.listen(3000, () => {
            console.log(`[Server]: App is listening...`);
        });
    })
    .catch((err) => {
        console.log(`[Server]: Server crashed. Error = ${err}`);
    });