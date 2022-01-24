var jwt = require("jsonwebtoken");
var { UserModel } = require("../models");

var validateJWT = async (req, res, next) => {
    if (req.method == "OPTIONS") {
        next();
    } else if (
        req.headers.authorization &&
        req.headers.authorization.includes("Bearer")
    ) {
        var { authorization } = req.headers;
        var payload = authorization
        ? jwt.verify(
            authorization.includes("Bearer")
            ? authorization.split(" ")[1]
            : authorization,
            process.env.JWT_SECRET
        )
        : undefined;

        

        if (payload) {
            let foundUser = await UserModel.findOne({where: {id: payload.id}});
            
            if (foundUser) {
                
                req.user = foundUser;

                next();
            } else{
                res.status(400).send({message: "Not Authorized"});
            }        
        } else {
            res.status(401).send ({ message: "Invalid token"});
        }
    } else {
        res.status(403).send({ message: "Forbidden"});
    }
    };

module.exports = validateJWT;