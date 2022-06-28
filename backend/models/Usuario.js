import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import generarId from '../helpers/generarID.js'

const usuarioSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  telefono: {
    type: String,
    default: null,
    trim: true
  },
  token: {
    type: String,
    default: generarId()
  },
  confirmado: {
    type: Boolean,
    default: false
  }
})

usuarioSchema.pre('save', async function (next) {
  // Encriptar password, y en caso de estar hash no volver a hash
  if (!this.isModified('password')) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

// Metodos que solo se ejecuten en este schema
usuarioSchema.methods.comprobarPassword = async function (passwordFormulario) {
  return await bcrypt.compare(passwordFormulario, this.password)
}
const Usuario = mongoose.model('Usuario', usuarioSchema)

export default Usuario
