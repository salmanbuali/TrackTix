import { Fragment, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import Client from '../services/api'
import moment from 'moment'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Tickets = ({ teamId, user }) => {
  const [tickets, setTickets] = useState([])
  const [update, setUpdate] = useState(false)
  const [sorted, setSorted] = useState(false)
  const [unsortedTickets, setUnsortedTickets] = useState([])
  const orderRef = useRef(null)
  let navigate = useNavigate()
  // don't delete
  const statuses = {
    Complete: 'text-green-900 dark:text-black bg-green-200 ring-green-600/20',
    Processing:
      'text-indigo-900 dark:text-black bg-indigo-200 ring-indigo-400/30',
    Pending: 'text-yellow-800 dark:text-black bg-yellow-50 ring-yellow-600/20'
  }
  // don't delete
  const prios = {
    Low: 'text-white dark:text-black bg-amber-400 ring-yellow-600/20',
    Mid: 'text-white dark:text-black bg-orange-400 ring-indigo-400/30',
    High: 'text-white dark:text-black bg-orange-600 ring-yellow-600/20',
    Urgent: 'text-white dark:text-black bg-red-600 ring-yellow-600/20'
  }

  useEffect(() => {
    const getTickets = async () => {
      const response = await Client.get(`/tickets/team/${teamId}`)
      setUnsortedTickets(response.data)
      setTickets(response.data)
    }
    getTickets()
  }, [update])

  useEffect(() => {
    return
  }, [sorted])

  const assign = async (ticketId) => {
    await Client.put(`/tickets/${ticketId}/assign`, { member: user.id })
    setUpdate(true)
  }

  const edit = (ticketId) => {
    navigate(`/teams/${teamId}/edit/${ticketId}`)
  }

  const sort = () => {
    let temp = tickets
    const order = orderRef.current.value
    let severity
    switch (order) {
      case 'd':
        temp = temp.sort((a, b) => new Date(a.due) - new Date(b.due))
        setTickets(temp)
        setSorted(!sorted)
        break
      case 'p':
        severity = { Low: 1, Mid: 2, High: 3, Urgent: 4 }
        temp.sort((a, b) => severity[b.priority] - severity[a.priority])
        setTickets(temp)
        setSorted(!sorted)
        break
      case 's':
        severity = { Complete: 1, Processing: 2, Pending: 3 }
        temp.sort((a, b) => severity[b.status] - severity[a.status])
        setTickets(temp)
        setSorted(!sorted)
        break
      case 'n':
        temp = temp.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
        setTickets(temp)
        setSorted(!sorted)
        break
    }
  }

  return tickets ? (
    <div className="w-full m-auto">
      <div className="max-w-sm mx-auto">
        <select
          onChange={sort}
          id="countries"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          ref={orderRef}
        >
          <option selected disabled>
            Sort By
          </option>
          <option value="n">Newest</option>
          <option value="p">Priority</option>
          <option value="s">Status</option>
          <option value="d">Due Date</option>
        </select>
      </div>
      <ul role="list" className="divide-y divide-gray-300 w-2/3 m-auto">
        {tickets?.map((ticket) => (
          <li
            key={ticket._id}
            className="flex items-center justify-between gap-x-6 py-5"
          >
            <div className="min-w-0">
              <div className="flex items-start gap-x-3">
                <p className="text-sm font-semibold leading-6text-gray-900 dark:text-white">
                  {ticket.subject}
                </p>
                <p
                  className={classNames(
                    statuses[ticket.status],
                    'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset'
                  )}
                >
                  {ticket.status}
                </p>
              </div>
              <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500 dark:text-gray-300">
                <p className="whitespace-nowrap">
                  Due on{' '}
                  <time dateTime={ticket.due}>
                    {moment(ticket.due).format('Do MMM  YY')}
                  </time>
                </p>
                <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                  <circle cx={1} cy={1} r={1} />
                </svg>
                <p className="truncate">Created by {ticket.createdBy.name}</p>
                {ticket.solvedBy && (
                  <>
                    <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                      <circle cx={1} cy={1} r={1} />
                    </svg>
                    <p className="truncate">Closed by {ticket.solvedBy.name}</p>{' '}
                  </>
                )}
              </div>
            </div>
            <div className="flex flex-none items-center gap-x-4">
              <p
                className={classNames(
                  prios[ticket.priority],
                  'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset'
                )}
              >
                {ticket.priority}
              </p>

              <Link
                to={`/tickets/${ticket._id}`}
                className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-90shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block dark:text-gray-200 dark:bg-gray-400/10"
              >
                View ticket<span className="sr-only">, {ticket.name}</span>
              </Link>
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
                            edit(ticket._id)
                          }}
                          className={classNames(
                            active ? 'bg-gray-50' : '',
                            'block px-3 py-1 text-sm leading-6 text-gray-900'
                          )}
                        >
                          Edit
                          <span className="sr-only">, {ticket.name}</span>
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          onClick={() => {
                            assign(ticket._id)
                          }}
                          className={classNames(
                            active ? 'bg-gray-50' : '',
                            'block px-3 py-1 text-sm leading-6 text-gray-900'
                          )}
                        >
                          Assign<span className="sr-only">, {ticket.name}</span>
                        </a>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <></>
  )
}

export default Tickets
