import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { BellAlertIcon } from '@heroicons/react/24/outline'
import { XMarkIcon } from '@heroicons/react/20/solid'
import Client from '../services/api'
import { Link } from 'react-router-dom'

const Notifications = ({ open, setOpen, cancelButtonRef, user }) => {
  const [notifications, setNotifications] = useState([])
  const [reload, setReload] = useState()
  useEffect(() => {
    const getNotifications = async () => {
      const response = await Client.get(`/notifications/user/${user?.id}`)
      setNotifications(response.data)
    }
    if (user) getNotifications()
  }, [reload, open])

  const remove = async (id, i) => {
    await Client.delete(`/notifications/${id}`)
    setReload((prev) => !prev)
  }

  const removeAll = async (id) => {
    await Client.delete(`/notifications/user/${id}`)
    setReload((prev) => !prev)
  }
  return (
    <div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto mr-5 mt-14">
            <div className="flex h-1/2 w-11/12 items-end justify-end pr-10 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl sm:p-6">
                  <div>
                    <div className="mt-3 text-center ove sm:mt-5">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
                        <BellAlertIcon className="h-6 w-6 text-indigo-600" />
                      </div>
                      <Dialog.Title
                        as="h3"
                        className="flex items-center text-base font-semibold leading-6 text-gray-900"
                      >
                        <span className="flex-grow ml-10">Notifications</span>
                        <button
                          type="button"
                          className="mr-2"
                          onClick={() => {
                            removeAll(user.id)
                          }}
                        >
                          Clear
                        </button>
                      </Dialog.Title>

                      <div className="mt-5">
                        <ul className="h-28 overflow-y-scroll">
                          {notifications?.map((noti, i) => (
                            <li
                              key={i}
                              className="flex   text-sm text-left justify-between px-5 my-1"
                            >
                              <Link
                                to={`/tickets/${noti.ticket._id}/team/${noti.team._id}`}
                                onClick={() => {
                                  setOpen((prev) => !prev)
                                }}
                              >
                                {noti.content}{' '}
                              </Link>
                              <button
                                onClick={() => {
                                  remove(noti._id, i)
                                }}
                                type="button"
                                className="rounded-full bg-gray-600 p-1 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 size-6"
                              >
                                {' '}
                                <XMarkIcon
                                  className="h-4 w-4"
                                  aria-hidden="true"
                                />{' '}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  )
}

export default Notifications
