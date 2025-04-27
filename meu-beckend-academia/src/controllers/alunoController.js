import { ObjectId } from 'mongodb'
import { getDb } from '../config/db.js'

// Listar todos os alunos
export async function getAlunos(req, res, next) {
  try {
    const db = getDb()
    const alunos = await db.collection('alunos').find().toArray()
    res.json(alunos)
  } catch (err) {
    next(err) // Usar next(err) em vez de res.status(500)
  }
}

// Buscar aluno por ID
export async function getAlunoById(req, res, next) {
  try {
    const db = getDb()
    const aluno = await db.collection('alunos').findOne({ _id: new ObjectId(req.params.id) })
    if (!aluno) {
      return res.status(404).json({ message: 'Aluno não encontrado' })
    }
    res.json(aluno)
  } catch (err) {
    next(err)
  }
}

// Criar novo aluno
export async function createAluno(req, res, next) {
  try {
    const db = getDb()
    // Remover verificação de email (já está no middleware de validação)
    const result = await db.collection('alunos').insertOne(req.body)
    res.status(201).json({ _id: result.insertedId, ...req.body })
  } catch (err) {
    next(err)
  }
}

// Atualizar aluno
export async function updateAluno(req, res, next) {
  try {
    const db = getDb()
    const id = new ObjectId(req.params.id)
    // Remover verificação de email (já está no middleware de validação)
    const result = await db.collection('alunos').updateOne(
      { _id: id },
      { $set: req.body }
    )
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Aluno não encontrado' })
    }
    const alunoAtualizado = await db.collection('alunos').findOne({ _id: id })
    res.json(alunoAtualizado)
  } catch (err) {
    next(err)
  }
}

// Deletar aluno
export async function deleteAluno(req, res, next) {
  try {
    const db = getDb()
    const id = new ObjectId(req.params.id)
    const result = await db.collection('alunos').deleteOne({ _id: id })
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Aluno não encontrado' })
    }
    res.json({ message: 'Aluno removido com sucesso' })
  } catch (err) {
    next(err)
  }
}