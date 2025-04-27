import express from 'express'
import * as alunoController from '../controllers/alunoController.js'
import { validateAluno, validateObjectId } from '../middlewares/validations.js'

const router = express.Router()

// Adicionar as validações nas rotas
router.get('/', alunoController.getAlunos)
router.get('/:id', validateObjectId, alunoController.getAlunoById)
router.post('/', validateAluno, alunoController.createAluno)
router.put('/:id', [validateObjectId, validateAluno], alunoController.updateAluno)
router.delete('/:id', validateObjectId, alunoController.deleteAluno)

export default router