const express = require("express");

const server = express();

server.use(express.json());
server.disable("x-powered-by");

server.get("/alex", function(request, response) {
    response.status(200).json({ project: "S15M4-Project", developer: "Alex" });
})

server.use("*", function(request, response) {
    response.status(404).json("I think you have the wrong url...");
})

module.exports = server;