import Client from '../services/api'
import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import InviteMember from '../components/InviteMember'
import Members from '../components/Members'
import Tickets from '../components/Tickets'
import {
  UserPlusIcon,
  UserGroupIcon,
  CodeBracketSquareIcon
} from '@heroicons/react/24/solid'

const ViewTeam = ({ user }) => {
  let { id } = useParams()
  const [team, setTeam] = useState({})
  const [viewMembers, setViewMembers] = useState(false)
  const [open, setOpen] = useState(false)
  const cancelButtonRef = useRef(null)
  const [manager, setManager] = useState(false)

  useEffect(() => {
    const getTeam = async () => {
      const response = await Client.get(`/teams/${id}`)
      setTeam(response.data)
      if (response.data.manager._id === user?.id) {
        setManager(true)
      }
    }
    getTeam()
  }, [])
  const toggleView = (view) => {
    if (view === 'm') {
      setViewMembers(true)
    } else {
      setViewMembers(false)
    }
  }

  return (
    <div className="flex justify-center items-center flex-col">
      <h1 className="text-gray-900 dark:text-white"> {team.name}</h1>
      <Link to={`/teams/${team._id}/createticket/`}>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Create Ticket
        </button>
      </Link>

      <InviteMember
        userId={user?.id}
        teamId={id}
        members={team?.members}
        open={open}
        setOpen={setOpen}
        cancelButtonRef={cancelButtonRef}
      />

      <div
        className="inline-flex rounded-md justify-between w-2/3"
        role="group"
      >
        <button
          type="button"
          className="rounded-lg bg-white px-3 py-2 text-sm font-medium text-gray-900 dark:text-white shadow-sm dark:hover:bg-white/20 flex items-center hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white gap-1"
          onClick={() => {
            setOpen(true)
          }}
        >
          <UserPlusIcon className="w-5 h-5" />
          Invite Member
        </button>

        <button
          onClick={() => {
            toggleView('m')
          }}
          type="button"
          className="rounded-lg bg-white px-3 py-2 text-sm font-medium text-gray-900 dark:text-white shadow-sm dark:hover:bg-white/20 flex items-center hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white gap-1"
        >
          <UserGroupIcon className="w-5 h-5" />
          Members
        </button>
        <button
          onClick={() => {
            toggleView('t')
          }}
          type="button"
          className="rounded-lg bg-white px-3 py-2 text-sm font-medium text-gray-900 dark:text-white shadow-sm dark:hover:bg-white/20 flex items-center hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white gap-1"
        >
          <CodeBracketSquareIcon className="w-6 h-6" />
          Tickets
        </button>
      </div>

      {viewMembers && <Members members={team?.members} teamId={id} />}
      {!viewMembers && <Tickets teamId={id} user={user} />}
    </div>
  )
}
export default ViewTeam
