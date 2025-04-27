import express from 'express'
import * as planoController from '../controllers/planoController.js'
import { validatePlano, validateObjectId } from '../middlewares/validations.js'

const router = express.Router()

router.get('/', planoController.getPlanos)
router.get('/:id', validateObjectId, planoController.getPlanoById)
router.post('/', validatePlano, planoController.createPlano)
router.put('/:id', [validateObjectId, validatePlano], planoController.updatePlano)
router.delete('/:id', validateObjectId, planoController.deletePlano)

export default router