const express = require("express");
const mysql = require("mysql");

const server = express();
server.use(express.json());

//Cria a conexão
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'S#nha01Teste',
    database : 'pets'
});

// Conecta
db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("MySQL conectado...")
    }
});


// ---- Rotas ----

// Get
server.get("/cats", (req, res) => {
    db.query("SELECT * FROM pets.cat", (err, result) => {
        if (err) {
            console.log(err)
        } 
        
        res.send(result);
    });
    
});

// Get com id
server.get("/cats/:index", (req, res) => {
    const {index} = req.params;
    db.query("SELECT * FROM pets.cat WHERE id = ?", index, (err, result) => {
        if (err) {
            console.log(err)
        } 
        
        res.send(result);
    });
})

// Post
server.post("/cats", (req, res) => {
    
    let sql = "INSERT INTO pets.cat (name, owner, birth) VALUES (?, ?, ?)";
    db.query(sql, [req.body.name, req.body.owner, req.body.birth], (err, result) => {
        if (err) {
            console.log(err)
        } 
        
        res.send(result);
    });

});

// Update/Put
server.put("/cats/:index", (req, res) => {
    const {index} = req.params;

    let sql = "UPDATE pets.cat SET name = ?, owner = ?, birth = ? WHERE id = ?";

    db.query(sql, [req.body.name, req.body.owner, req.body.birth, index], (err, result) => {
        if (err) {
            console.log(err)
        } 
        
        res.send(result);
    });

});


// Delete
server.delete("/cats/:index", (req, res) => {
    const {index} = req.params;

    let sql = "DELETE FROM pets.cat WHERE id = ?";

    db.query(sql, index, (err, result) => {
        if (err) {
            console.log(err)
        } 
        
        res.send(result);
    });
});


// ------

server.listen(3000, () => {
    console.log("Servidor em execução na porta: 3000");
});