import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthLayout from './layout/AuthLayout'
import RutaProtegida from './layout/RutaProtegida'

import ConfirmarCuenta from './pages/ConfirmarCuenta'
import Login from './pages/Login'
import PasswordNueva from './pages/PasswordNueva'
import PasswordOlvidada from './pages/PasswordOlvidada'
import Registrar from './pages/Registrar'
import AdministrarLibros from './pages/AdministrarLibros'


import { AuthProvider } from './context/AuthProvider'

function App () {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path='registrar' element={<Registrar />} />
            <Route path='password-olvidada' element={<PasswordOlvidada />} />
            <Route path='password-olvidada/:token' element={<PasswordNueva />} />
            <Route path='confirmar/:id' element={<ConfirmarCuenta />} />
          </Route>
          <Route path='/admin' element={<RutaProtegida/>}>
            <Route index element={<AdministrarLibros/>}/>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
