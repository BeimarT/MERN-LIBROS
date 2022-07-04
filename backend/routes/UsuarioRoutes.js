import express from 'express'
import { registro, perfil, confirmar, login, passwordOlvidada, comprobarToken, nuevaPassword, actualizarPerfil, actualizarPassword } from '../controllers/UsuarioController.js'
import checkAuth from '../middleware/authMiddleware.js'

const router = express.Router()

// Público
router.post('/registro', registro)
router.get('/confirmar/:token', confirmar)
router.post('/login', login)
router.post('/password-olvidada', passwordOlvidada)
router.route('/password-olvidada/:token').get(comprobarToken).post(nuevaPassword)

// Privado
router.get('/perfil', checkAuth, perfil)
router.put('/perfil/:id', checkAuth, actualizarPerfil)
router.put('/actualizar-password', checkAuth, actualizarPassword)

export default router
