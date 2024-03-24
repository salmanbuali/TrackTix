import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Client from '../services/api'
import { UserCircleIcon, PencilSquareIcon } from '@heroicons/react/20/solid'

const Profile = () => {
  const { id } = useParams()
  const [user, setUser] = useState({})
  let navigate = useNavigate()
  useEffect(() => {
    const getUser = async () => {
      const response = await Client.get(`/users/${id}`)
      setUser(response.data)
    }
    getUser()
  }, [])
  const edit = () => {
    navigate(`/profile/${id}/edit`)
  }
  return (
    <div>
      <div className="w-2/3 m-auto">
        <div className="px-4 sm:px-0">
          <h3 className="text-base font-semibold leading-7 flex justify-between text-gray-800 dark:text-white">
            Profile
            <button
              type="button"
              className="rounded-lg bg-white px-3 py-2 text-sm font-medium text-gray-900 dark:text-white shadow-sm dark:hover:bg-white/20 flex items-center hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white gap-1"
              onClick={() => {
                edit()
              }}
            >
              <PencilSquareIcon className="w-5 h-5" />
              Edit
            </button>
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-800 dark:text-gray-300">
            Your Personal details
          </p>
        </div>
        <div className="mt-6 border-t border-white/20">
          <dl className="divide-y divide-blue-950 dark:divide-white/20">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-800 dark:text-white">
                Full name
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-800 dark:text-gray-400 sm:col-span-2 sm:mt-0">
                {user.name}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-800 dark:text-white">
                Email address
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-800 dark:text-gray-400 sm:col-span-2 sm:mt-0">
                {user.email}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-800 dark:text-white">
                Phone
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-800 dark:text-gray-400 sm:col-span-2 sm:mt-0">
                {user.phone}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-800 dark:text-white">
                Teams
              </dt>

              <span className="mt-1 text-sm leading-6 text-gray-800 dark:text-gray-400 sm:col-span-2 sm:mt-0">
                {user?.teams?.map((team, i) => (
                  <span key={i}>
                    <span>{team.name}</span>
                    {i !== user.teams.length - 1 && ' - '}
                  </span>
                ))}
              </span>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-800 dark:text-white flex items-center">
                Avatar
              </dt>
              <dd className="mt-2 text-sm text-white sm:col-span-2 sm:mt-0">
                <ul
                  role="list"
                  className="divide-y divide-blue-950 dark:divide-white/20 rounded-md border border-blue-950 dark:border-white/20"
                >
                  <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                    <div className="flex w-0 flex-1 items-center">
                      <UserCircleIcon
                        className="h-5 w-5 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                      <div className="ml-4 flex min-w-0 flex-1 gap-2">
                        <span className="truncate font-medium text-gray-800 dark:text-white">
                          {user.avatar}
                        </span>
                      </div>
                    </div>
                  </li>
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}

export default Profile
