var Express = require("express");
var router = Express.Router();

router.get("/practice", (req, res) => {
    res.send("This is another test!")
});

module.exports = router;