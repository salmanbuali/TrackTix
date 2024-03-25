import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { Fragment, useEffect, useState, useRef } from 'react'
import Client from '../services/api'
import AddRole from './AddRole'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Members = ({ members, teamId, manager, setRoleAdded }) => {
  const [update, setUpdate] = useState(false)
  const [open, setOpen] = useState(false)
  const cancelButtonRef = useRef(null)
  const addrolememberId = useRef(null)

  useEffect(() => {
    return
  }, [update])

  const removeRoles = async (id) => {
    const res = await Client.delete(`/teams/${teamId}/removeroles`, {
      member: id
    })
    console.log(res)
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
      <AddRole
        open={open}
        setOpen={setOpen}
        cancelButtonRef={cancelButtonRef}
        setUpdate={setUpdate}
        member={addrolememberId.current}
        teamId={teamId}
        setRoleAdded={setRoleAdded}
      />
      {members?.map((member) => (
        <>
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
            <div className="shrink-0 sm:items-end flex mb-5">
              <p className="text-sm leading-6 dark:text-white text-gray-900">
                {member.roles?.map(
                  (role) => role.team._id === teamId && <span> {role.name} &nbsp;</span> 
                )}
                
              </p>
              

              {manager && (
                <Menu as="div" className="relative flex-none">
                  <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                    <span className="sr-only">Open options</span>
                    <EllipsisVerticalIcon
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
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
                              addrolememberId.current = member._id
                              setOpen(true)
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
            </div>
          </li>
        </>
      ))}
    </ul>
  )
}

export default Members
