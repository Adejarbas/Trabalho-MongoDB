import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { connectToDatabase } from './config/db.js'
import alunoRoutes from './routes/alunoRoutes.js'
import professorRoutes from './routes/professorRoutes.js'
import treinoRoutes from './routes/treinoRoutes.js'
import planoRoutes from './routes/planoRoutes.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

// Suas rotas
app.use('/alunos', alunoRoutes)
app.use('/professores', professorRoutes)
app.use('/treinos', treinoRoutes)
app.use('/planos', planoRoutes)

connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
  })
}).catch(err => {
  console.error('Erro ao conectar ao MongoDB:', err)
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({
      error: true,
      message: 'Erro interno do servidor',
      details: err.message
    })
  })