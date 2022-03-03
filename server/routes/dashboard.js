const express = require("express");

const router = express.Router();

const timebank = require("../controller/timebank");
const courseLogic = require("../controller/courseLogic")
const tok = require("../controller/token");


router.get("/test", tok.verifyToken, (req, res) => {
    // console.log("Hi, you're in");
    // res.json("Hi you're in test route of login rn");
    // console.log(req.user); // req.user contains user info
    courseLogic.getTasksByCourse(req.user.user.userID, 1)
    .then(resolve =>{
        // console.log(resolve);
        res.json(resolve);
        return;
    })
    .catch(reject =>{
        res.json(reject);
        return;
    })
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

// maybe sort by a parameter
router.get("/courses/course/tasks", tok.verifyToken, (req, res) => {
    courseLogic.getTasksByCourse(req.user.user.userID, req.query.courseID)
    .then(resolve =>{
        // console.log(resolve);
        res.json(resolve);
        return;
    })
    .catch(reject =>{
        res.json(reject);
        return;
    })
})

// maybe sort by parameter
router.get("/courses", tok.verifyToken, (req, res) => {
    courseLogic.getCourses(req.user.user.userID)
    .then(resolve => {
        res.json(resolve);
        return;
    })
    .catch(reject =>{
        res.json(reject);
        return;
    })
})

router.put("/courses/course/setImportance", tok.verifyToken, (req, res) => {
    courseLogic.setImportance(req.user.user.userID, req.query.courseID, req.query.importance)
    .then(resolve => {
        res.status(200).json(resolve);
        return;
    })
    .catch(reject => {
        res.status(422).json(reject);
        return;
    })
})

router.post("/courses/addCourse", tok.verifyToken, (req, res) => {
    courseLogic.addCourse(req.user.user.userID, req.query.courseID, req.query.importance)
    .then(resolve =>{
        res.status(200).json(resolve);
        return;
    })
    .catch(reject => {
        res.status(422).json(reject);
        return;
    })
})


module.exports = router;