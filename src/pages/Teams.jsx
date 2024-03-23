import Client from '../services/api'
import { Link } from 'react-router-dom'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import Invites from '../components/Invites'
import { useState, useEffect } from 'react'

const Teams = ({ user }) => {
  const [teams, setTeams] = useState([])
  useEffect(() => {
    const getTeams = async () => {
      const response = await Client.get(`/users/${user?.id}/teams`)
      setTeams(response.data)
    }
    getTeams()
  }, [])

  return teams.length ? (
    <div className="w-3/4 m-auto">
      <Invites user={user} />
      <div className="flex justify-between items-center mt-8">
        <h2 className="text-sm font-medium text-gray-500 dark:text-white">
          Teams
        </h2>
        <Link to="/createteam">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 mt-3 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex items-center"
          >
            <PlusCircleIcon className="w-6 h-6 mr-2" />
            Team
          </button>
        </Link>
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
      <div className="flex w-2/3">
        <Link to="/createteam">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 mt-3 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex items-center"
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
