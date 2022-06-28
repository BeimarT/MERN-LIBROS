import express from 'express'
import { registro, perfil, confirmar, login, passwordOlvidada, comprobarToken, nuevaPassword } from '../controllers/UsuarioController.js'
import checkAuth from '../middleware/authMiddleware.js'

const router = express.Router()

// Público
router.post('/registro', registro)
router.get('/confirmar/:token', confirmar)
router.post('/login', login)
router.post('/password-olvidada', passwordOlvidada)
// router.get('/password-olvidada/:token', comprobarToken)
// router.get('password-olvidada/:token', nuevaPassword)
router.route('/password-olvidada/:token').get(comprobarToken).post(nuevaPassword)

// Privado
router.get('/perfil', checkAuth, perfil)

export default router
