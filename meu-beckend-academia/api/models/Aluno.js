const mongoose = require('mongoose');

const alunoSchema = new mongoose.Schema({
    nome: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    dataNascimento: Date,
    telefone: String,
    endereco: String,
    plano: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Plano' 
    },
    treinos: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Treino' 
    }]
});

module.exports = mongoose.model('Aluno', alunoSchema);