const express = require("express");
const server = express();
const rotas = require("./rotas")

server.listen(3000, () => {
    console.log("Servidor funcionando perfeitamente")
})

server.use(express.json());
server.use(rotas);