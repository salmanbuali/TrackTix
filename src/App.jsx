import { Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Navbar from './components/Navbar'
function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/Register" element={<Register />}></Route>
      </Routes>
    </div>
  )
}

export default App
