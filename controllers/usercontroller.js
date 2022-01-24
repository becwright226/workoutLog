var router = require("express").Router();
var { UniqueConstraintError } = require("sequelize/lib/errors");
var {UserModel} = require("../models");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
     let { email, password } = req.body.user;
    try {
    let User = await UserModel.create({
        email,
        password: bcrypt.hashSync(password, 13),
    });

    let token = jwt.sign({id: User.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});

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

        let passwordComparison = await bcrypt.compare(password, loginUser.password);

        if (passwordComparison) {
        let token = jwt.sign({id: loginUser.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 25});

        res.status(200).json({
        user: loginUser,
        message: "Login successful, welcome back!",
        sessionToken: token
    });
    } else {
        res. status(401).json({
            message: "Incorrect Email or Password"
        })
    }
    } else {
        res.status(401).json({
            message: "Incorrect Email or Password"
        });
        
    }
} catch (err) {
    res.status(500).json({
        message: "Stranger danger, unsuccessful login"
    })
} 
});

module.exports = router;