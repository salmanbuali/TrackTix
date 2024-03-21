import { Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import { useState } from 'react'
import Navbar from './components/Navbar'
import CreateTeam from './pages/CreateTeam'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }
  return (
    <div className={`${darkMode && 'dark'}`}>
      <Navbar toggleDarkMode={toggleDarkMode} />
      <main className="dark:bg-gray-900   bg-neutral-100 h-screen pt-4">
        <Routes>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/createteam" element={<CreateTeam />}></Route>
        </Routes>
      </main>
    </div>
  )
}

export default App
