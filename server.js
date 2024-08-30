const express = require("express");
const Character = require("./data/model.js"); // this line breaks my server...

const server = express();

server.use(express.json());
server.disable("x-powered-by");

server.get("/alex", function(request, response) {
    response.status(200).json({ project: "S15M4-Project", developer: "Alex" });
})

server.get("/characters", async function(request, response) {
    try {
        const data = await Character.getAll();
        console.log("characters =", data);
        if (!data) {
            response.json({ message: "Couldn't fetch the characters" });
        } else {
            response.status(200).json(data);
        }
    } catch(error) {
        response.status(500).json({ 
            message: error.message, 
            customMessage: "Something went wrong getting the characters data" 
        });
    }
})

server.get("/characters/:id", async function(request, response) {
    try {
        const { id } = request.params;
        const data = await Character.getById(id)
        if (!data) {
            response.status(404).json({ message: `user with id: ${id} is not found` });
        } else {
            response.status(200).json(data);
        }
    } catch(error) {
        response.status(500).json({ 
            message: error.message, 
            customMessage: "Something went wrong getting a character id" 
        });
    }
})

server.post("/characters", function(request, response) {
    response.json("add()")
})

server.use("*", function(request, response) {
    response.status(404).json("I think you have the wrong url...");
})

module.exports = server;