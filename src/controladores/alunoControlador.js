const AlunoModel = require("../modelos/aluno")
const jsonAlunos = require("../banco/alunos.json")
const fs = require("fs/promises")




function cadastrarAluno(req, res) {
    try {

        let idAluno = jsonAlunos.length + 1;

        const { nomeAluno, idade, dataNascimento, endereco, moraCom, qtdIrmaos, responsavel } = req.body;

        const alunoEncontrado = jsonAlunos.find(aluno => aluno.idAluno === Number(idAluno));

        if (alunoEncontrado) {
            return res.status(201).json({ mensagem: "Aluno já existe" })
        }

        const novoAluno = new AlunoModel(idAluno, nomeAluno, idade, dataNascimento, endereco, moraCom, qtdIrmaos, responsavel);
        jsonAlunos.push(novoAluno)
        fs.writeFile("./src/banco/alunos.json", JSON.stringify(jsonAlunos, null, 4))//escreve no json

        return res.status(201).json({ mensagem: "Aluno cadastrado com sucesso" })

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro do servidor, aluno não cadastrado." })
    }
}

function editarAluno(req, res) {

    try {
        const { id } = req.params;
        const { nomeAluno, idade, dataNascimento, endereco, moraCom, qtdIrmaos, responsavel } = req.body;

        const alunoEncontrado = jsonAlunos.find(aluno => aluno.idAluno === Number(id))


        if (!alunoEncontrado) {
            return res.status(404).json({ mensagem: "Aluno não encontrado, tente um id válido" })
        }

        const alunoIndex = jsonAlunos.findIndex(aluno => aluno.idAluno === Number(id))

        alunoEncontrado.nomeAluno = nomeAluno;
        alunoEncontrado.idade = idade;
        alunoEncontrado.dataNascimento = dataNascimento;
        alunoEncontrado.endereco = endereco;
        alunoEncontrado.moraCom = moraCom;
        alunoEncontrado.qtdIrmaos = qtdIrmaos;
        alunoEncontrado.responsavel = responsavel;

        jsonAlunos[alunoIndex] = alunoEncontrado;
        fs.writeFile("./src/banco/alunos.json", JSON.stringify(jsonAlunos, null, 4))//escreve no json

        return res.status(201).json({ mensagem: "Aluno editado com sucesso!" })

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro do servidor, aluno não editado." })
    }

}

function deletarAluno(req, res) {
    try {
        const { id } = req.params;

        const alunoIndex = jsonAlunos.findIndex(aluno => aluno.idAluno === Number(id))

        if (alunoIndex === -1) {
            return res.status(404).json({ mensagem: "Aluno não encontrado, tente um id válido" })
        }

        jsonAlunos.splice(alunoIndex, 1)
        fs.writeFile("./src/banco/alunos.json", JSON.stringify(jsonAlunos, null, 4))//escreve no json

        res.status(200).json({ mensagem: "Aluno excluído com sucesso!" })
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro do servidor, aluno não removido." })
    }


}

function listarAluno(req, res) {
    try {
        const urlAtual = req.path;

        if (jsonAlunos.length === 0) {
            return res.status(404).json({ mensagem: "Não há registros em Alunos." })
        }

        //PAGINACAO - Usando Query String
        //http://localhost:3000/aluno?limit=10&offset
        let { limit, offset } = req.query;

        limit = Number(limit) || 5;
        offset = Number(offset) || 0;

        const total = jsonAlunos.length

        let paginaAtual = [];
        paginaAtual = jsonAlunos.slice(offset, offset + limit)

        //criando as urls proxima e anterior
        const proximo = offset + limit;
        const proximoUrl = proximo < total ? `${urlAtual}?limit=${limit}&offset=${proximo}` : null;


        const anterior = proximo - limit <= 0 ? null : offset - limit;
        const anteriorUrl =
            anterior != null ? `${urlAtual}?limit=${limit}&offset=${anterior}` : null

        return res.status(200).json({
            proximoUrl,
            anteriorUrl,
            limit,
            offset,
            total,
            paginaAtual
        });

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro do servidor. Não foi possível listar os alunos." })
    }

}


module.exports = { cadastrarAluno, editarAluno, listarAluno, deletarAluno }