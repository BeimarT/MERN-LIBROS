import emailPasswordOlvidada from '../helpers/emailPasswordOlvidada.js'
import emailVerificar from '../helpers/emailVerificar.js'
import generarId from '../helpers/generarID.js'
import generarJWT from '../helpers/generarJWT.js'
import Usuario from '../models/Usuario.js'

const registro = async (req, res) => {
  const { email, nombre } = req.body

  // Prevenir usuario duplicado

  const existeEmail = await Usuario.findOne({ email })

  if (existeEmail) {
    const error = new Error('Email ya registrado')
    return res.status(400).json({ msg: error.message })
  }
  try {
    // Crear nuevo usuario
    const usuario = new Usuario(req.body)
    const usuarioCreado = await usuario.save()

    // Enviar el email
    emailVerificar({
      email,
      nombre,
      token: usuarioCreado.token
    })

    res.json(`Usuario creado correctamente: ${usuarioCreado}`)
  } catch (error) {
    console.log(error)
  }
}

const perfil = (req, res) => {
  const { usuario } = req

  res.json(usuario)
}

const confirmar = async (req, res) => {
  const { token } = req.params

  const confirmarUsuario = await Usuario.findOne({ token })

  if (!confirmarUsuario) {
    const error = new Error('Token de usuario no válido')
    return res.status(404).json({ msg: error.message })
  }
  try {
    confirmarUsuario.token = null
    confirmarUsuario.confirmado = true
    await confirmarUsuario.save()

    res.json({ msg: 'Usuario confirmado correctamente' })
  } catch (error) {
    console.log(error)
  }
}

const login = async (req, res) => {
  const { email, password } = req.body

  const usuario = await Usuario.findOne({ email })

  if (!usuario) {
    const error = new Error('El usuario no existe')
    return res.status(404).json({ msg: error.message })
  }

  // Comprobar un usuario esta confirmado
  if (!usuario.confirmado) {
    const error = new Error('Tu cuenta no ha sido confirmada')
    return res.status(403).json({ msg: error.message })
  }

  // Revisar password
  if (await usuario.comprobarPassword(password)) {
    res.json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      token: generarJWT(usuario.id)
    })
  } else {
    const error = new Error('Contraseña incorrecta')
    return res.status(403).json({ msg: error.message })
  }
}

const passwordOlvidada = async (req, res) => {
  const { email } = req.body

  const existeEmail = await Usuario.findOne({ email })

  if (!existeEmail) {
    const error = new Error('El email no existe')
    return res.status(400).json({ msg: error.message })
  }
  try {
    existeEmail.token = generarId()
    await existeEmail.save()
    // Enviar email para reestablecer contraseña
    emailPasswordOlvidada({
      email,
      nombre: existeEmail.nombre,
      token: existeEmail.token
    })
    res.json({ msg: 'Email enviado correctamente' })
  } catch (error) {
    console.log(error)
  }
}
const comprobarToken = async (req, res) => {
  const { token } = req.params
  const tokenValido = await Usuario.findOne({ token })
  if (tokenValido) {
    // Token válido para el cambio de contraseña
    res.json({ msg: 'Token valido y el usuario existe' })
  } else {
    const error = new Error('Token no válido')
    return res.status(400).json({ msg: error.message })
  }
}
const nuevaPassword = async (req, res) => {
  const { token } = req.params
  const { password } = req.body

  const usuario = await Usuario.findOne({ token })

  if (!usuario) {
    const error = new Error('Hubo un error')
    return res.status(400).json({ msg: error.message })
  }

  try {
    usuario.token = null
    usuario.password = password
    await usuario.save()
    res.json({ msg: 'Contraseña modificado correctamente' })
  } catch (error) {
    console.log(error)
  }
}
const actualizarPerfil = async (req, res) => {
  const usuario = await Usuario.findById(req.params.id)
  if (!usuario) {
    const error = new Error('Hubo un error')

    return res.status(400).json({ msg: error.message })
  }
  const { email } = req.body
  if (usuario.email !== req.body.email) {
    const existeEmail = await Usuario.findOne({ email })
    if (existeEmail) {
      const error = new Error('El email ya esta en uso')
      return res.status(400).json({ msg: error.message })
    }
  }
  try {
    usuario.nombre = req.body.nombre
    usuario.email = req.body.email
    usuario.telefono = req.body.telefono

    const usuarioActualizado = await usuario.save()
    res.json(usuarioActualizado)
  } catch (error) {
    console.log(error)
  }
}
const actualizarPassword = async (req, res) => {
  // Leer datos
  const { id } = req.usuario
  const { passwordActual, passwordNuevo } = req.body
  // Comprobar que el usuario existe
  const usuario = await Usuario.findById(id)
  if (!usuario) {
    const error = new Error('Hubo un error')

    return res.status(400).json({ msg: error.message })
  }
  // Comprobar su contraseña actual

  if (await usuario.comprobarPassword(passwordActual)) {
  // Guardar la nueva contraseña
    usuario.password = passwordNuevo
    await usuario.save()
    res.json({ msg: 'Contraseña modificado correctamente' })
  } else {
    const error = new Error('La contraseña actual es incorrecta')
    return res.status(400).json({ msg: error.message })
  }
}

export {
  registro,
  perfil,
  confirmar,
  login,
  passwordOlvidada,
  comprobarToken,
  nuevaPassword,
  actualizarPerfil,
  actualizarPassword
}
