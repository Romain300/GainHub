import './App.css'
import LogForm from './components/LogForm'
import SignIn from './components/SignIn'
import { Routes, Route } from 'react-router-dom'

function App() {
 

  return (
    <div>
        <Routes>
          <Route path='/' element={ <LogForm/> }/>
          <Route path='/signIn' element={ <SignIn/> }/>
        </Routes>
    </div>
  )
}

export default App
