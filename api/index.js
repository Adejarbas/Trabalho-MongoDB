import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { connectToDatabase } from './config/db.js'
import alunoRoutes from './routes/alunoRoutes.js'
import professorRoutes from './routes/professorRoutes.js'
import treinoRoutes from './routes/treinoRoutes.js'
import planoRoutes from './routes/planoRoutes.js'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/alunos', alunoRoutes)
app.use('/professores', professorRoutes)
app.use('/treinos', treinoRoutes)
app.use('/planos', planoRoutes)

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    error: true,
    message: 'Erro interno do servidor',
    details: err.message
  })
})

let isConnected = false
export default async function handler(req, res) {
  if (!isConnected) {
    await connectToDatabase()
    isConnected = true
  }
  app(req, res)
}