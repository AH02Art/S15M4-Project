require('dotenv').config();
const server = require("./server.js");
const PORT = process.env.PORT || 9000;

server.listen(PORT, function() { 
    console.log(`\n*** server running as "http://localhost:${PORT}" ***\n`) 
});