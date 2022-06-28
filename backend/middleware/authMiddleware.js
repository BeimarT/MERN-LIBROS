import jwt from 'jsonwebtoken'
import Usuario from '../models/Usuario.js'

const checkAuth = async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      req.usuario = await Usuario.findById(decoded.id).select('-password -token -confirmado')
      console.log(req.usuario)
      return next()
    } catch (err) {
      console.log(err)
      const error = new Error('Token no válido o no existe')
      res.status(403).json({ msg: error.message })
    }
  }

  if (!token) {
    const error = new Error('Token no válido o no existe')
    res.status(403).json({ msg: error.message })
  }

  next()
}

export default checkAuth
