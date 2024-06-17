
import { BrowserRouter, Route, Routes,  } from 'react-router-dom'
import './App.css'
import { Signup } from './components/pages/Signup'
import { Login } from './components/pages/Login'
import { Dashboard } from './components/pages/Dashboard'
import { Book } from './components/pages/Book'
import Landing from './components/pages/Landing'
import { Navbar } from './components/ui/Navbar'
import { Metro} from './components/pages/Metro'

function App() {
  return (
    <>
    <Navbar />
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={ <Signup /> }/>
        <Route path='/login' element={ <Login /> }/>
        <Route path='/dashboard' element={ <Dashboard />  }/>
        <Route path='/' element={<Landing />  }/>
        <Route path='/trains' element={ <Book />  }/>
        <Route path='/metro/:id' element={ <Metro />  }/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
