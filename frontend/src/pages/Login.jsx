import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <>
      <div>
        <h1 className='text-indigo-600 font-black text-6xl'>Inicia Sesión y Registra tus <span className='text-black'>Libros</span></h1>
      </div>
      <div className='mt-20'>
        <form>
          <div className='my-5'>
            <label className='uppercase text-gray-600 block text-xl font-bold'>
              Email
            </label>
            <input
              type='email'
              placeholder='Email de Registro'
              className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
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
            />
          </div>
          <input
            type='submit'
            value='Iniciar Sesión'
            className='bg-indigo-700 w-full py-3 px-10 font-bold rounded-xl text-white uppercase mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto'
          />
        </form>

        <nav className='mt-10 lg:justify-between'>
          <Link className='block text-center my-5 text-gray-500' to='/registrar'>¿No tienes cuenta? Regístrate</Link>
          <Link className='block text-center my-5 text-gray-500' to='/password-olvidada'>¿Has olvidado la contraseña?</Link>
        </nav>
      </div>
    </>
  )
}

export default Login
