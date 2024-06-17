
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Signup } from './components/pages/Signup'
import { Login } from './components/pages/Login'
import { Dashboard } from './components/pages/Dashboard'
import { Trains } from './components/pages/Trains'
import Landing from './components/pages/Landing'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={ <Signup /> }/>
        <Route path='/login' element={ <Login /> }/>
        <Route path='/dashboard' element={ <Dashboard />  }/>
        <Route path='/' element={<Landing />  }/>
        <Route path='/trains' element={ <Trains />  }/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
