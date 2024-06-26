import { Fragment, useState, useRef } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import {
  BellIcon,
  MoonIcon,
  UserGroupIcon,
  UserIcon
} from '@heroicons/react/24/outline'
import { Link, useNavigate } from 'react-router-dom'
import Notifications from './Notifications'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Navbar = ({ toggleDarkMode, user, handleLogOut }) => {
  const [open, setOpen] = useState(false)
  const cancelButtonRef = useRef(null)

  let navigate = useNavigate()
  const profile = () => {
    navigate(`/profile/${user.id}`)
  }
  return (
    <Disclosure as="nav" className="bg-gray-800 fixed w-full z-50 ">
      {({ o }) => (
        <>
          <Notifications
            user={user}
            open={open}
            setOpen={setOpen}
            cancelButtonRef={cancelButtonRef}
          />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0 text-white flex items-center">
                  <Link to="/" className="flex items-center">
                    <img
                      src="/favicon.ico"
                      alt="logo"
                      style={{ filter: 'invert(1)' }}
                    />
                    &nbsp; TrackTix
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex items-center gap-3">
                    {user && (
                      <Link
                        to="/teams"
                        className="flex items-center rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                      >
                        <UserGroupIcon className="h-6 w-6 mr-1" />
                        Teams
                      </Link>
                    )}
                    {user && (
                      <Link
                        to={`/mytickets/${user?.id}`}
                        className="flex items-center rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                      >
                        <UserGroupIcon className="h-6 w-6 mr-1" />
                        My Tickets
                      </Link>
                    )}
                  </div>
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex items-center">
                  {user && (
                    <button
                      type="button"
                      className="relative rounded-full bg-gray-800 p-1 text-gray-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      onClick={() => setOpen(true)}
                    >
                      <span className="absolute -inset-1.5" />
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  )}

                  <button onClick={toggleDarkMode} className="text-gray-200">
                    <MoonIcon className="h-6 w-6" />
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex rounded-full text-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />

                        {!user && <UserIcon className="size-6" />}
                        {user && (
                          <img
                            src={user?.avatar}
                            className="size-6 rounded-2xl"
                          />
                        )}
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-300 py-1 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {user && (
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                onClick={profile}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                Your Profile
                              </a>
                            )}
                          </Menu.Item>
                        )}

                        {!user && (
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/register"
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                Register
                              </Link>
                            )}
                          </Menu.Item>
                        )}

                        {!user && (
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/login"
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                Login
                              </Link>
                            )}
                          </Menu.Item>
                        )}

                        {user && (
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                onClick={handleLogOut}
                                to="/"
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                Logout
                              </Link>
                            )}
                          </Menu.Item>
                        )}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  )
}

export default Navbar
