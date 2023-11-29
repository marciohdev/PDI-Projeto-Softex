const AlunoModel = require("../modelos/aluno")
const bancoAlunos = require("../banco/bancoAlunos")
let idAluno = bancoAlunos.length + 1;

function cadastrarAluno(req, res) {
    try {
        const { nomeAluno, idade, dataNascimento, endereco, moraCom, qtdIrmaos, responsavel } = req.body;

        const alunoEncontrado = bancoAlunos.find(aluno => aluno.idAluno === Number(idAluno));

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
} //concluído - falta testar

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

    }

} //concluído - falta testar

function deletarAluno(req, res) {
    const { id } = req.params;
}

function listarAluno(req, res) {

}


module.exports = { cadastrarAluno, editarAluno, listarAluno, deletarAluno }