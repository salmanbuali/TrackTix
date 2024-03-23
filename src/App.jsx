import { Routes, Route } from 'react-router-dom'
import { CheckSession } from './services/Auth'
import Register from './pages/Register'
import Login from './pages/Login'
import Teams from './pages/Teams'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import CreateTeam from './pages/CreateTeam'
import ViewTeam from './pages/ViewTeam'
import Invites from './components/Invites'
import CreateTicket from './pages/CreateTicket'


function App() {
  const [user, setUser] = useState(null)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const checkTokenFunction = async () => {
        await checkToken()
      }
      checkTokenFunction()
    }
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const checkToken = async () => {
    const user = await CheckSession()
    setUser(user)
  }

  const handleLogOut = () => {
    setUser(null)
    localStorage.clear()
  }
  return (
    <div className={`${darkMode && 'dark'}`}>
      <Navbar
        toggleDarkMode={toggleDarkMode}
        user={user}
        handleLogOut={handleLogOut}
      />
      <main className="dark:bg-gray-900 bg-neutral-100 h-screen pt-4">
        <Routes>
          <Route path="/register" element={<Register />}></Route>
          <Route
            path="/createteam"
            element={<CreateTeam user={user} />}
          ></Route>
          <Route path="/login" element={<Login setUser={setUser} />}></Route>
          <Route path="/teams" element={<Teams user={user} />}></Route>
          <Route path="/teams/:id" element={<ViewTeam user={user} />}></Route>
          <Route
            path="/teams/:id/createticket/"
            element={<CreateTicket user={user} />}
          ></Route>
        </Routes>
      </main>
    </div>
  )
}

export default App
