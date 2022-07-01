import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/axios'

const ConfirmarCuenta = () => {
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false)
  const [cargando, setCargando] = useState(true)
  const [alerta, setAlerta] = useState('')
  const params = useParams()
  const { id } = params

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/usuarios/confirmar/${id}`
        const { data } = await clienteAxios(url)
        setCuentaConfirmada(true)
        console.log(data)
        setAlerta({
          mensaje: data.msg
        })
      } catch (error) {
        setAlerta({
          mensaje: error.response.data.msg,
          error: true
        })
      }
      setCargando(false)
    }
    confirmarCuenta()
  }, [])
  return (
    <>
      <div>
        <h1 className='text-indigo-600 font-black text-6xl'>Confirma tu Cuenta y Administra <span className='text-black'>tus Libros</span></h1>
      </div>

      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>

        {!cargando &&
          <Alerta alerta={alerta} />}
        {cuentaConfirmada && (
          <Link className='block text-center my-5 text-gray-500' to='/'><span className='text-black font-bold'>Iniciar Sesión</span></Link>
        )}
      </div>

    </>
  )
}

export default ConfirmarCuenta
