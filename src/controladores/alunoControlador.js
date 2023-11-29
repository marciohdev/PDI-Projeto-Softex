const AlunoModel = require("../modelos/aluno")
const bancoAlunos = require("../banco/bancoAlunos")


function cadastrarAluno(req, res) {
    try {

        let idAluno = bancoAlunos.length + 1;

        const { nomeAluno, idade, dataNascimento, endereco, moraCom, qtdIrmaos, responsavel } = req.body;
        console.log(bancoAlunos.length)

        const alunoEncontrado = bancoAlunos.find(aluno => aluno.idAluno === Number(idAluno));
        console.log(alunoEncontrado)

        if (alunoEncontrado) {
            return res.status(201).json({ mensagem: "Aluno já existe" })
        }

        const novoAluno = new AlunoModel(idAluno, nomeAluno, idade, dataNascimento, endereco, moraCom, qtdIrmaos, responsavel);
        bancoAlunos.push(novoAluno)
        console.log(novoAluno)
        return res.status(201).json({ mensagem: "Aluno cadastrado com sucesso" })

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro do servidor, aluno não cadastrado." })
    }
}

function editarAluno(req, res) {

    try {
        const { id } = req.params;
        const { nomeAluno, idade, dataNascimento, endereco, moraCom, qtdIrmaos, responsavel } = req.body;

        const alunoEncontrado = bancoAlunos.find(aluno => aluno.idAluno === Number(id))


        if (!alunoEncontrado) {
            return res.status(404).json({ mensagem: "Aluno não encontrado, tente um id válido" })
        }

        const alunoIndex = bancoAlunos.findIndex(aluno => aluno.idAluno === Number(id))

        alunoEncontrado.nomeAluno = nomeAluno;
        alunoEncontrado.idade = idade;
        alunoEncontrado.dataNascimento = dataNascimento;
        alunoEncontrado.endereco = endereco;
        alunoEncontrado.moraCom = moraCom;
        alunoEncontrado.qtdIrmaos = qtdIrmaos;
        alunoEncontrado.responsavel = responsavel;

        bancoAlunos[alunoIndex] = alunoEncontrado;

        console.log(bancoAlunos[0])
        return res.status(201).json({ mensagem: "Aluno editado com sucesso!" })

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro do servidor, aluno não editado." })
    }

}

function deletarAluno(req, res) {
    try {
        const { id } = req.params;

        const alunoEncontrado = bancoAlunos.find(aluno => aluno.idAluno === Number(id))
        if (!alunoEncontrado) {
            return res.status(404).json({ mensagem: "Aluno não encontrado, tente um id válido" })
        }

        const alunoIndex = bancoAlunos.findIndex(aluno => aluno.idAluno === Number(id))
        bancoAlunos.splice(alunoIndex, 1)
        console.log(bancoAlunos)
        res.status(200).json({ mensagem: "Aluno excluído com sucesso!" })
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro do servidor, aluno não removido." })
    }


}

function listarAluno(req, res) {
    try {
        return res.status(200).json(bancoAlunos)
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro do servidor. Não foi possível listar os alunos." })
    }

}


module.exports = { cadastrarAluno, editarAluno, listarAluno, deletarAluno }