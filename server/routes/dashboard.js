const express = require("express");

const router = express.Router();

const timebank = require("../controller/timebank");
const tok = require("../controller/token");

router.get("/test", tok.verifyToken, (req, res) => {
    // console.log("Hi, you're in");
    res.json("Hi you're in test route of login rn");
    console.log(req.user); // req.user contains user info
})

router.get("/user", tok.verifyToken, (req, res) => {
    res.json(req.user.user);
    return;

})

router.get("/timeBank/view", tok.verifyToken, (req, res) => {
    var userID = req.user.user.userID;
    timebank.getTimebank(userID)
    .then(resolve => {
        //console.log(resolve)
        res.json(resolve);
        return;
    })
    .catch(reject => {
        // console.log(reject)
        res.json(reject);
        return;
    });
})

// TO DO
router.put("/timeBank/update", tok.verifyToken, (req, res) => {
    timebank.changeTimeBank(req.user.user.userID, req.body)
    .then(resolve => {
        res.status(200).json("Success");
        return;
    })
    .catch(reject => {
        res.json(reject);
        return;
    })
})

// get all classes (sort by param)
// get specific class
// get all tasks (sort by param)
// get specific task

module.exports = router;