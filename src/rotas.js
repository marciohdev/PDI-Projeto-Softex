const express = require("express");
const rotas = express.Router();

const { cadastrarAluno, editarAluno, listarAluno, deletarAluno } = require("./controladores/alunoControlador")

rotas.get("/aluno", listarAluno)
rotas.post("/aluno", cadastrarAluno)
rotas.put("/aluno/:id", editarAluno)
rotas.delete("/aluno/:id", deletarAluno)

module.exports = rotas;
