import mongoose from 'mongoose'

const libroSchema = mongoose.Schema(
  {
    titulo: {
      type: String,
      required: true
    },
    autor: {
      type: String,
      required: true
    },
    genero: {
      type: String,
      required: true
    },
    idioma: {
      type: String,
      required: true
    },
    paginas: {
      type: Number,
      required: true
    },
    fecha_inicio: {
      type: Date,
      required: true,
      default: Date.now()
    },
    fecha_finalizado: {
      type: Date
    },
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario'
    }
  },
  {
    timestamps: true
  }
)

const Libro = mongoose.model('Libro', libroSchema)

export default Libro
