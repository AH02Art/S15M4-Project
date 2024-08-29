const express = require("express");

const server = express();

server.use(express.json());
server.disable("x-powered-by");

server.use("/alex", function(request, response) {
    response.json({ project: "S15M4-Project", developer: "Alex" });
})

module.exports = server;