global.config = require(process.env.NODE_ENV === "production" ? "./config-prod.json" : "./config-dev.json");
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const authController = require("./controllers/auth-controller");
const vacationsController = require("./controllers/vacations-controller");
const vacationLogic = require("./vacation-logic");
const server = express();

// Handle files send to our backend:
server.use(fileUpload()); // Place the given files in request.files collection

// Create images folder if not exists: 
if (!fs.existsSync("./images")) fs.mkdirSync("./images");

server.use(express.json());
server.use(cors());

server.use("/api/auth", authController);
server.use("/api/vacations", vacationsController);

const listener = server.listen(3010, () => console.log("Listening on http://localhost:3010"));

vacationLogic.start(listener);