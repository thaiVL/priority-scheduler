const express = require("express");

const jwt = require("jsonwebtoken");

const router = express.Router();
const db = require("../controller/mysqldb");

const tok = require("../controller/token")



router.get("/test", tok.verifyToken, (req, res) => {
    // console.log("Hi, you're in");
    res.json("Hi you're in test route of login rn");
    console.log(req.user); // req.user contains user info
})

router.get("/user", tok.verifyToken, (req, res) => {
    res.json(req.user.user)
})


module.exports = router;