import { useEffect, useState } from 'react'
import Client from '../services/api'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'

const Invites = ({ user, setOpen }) => {
  const [invites, setInvites] = useState([])
  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    const getInvites = async () => {
      const response = await Client.get(`/invites/user/${user?.id}`)
      setInvites(response.data)
    }
    getInvites()
    setClicked(false)
  }, [clicked])

  const accept = async (id) => {
    await Client.put(`/invites/${id}`, { status: true })
    setClicked(true)
    setOpen(false)
  }

  const decline = async (id) => {
    await Client.put(`/invites/${id}`, { status: false })
    setClicked(true)
    setOpen(false)
  }

  return invites.length ? (
    <div>
      {invites?.map((invite) => (
        <div
          key={invite._id}
          className="flex flex-row justify-between items-center mt-2"
        >
          <h2>
            <strong>{invite.sender.name}</strong> has invited you to join{' '}
            <strong>{invite.team.name}</strong>
          </h2>
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              onClick={() => {
                accept(invite._id)
              }}
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white flex items-center gap-1"
            >
              <CheckCircleIcon className="w-5 h-5" />
              Accept
            </button>
            <button
              onClick={() => {
                decline(invite._id)
              }}
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white flex items-center gap-1"
            >
              <XCircleIcon className="w-5 h-5" />
              Decline
            </button>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div> No Invites Found</div>
  )
}

export default Invites
