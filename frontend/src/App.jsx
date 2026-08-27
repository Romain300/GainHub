import './App.css'
import HomePage from './components/HomePage'
import SignIn from './components/SignIn'
import { Routes, Route } from 'react-router-dom'
import AuthProvider from './components/AuthProvider'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import About from './components/About'
import NewWorkout from './components/NewWorkout'

function App() {
 
  return (
    <AuthProvider>
       <div className="main-container">
        <NavBar />
        <main className="content">
          <Routes>
            <Route path='/' element={ <HomePage/> }/>
            <Route path='/signIn' element={ <SignIn/> }/>
            <Route path='/about' element={ <About/> }/>
            <Route path='/newworkout' element= { <NewWorkout/> }/>
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  )
};

export default App;
