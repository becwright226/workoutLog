var router = require("express").Router();
var { UniqueConstraintError } = require("sequelize/lib/errors");
var {UserModel} = require("../models");
var jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
     let { email, password } = req.body.user;
    try {
    let User = await UserModel.create({
        email,
        password
    });

    let token = jwt.sign({id: User.id}, "workout_log", {expiresIn: 60 * 60 * 24});

    res.status(201).json({
        message: "One of us, one of us...",
        user: User,
        sessionToken: token
    });
   } catch (err) {
    if (err instanceof UniqueConstraintError) {
    res.status(409).json({
        message: "Already registered",
    });
} else {
    res.status(500).json({
        message: "Failed to register new user",
    });
}
}
});

router.post("/login", async (req, res) => {
    let { email, password } = req.body.user;

    try {
    let loginUser =await UserModel.findOne({
        where: {
            email: email,
        },
    });

    if (loginUser) {

        let token = jwt.sign({id: loginUser.id}, "workout_log", {expiresIn: 60 * 60 * 25});

    res.status(200).json({
        user: loginUser,
        message: "Login successful, welcome back!",
        sessionToken: token
    });
    } else {
        res. status(401).json({
            message: "Login unsuccessful"
        })
    }
} catch (err) {
    res.status(500).json({
        message: "Stranger danger, unsuccessful login"
    })
} 
});

module.exports = router;