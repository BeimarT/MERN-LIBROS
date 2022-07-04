import Libro from '../models/Libro.js'

const agregarLibro = async (req, res) => {
  const libro = new Libro(req.body)
  libro.usuario = req.usuario._id
  try {
    const libroGuardado = await libro.save()
    res.json(libroGuardado)
  } catch (error) {
    console.log(error)
  }
}

const obtenerLibros = async (req, res) => {
  const libros = await Libro.find().where('usuario').equals(req.usuario)

  res.json(libros)
}
const obtenerLibro = async (req, res) => {
  const { id } = req.params

  const libro = await Libro.findById(id)
  if (!libro) {
    return res.status(404).json({ msg: 'No encontrado' })
  }

  if (libro.usuario._id.toString() !== req.usuario._id.toString()) {
    return res.json({ msg: 'Acción no permitida' })
  }

  res.json(libro)
}
const actualizarLibro = async (req, res) => {
  const { id } = req.params

  const libro = await Libro.findById(id)

  if (!libro) {
    return res.status(404).json({ msg: 'No encontrado' })
  }

  if (libro.usuario._id.toString() !== req.usuario._id.toString()) {
    return res.json({ msg: 'Acción no permitida' })
  }

  // Actualizar libro

  libro.titulo = req.body.titulo || libro.titulo
  libro.autor = req.body.autor || libro.autor
  libro.genero = req.body.genero || libro.genero
  libro.idioma = req.body.idioma || libro.idioma
  libro.paginas = req.body.paginas || libro.paginas

  try {
    const libroActualizado = await libro.save()

    res.json(libroActualizado)
  } catch (error) {
    console.log(error)
  }
}
const eliminarLibro = async (req, res) => {
  const { id } = req.params

  const libro = await Libro.findById(id)
  if (!libro) {
    return res.status(404).json({ msg: 'No encontrado' })
  }

  if (libro.usuario._id.toString() !== req.usuario._id.toString()) {
    return res.json({ msg: 'Acción no permitida' })
  }

  try {
    await libro.deleteOne()
    res.json({ msg: 'Libro eliminado correctamente' })
  } catch (error) {
    console.log(error)
  }
}
export {
  agregarLibro,
  obtenerLibros,
  obtenerLibro,
  actualizarLibro,
  eliminarLibro
}
