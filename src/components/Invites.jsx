import { useEffect, useState } from 'react'
import Client from '../services/api'

const Invites = ({ user }) => {
  const [invites, setInvites] = useState([])

  useEffect(() => {
    const getInvites = async () => {
      console.log(user?.id)
      const response = await Client.get(`/invites/user/${user?.id}`)
      setInvites(response.data)
      console.log(response)
    }
    getInvites()
  }, [])

  const accept = async (id) => {
    await Client.put(`/invites/${id}`, { status: true })
  }

  const decline = async (id) => {
    await Client.put(`/invites/${id}`, { status: false })
  }

  return invites ? (
    <div>
      <h1>Invites</h1>
      {invites?.map((invite) => (
        <div>
          <h2>
            from {invite.sender.name} to join {invite.team.name}
          </h2>
          <div class="inline-flex rounded-md shadow-sm" role="group">
            <button
              onClick={() => {
                accept(invite._id)
              }}
              type="button"
              class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
            >
              Accept
            </button>
            <button
              onClick={() => {
                decline(invite._id)
              }}
              type="button"
              class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
            >
              Decline
            </button>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <></>
  )
}

export default Invites
