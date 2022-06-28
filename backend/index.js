// Forma nueva y igual al require
import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import UsuarioRoutes from './routes/UsuarioRoutes.js'
import LibroRoutes from './routes/LibroRoutes.js'

// Doten leer variables de entorno, utilizar variables de entorno para no mostra información sensible como bbdd
const app = express()
// No hace falta el bodyparse, ya viene en node actual
app.use(express.json())
dotenv.config()
connectDB()

console.log(process.env.DB_URL)
// req lo que envias y res lo recibes

app.use('/api/v1/usuarios', UsuarioRoutes)
app.use('/api/v1/libros', LibroRoutes)

const PORT = process.env.PORT || 4000

// create-react-app crea normalmente en el puerto 3000
app.listen(PORT, () => {
  console.log(`Servidor funcionanado en el puerto ${PORT}`)
})
