import express from 'express'
import { agregarLibro, obtenerLibros, obtenerLibro, actualizarLibro, eliminarLibro } from '../controllers/LibroController.js'
import checkAuth from '../middleware/authMiddleware.js'

const router = express.Router()

router
  .route('/')
  .post(checkAuth, agregarLibro)
  .get(checkAuth, obtenerLibros)

router
  .route('/:id')
  .get(checkAuth, obtenerLibro)
  .put(checkAuth, actualizarLibro)
  .delete(checkAuth, eliminarLibro)
export default router
