import Client from '../services/api'
import { Link } from 'react-router-dom'
import { PlusCircleIcon, InboxArrowDownIcon } from '@heroicons/react/24/outline'
import { useState, useEffect, useRef } from 'react'
import InvitesDialog from '../components/InvitesDialog'

const Teams = ({ user }) => {
  const [teams, setTeams] = useState([])
  const [open, setOpen] = useState(false)
  const cancelButtonRef = useRef(null)
  const [checkInv, setCheckInv] = useState(false)

  useEffect(() => {
    const getTeams = async () => {
      const response = await Client.get(`/users/${user?.id}/teams`)
      setTeams(response.data)
    }
    getTeams()
  }, [checkInv])

  return teams.length ? (
    <div className="w-3/4 m-auto">
      <InvitesDialog
        open={open}
        setOpen={setOpen}
        cancelButtonRef={cancelButtonRef}
        user={user}
      />
      <div className="flex justify-between items-center mt-8">
        <h2 className="text-sm font-medium text-gray-500 dark:text-white">
          Teams
        </h2>
        <div className="flex gap-1">
          <button
            type="button"
            className="rounded-lg bg-white px-3 py-2 text-sm font-medium text-gray-900 dark:text-white shadow-sm dark:hover:bg-white/20 flex items-center hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white gap-1"
            onClick={() => {
              setOpen(true)
            }}
          >
            <InboxArrowDownIcon className="w-6 h-6 mr-2" />
            Invites
          </button>
          <Link to="/createteam">
            <button
              type="submit"
              className="rounded-lg bg-white px-3 py-2 text-sm font-medium text-gray-900 dark:text-white shadow-sm dark:hover:bg-white/20 flex items-center hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white gap-1"
            >
              <PlusCircleIcon className="w-6 h-6 mr-2" />
              Team
            </button>
          </Link>
        </div>
      </div>

      <ul
        role="list"
        className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4"
      >
        {teams.map((team) => (
          <Link to={`/teams/${team._id}`} key={team.name}>
            <li className="col-span-1 flex rounded-md overflow-hidden">
              <div className="flex items-center justify-center text-white bg-white dark:bg-gray-800 w-16 h-16">
                <img
                  src={team.avatar}
                  alt="team logo"
                  className="w-full h-auto my-1"
                />
              </div>
              <div className="flex flex-1 items-center justify-between truncate rounded-r-md bg-white dark:bg-gray-800">
                <div className="flex-1 truncate px-4 py-2 text-sm">
                  <a
                    href={team.href}
                    className="font-medium text-gray-900 hover:text-gray-600 dark:text-white"
                  >
                    {team.name}
                  </a>
                  <p className="text-gray-500 dark:text-gray-300">
                    {team.members.length} Members
                  </p>
                </div>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  ) : (
    <div className="flex justify-center flex-col items-center">
      <InvitesDialog
        open={open}
        setOpen={setOpen}
        cancelButtonRef={cancelButtonRef}
        user={user}
      />
      <div className="flex w-2/3">
        <button
          type="button"
          className="rounded-lg bg-white px-3 py-2 text-sm font-medium text-gray-900 dark:text-white shadow-sm dark:hover:bg-white/20 flex items-center hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white gap-1"
          onClick={() => {
            setOpen(true)
            setCheckInv(prev => !prev)
          }}
        >
          <InboxArrowDownIcon className="w-6 h-6 mr-2" />
          Invites
        </button>
        <Link to="/createteam">
          <button
            type="submit"
            className="rounded-lg bg-white px-3 py-2 text-sm font-medium text-gray-900 dark:text-white shadow-sm dark:hover:bg-white/20 flex items-center hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white gap-1"
          >
            <PlusCircleIcon className="w-6 h-6 mr-2" />
            Team
          </button>
        </Link>
      </div>
      <img src="/NoTeams.svg" alt="" className="dark:invert w-1/5 h-1/5" />
      <p className="dark:text-white text-xl">
        You are not in a part of any team, Join or create one to get started !
      </p>
    </div>
  )
}

export default Teams
