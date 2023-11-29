class Aluno {
    constructor(idAluno, nomeAluno, idade, dataNascimento, endereco, moraCom, qtdIrmaos, responsavel) {
        this.idAluno = idAluno
        this.nomeAluno = nomeAluno
        this.idade = idade
        this.dataNascimento = dataNascimento
        this.endereco = endereco
        this.moraCom = moraCom
        this.qtdIrmaos = qtdIrmaos
        this.responsavel = responsavel
    }
}

module.exports = Aluno;