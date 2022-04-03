const express = require("express");
const server = express();
server.use(express.json());

const geeks = [];

server.get("/geeks", (req, res) => {
    return res.json(geeks);
});

server.get("/geeks/:index", (req, res) => {
    return res.json(geeks[req.params.index]);
})

server.post("/geeks", (req, res) => {
    const {name} = req.body;
    geeks.push(name);
    return res.json(geeks);
});

server.put("/geeks/:index", (req, res) => {
    const {index} = req.params;
    const {name} = req.body;

    geeks[index] = name;

    return res.json(geeks);
});

server.delete("/geeks/:index", (req, res) => {
    const {index} = req.params;
    geeks.splice(index, 1);

    return res.send();
});

server.listen(3000);