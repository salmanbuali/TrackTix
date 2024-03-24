import { useEffect, useState, useRef } from 'react'
import Client from '../services/api'
import { useParams } from 'react-router-dom'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const ViewTicket = ({ user }) => {
  let { id } = useParams()
  const [ticket, setTicket] = useState()
  const [update, setUpdate] = useState(false)
  let content = useRef(null)
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
    const getTicket = async () => {
      const response = await Client.get(`/tickets/${id}`)
      setTicket(response.data)
      console.log(response.data)
    }
    getTicket()
  }, [update])

  const addComment = async () => {
    const comment = {
      content: comment.body.current.value,
      member: user.id
    }
    await Client.post(`/tickets/${id}/comments`, comment)
    setUpdate(true)

    comment.body.current.value = ''
  }

  return (
    ticket && (
      <div className="flex flex-col justify-center items-center w-2/3 m-auto">
        <div className="flex w-full items-center justify-center gap-5">
          <p className="text-3xl dark:text-white">{ticket.subject}</p>
          <div className="flex items-center justify-center gap-5">
            <p
              className={classNames(
                prios[ticket.priority],
                'rounded-md whitespace-nowrap mt-0.5 px-5 py-2 text-xs font-medium ring-1 ring-inset'
              )}
            >
              {ticket.priority}
            </p>

            <p
              className={classNames(
                statuses[ticket.status],
                'rounded-md whitespace-nowrap mt-0.5 px-4 py-2 text-xs font-medium ring-1 ring-inset'
              )}
            >
              {ticket.status}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-10">
          <img
            src={ticket.createdBy.avatar}
            alt="avatar"
            className="w-10 h-10 rounded-3xl border border-neutral-900 dark:border-white"
          />{' '}
          <p className="dark:text-white">{ticket.createdBy.name}</p>
        </div>

        <div className="flex flex-row justify-center items-center gap-16 mt-10 m-auto">
          <div className="flex flex-col items-center">
            <p className="dark:text-white">Attachments</p>
            {ticket.attachments.map((a) => (
              <a className="text-md font-thin dark:text-white">{a}</a>
            ))}
          </div>
          <div className="flex items-center text-wrap w-1/2">
            <p className="dark:text-white">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia quos
              velit vitae earum? Sequi accusamus voluptate nobis delectus cum
              similique exercitationem laborum dolorum, numquam dicta quod omnis
              inventore harum dolor.
            </p>
          </div>
        </div>
      </div>
    )
  )
}

export default ViewTicket
