import { Link } from 'react-router-dom'
import { useState } from 'react'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/axios'

const Registrar = () => {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repetirPassoword, setRepetirPassword] = useState('')
  const [alerta, setAlerta] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()

    if ([nombre, email, password, repetirPassoword].includes('')) {
      setAlerta({ mensaje: ' Hay campos vacios', error: true })
      return
    }
    if (password !== repetirPassoword) {
      setAlerta({ mensaje: ' La contraseña no coincide', error: true })
    }
    if (password.length < 6) {
      setAlerta({ mensaje: ' Contraseña muy corta,  mínimo 6 caracteres', error: true })
    }
    setAlerta({})
    // Crear usuario en API

    try {
      const url = '/usuarios/registro'
      const respuesta = await clienteAxios.post(url, { nombre, email, password, repetirPassoword })
      console.log(respuesta)
      setAlerta({
        mensaje: 'Cuenta creada correctamente, verifica tu email',
        error: false
      })
      console.log(respuesta)
    } catch (error) {
      setAlerta({
        mensaje: error.response.data.msg,
        error: true
      })
      console.log(error.response)
    }
  }
  const { mensaje } = alerta
  return (
    <>
      <div>
        <h1 className='text-indigo-600 font-black text-6xl'>Crea tu Cuenta y Administra <span className='text-black'>tus Libros</span></h1>
      </div>
      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        {mensaje && <Alerta
          alerta={alerta}
                    />}

        <form onSubmit={handleSubmit}>
          <div className='my-5'>
            <label className='uppercase text-gray-600 block text-xl font-bold'>
              Nombre
            </label>
            <input
              type='text'
              placeholder='Nombre'
              className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
              value={nombre}
              onChange={e => setNombre(e.target.value)}
            />
          </div>
          <div className='my-5'>
            <label className='uppercase text-gray-600 block text-xl font-bold'>
              Email
            </label>
            <input
              type='email'
              placeholder='Email'
              className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className='my-5'>
            <label className='uppercase text-gray-600 block text-xl font-bold'>
              Contraseña
            </label>
            <input
              type='password'
              placeholder='Contraseña'
              className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className='my-5'>
            <label className='uppercase text-gray-600 block text-xl font-bold'>
              Repite la contraseña
            </label>
            <input
              type='password'
              placeholder='Repite la contraseña'
              className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
              value={repetirPassoword}
              onChange={e => setRepetirPassword(e.target.value)}
            />
          </div>
          <input
            type='submit'
            value='Crear Cuenta'
            className='bg-indigo-700 w-full py-3 px-10 font-bold rounded-xl text-white uppercase mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto'
          />
        </form>
        <nav className='mt-10 lg:flex lg:justify-between'>
          <Link className='block text-center my-5 text-gray-500' to='/'>¿Ya tienes una cuenta? <span className='text-black font-bold'>Inicia Sesión</span></Link>
          <Link className='block text-center my-5 text-gray-500' to='/password-olvidada'>¿Has olvidado la contraseña?</Link>
        </nav>
      </div>
    </>
  )
}

export default Registrar
