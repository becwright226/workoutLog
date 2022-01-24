var Express = require("express");
var router = Express.Router();
var {LogModel}= require("../models")
let validateJWT = require("../middleware/validate-jwt");


router.post('/create', validateJWT, async (req, res) => {
    var {id} = req.user
    
    try {
        var createLog =await LogModel.create({
            description: req.body.log.description,
            definition: req.body.log.definition,
            result: req.body.log.result,
            owner: id
        })
        console.log(createLog)
        res.status(201).json({
            message:"Log successfully created",
            createLog
        })
    } catch (err) {
        res.status(500).json({
            message: `Failed to create log ${err}`
        })
    }
});

router.get("/mine", validateJWT, async (req,res) => {
    let { id } = req.user
    try {
        const userlogs = await LogModel.findAll({
            where: {
                owner: id,
            }
        });
        
        res.status(200).json({
            message: "Here is your logs",
            userlogs
        });
    } catch (err) {
        res.status(500).json({error: `${err}`});
    }
    });

router.get("/:id", async (req,res) =>{
    var {id} = req.params;
    try {
        let results = await LogModel.findAll({
            where: {id: id}
        });
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ error: err});
    }
});

router.put("/update/:entryId", validateJWT, async (req, res) => {
    var {description,definition,result} = req.body.log;
    var logId = req.params.entryId;
    var userId = req.user.id;

    var query = {
        where:{
            id: logId,
            owner: userId
        }
    };

    var updatedLog = {
        description: description,
        definition: definition,
        result: result
    };

    try {
        var update = LogModel.update(updatedLog, query);
        res.status(200).json(update);
    } catch (err) {
        res.status(500).json({ error: err});
    }
});

router.delete("/delete/:id", validateJWT, async (req,res) => {
    var ownerId = req.user.id;
    var logId = req.params.id;

    try{
        var query = {
            where:{
                id: logId,
                owner: ownerId
            }
        };

        await LogModel.destroy(query);
        res.status(200).json({message: "Log Removed"});
        } catch (err) {
        res.status(500).json({error: `${err}`})
    }
})

module.exports = router;