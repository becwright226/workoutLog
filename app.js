require("dotenv").config();
var Express = require('express');
var app = Express();
var dbConnection = require("./db");

app.use(Express.json());

var controllers = require("./controllers");

app.use("/user", controllers.userController);

app.use("/log", controllers.logController);

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