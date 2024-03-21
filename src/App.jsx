import { Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Navbar from './components/Navbar'
import CreateTeam from './pages/CreateTeam'
function App() {
  return (
    <div>
      <Navbar />
      <main className="dark:bg-gray-900   bg-neutral-100 h-screen">
        <Routes>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/createteam" element={<CreateTeam />}></Route>
        </Routes>
      </main>
    </div>
  )
}

export default App
