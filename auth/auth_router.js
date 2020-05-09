const express = require("express");
const bcrypt = require("bcryptjs");
const Users = require("../database/users/users_model");
const restrict = require("../database/middleware/restrict");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/register", async (req, res, next) => {
    try {
        const { username } = req.body;
        const user = await Users.findBy({ username }).first();

        if (user) {
            return res.status(409).json({
                message: "Already a user by this name",
            });
        }

        res.status(201).json(await Users.add(req.body));
    } catch (err) {
        next(err);
    }
});

router.post("/login", async (req, res, next) => {
    const authError = {
        message: "Invalid Credentials",
    };

    try {
        const user = await Users.findBy({
            username: req.body.username,
        }).first();
        if (!user) {
            return res.status(401).json(authError);
        }

        const passwordValid = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!passwordValid) {
            return res.status(401).json(authError);
        }

        const tokenPayload = {
            userId: user.userId,
            userRole: "normal",
        };

        token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
            expiresIn: "24h",
        });

        res.cookie(
            "token",
            jwt.sign(tokenPayload, process.env.JWT_SECRET, {
                expiresIn: "24h",
            })
        );

        res.json({
            message: "Welcome!",
            token: token,
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
