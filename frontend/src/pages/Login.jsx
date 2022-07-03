import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/axios'
import useAuth from '../hooks/useAuth'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alerta, setAlerta] = useState('')
  const {setAuth} = useAuth()
  const navigate = useNavigate()
  
  const handleSubmit = async (e) => {
    e.preventDefault()

    if ([email, password].includes('')) {
      setAlerta({
        mensaje: 'Todos los campos son obligatorios',
        error: true
      })
      return
    }
    try {
      const url = '/usuarios/login'
      const { data } = await clienteAxios.post(url, { email, password })

      localStorage.setItem('token', data.token)
      setAuth(data)
      navigate('/admin')

    } catch (error) {
      setAlerta({
        mensaje: error.response.data.msg,
        error: true
      })
    }
  }

  const { mensaje } = alerta
  return (
    <>
      <div>
        <h1 className='text-indigo-600 font-black text-6xl'>Inicia Sesión y Registra tus <span className='text-black'>Libros</span></h1>
      </div>
      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        {mensaje && <Alerta
          alerta={alerta}
                    />}
        <form onSubmit={handleSubmit}>
          <div className='my-5'>
            <label className='uppercase text-gray-600 block text-xl font-bold'>
              Email
            </label>
            <input
              type='email'
              placeholder='Email de Registro'
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
          <input
            type='submit'
            value='Iniciar Sesión'
            className='bg-indigo-700 w-full py-3 px-10 font-bold rounded-xl text-white uppercase mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto'
          />
        </form>

        <nav className='mt-10 lg:flex lg:justify-between'>
          <Link className='block text-center my-5 text-gray-500' to='/registrar'>¿No tienes cuenta? <span className='text-black font-bold'>Regístrate</span></Link>
          <Link className='block text-center my-5 text-gray-500' to='/password-olvidada'>¿Has olvidado la contraseña?</Link>
        </nav>
      </div>
    </>
  )
}

export default Login
