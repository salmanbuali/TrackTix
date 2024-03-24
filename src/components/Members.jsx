import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { Fragment, useEffect, useState } from 'react'
import Client from '../services/api'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Members = ({ members, teamId, manager }) => {
  const [update, setUpdate] = useState(false)
  useEffect(() => {
    return
  }, [update])

  const removeRoles = async (id) => {
    await Client.put(`/teams/${teamId}/removeroles`, { member: id })
    setUpdate(true)
  }

  const removeMember = async (id) => {
    await Client.put(`/teams/${teamId}/removemember/${id}`)
    setUpdate(true)
  }
  return (
    <ul
      role="list"
      className="divide-y dark:divide-gray-700 divide-gray-300 w-full m-auto"
    >
      {members?.map((member) => (
        <li key={member.email} className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            <img
              className="h-12 w-12 flex-none rounded-full bg-gray-50 dark:bg-gray-800"
              src={member.avatar}
              alt=""
            />
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 dark:text-white text-gray-900">
                {member.name}
              </p>
              <p className="mt-1 truncate text-xs leading-5 dark:text-gray-400 text-gray-500">
                {member.email}
              </p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 dark:text-white text-gray-900">
              {member.roles.map((role) => role.team === teamId && role.name)}
            </p>
          </div>
          {manager && (
            <Menu as="div" className="relative flex-none">
              <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                <span className="sr-only">Open options</span>
                <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        onClick={() => {
                          addRole(ticket._id)
                        }}
                        className={classNames(
                          active ? 'bg-gray-50' : '',
                          'block px-3 py-1 text-sm leading-6 text-gray-900'
                        )}
                      >
                        Add role
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        onClick={() => {
                          removeRoles(member._id)
                        }}
                        className={classNames(
                          active ? 'bg-gray-50' : '',
                          'block px-3 py-1 text-sm leading-6 text-gray-900'
                        )}
                      >
                        Remove roles
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        onClick={() => {
                          removeMember(member._id)
                        }}
                        className={classNames(
                          active ? 'bg-gray-50' : '',
                          'block px-3 py-1 text-sm leading-6 text-gray-900'
                        )}
                      >
                        Remove Member
                      </a>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          )}
        </li>
      ))}
    </ul>
  )
}

export default Members
