import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useEffect, useRef, useState } from 'react'
import Client from '../services/api'

const AssignMemberDialog = ({
  open,
  setOpen,
  cancelButtonRef,
  members,
  ticket
}) => {
  const [availableMembers, setAvailableMembers] = useState([])

  const memberRef = useRef({})
  useEffect(() => {
    const ticketMembers = ticket?.member.map((member) => member._id)
    const tempMembers = members?.filter(
      (member) => !ticketMembers.includes(member._id)
    )
    setAvailableMembers(tempMembers)
  }, [])

  const assign = async () => {
    const id = memberRef.current.value
    await Client.put(`/tickets/${ticket._id}/assign`, { member: id })
    setOpen((prev) => !prev)
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

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full w-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl sm:p-6">
                  <div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Choose a member to assign
                      </Dialog.Title>
                      <div className="mt-5">
                        <div>
                          <select
                            id="member"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            ref={memberRef}
                          >
                            {availableMembers.map((member) => (
                              <option value={member._id}>{member.name}</option>
                            ))}
                          </select>
                          <button
                            onClick={assign}
                            type="submit"
                            className="text-white mt-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            Assign
                          </button>
                        </div>
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

export default AssignMemberDialog
