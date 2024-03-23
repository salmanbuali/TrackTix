import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Tickets = () => {
  // don't delete
  const statuses = {
    Complete: 'text-green-900 bg-green-200 ring-green-600/20',
    Processing: 'text-indigo-900 bg-indigo-200 ring-indigo-400/30',
    Pending: 'text-yellow-800 bg-yellow-50 ring-yellow-600/20'
  }
  // don't delete
  const prios = {
    Low: 'text-black bg-yellow-300 ring-yellow-600/20',
    Mid: 'text-indigo-900 bg-indigo-200 ring-indigo-400/30',
    High: 'text-yellow-800 bg-yellow-50 ring-yellow-600/20',
    Urgent: ''
  }

  // delete tickets after getting real tickets
  const tickets = [
    {
      id: 1,
      name: 'GraphQL API',
      href: '#',
      status: 'Complete',
      prio: 'Low',
      createdBy: 'Leslie Alexander',
      solvedBy: 'Leslie Alexander',
      due: 'March 17, 2023'
    },
    {
      id: 2,
      name: 'New benefits plan',
      href: '#',
      status: 'Processing',
      prio: 'Mid',
      createdBy: 'Leslie Alexander',
      due: 'May 5, 2023'
    },
    {
      id: 3,
      name: 'Testing',
      href: '#',
      status: 'Pending',
      prio: 'High',
      createdBy: 'Courtney Henry',
      due: 'May 25, 2023'
    }
  ]

  return (
    <ul role="list" className="divide-y divide-gray-100 w-2/3 m-auto">
      {tickets.map((ticket) => (
        <li
          key={ticket.id}
          className="flex items-center justify-between gap-x-6 py-5"
        >
          <div className="min-w-0">
            <div className="flex items-start gap-x-3">
              <p className="text-sm font-semibold leading-6text-gray-900 dark:text-white">
                {ticket.name}
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
            <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
              <p className="whitespace-nowrap">
                Due on <time dateTime={ticket.due}>{ticket.due}</time>
              </p>
              <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                <circle cx={1} cy={1} r={1} />
              </svg>
              <p className="truncate">Created by {ticket.createdBy}</p>
              {ticket.solvedBy && (
                <>
                  <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                    <circle cx={1} cy={1} r={1} />
                  </svg>
                  <p className="truncate">Closed by {ticket.solvedBy}</p>{' '}
                </>
              )}
            </div>
          </div>
          <div className="flex flex-none items-center gap-x-4">
            <p
              className={classNames(
                prios[ticket.prio],
                'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset'
              )}
            >
              {ticket.prio}
            </p>
            <a
              href={ticket.href}
              className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
            >
              View ticket<span className="sr-only">, {ticket.name}</span>
            </a>
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
                        href="#"
                        className={classNames(
                          active ? 'bg-gray-50' : '',
                          'block px-3 py-1 text-sm leading-6 text-gray-900'
                        )}
                      >
                        Edit<span className="sr-only">, {ticket.name}</span>
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
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
  )
}

export default Tickets
