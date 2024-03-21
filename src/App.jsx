import { Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import { useState } from 'react'
import Navbar from './components/Navbar'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }
  return (
    <div className={`${darkMode && "dark"}`}>
      <Navbar toggleDarkMode={toggleDarkMode} />
        <Routes>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
    </div>
  )
}

export default App
