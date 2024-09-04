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
            response.status(404).json({ message: `character with id: ${id} is not found` });
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

server.post("/characters", async function(request, response) {
    try {
        const data = await Character.add({ name: request.body.name.trim() });
        if (!data) {
            response.status(400).json({ message: "this character couldn't be added" });
        } else {
            response.status(201).json(data);
        }
    } catch(error) {
        response.status(500).json({ 
            message: error.message, 
            customMessage: "Something went wrong adding a new character" 
        });        
    }
})

server.use("*", function(request, response) {
    response.status(404).json("I think you have the wrong url...");
})

module.exports = server;