const express = require("express");
const Users = require("./users_model");
const restrict = require("../middleware/restrict");

const router = express.Router({
    mergeParams: true,
});

router.get("/", restrict("admin"), async (req, res, next) => {
    try {
        res.json(await Users.find());
    } catch (err) {
        next("", err);
    }
});

module.exports = router;
