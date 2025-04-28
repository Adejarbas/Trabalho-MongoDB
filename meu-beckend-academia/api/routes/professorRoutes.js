import express from 'express'
import * as professorController from '../controllers/professorController.js'
import { validateProfessor, validateObjectId } from '../middlewares/validations.js'

const router = express.Router()

router.get('/', professorController.getProfessores)
router.get('/:id', validateObjectId, professorController.getProfessorById)
router.post('/', validateProfessor, professorController.createProfessor)
router.put('/:id', [validateObjectId, validateProfessor], professorController.updateProfessor)
router.delete('/:id', validateObjectId, professorController.deleteProfessor)

export default router