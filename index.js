const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const restrict = require("./database/middleware/restrict");
const authRouter = require("./auth/auth_router");
const usersRouter = require("./database/users/users_router");

const server = express();
const port = process.env.PORT || 4000;

// server.use(cors());
server.use(cors({ credentials: true, origin: "http://localhost:3000" })); /// STUDY THIS X1X  This is for cross origin cookie sending for tokens
server.use(helmet());
server.use(express.json());
server.use(cookieParser());
server.use("/auth", authRouter);
server.use("/users", usersRouter);

server.get("/", (req, res, next) => {
    res.json({
        message: "Welcome to our API",
    });
});

server.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({
        message: "Something went wrong",
    });
});

server.listen(port, () => {
    console.log(`Running at http://localhost:${port}`);
});
