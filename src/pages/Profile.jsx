import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Client from '../services/api'

const Profile = () => {
  const { id } = useParams()
  const [user, setUser] = useState({})
  let navigate = useNavigate
  useEffect(() => {
    const getUser = async () => {
      const response = await Client.get(`/users/${id}`)
      setUser(response.data)
    }
    getUser()
  }, [])
  const edit = () => {
    navigate(`/user/${id}/edit`)
  }
  return (
    <div>
      <h1>Profile</h1>
      <button
        type="button"
        className="rounded-lg bg-white px-3 py-2 text-sm font-medium text-gray-900 dark:text-white shadow-sm dark:hover:bg-white/20 flex items-center hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white gap-1"
        onClick={() => {
          edit()
        }}
      >
        Edit
      </button>
    </div>
  )
}

export default Profile
