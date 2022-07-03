import React from 'react'
import Formulario from '../components/Formulario'
import ListaLibros from '../components/ListaLibros'

const AdministrarLibros = () => {
  return (
    <div className='flex flex-col md:flex-row'>
        <div className='md:w-1/2 lg:w-2/5'>
            <Formulario/>
        </div>
        <div className='md:w-1/2 lg:w-3/5'>
            <ListaLibros/>
        </div>
    </div>
  )
}

export default AdministrarLibros