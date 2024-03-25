import { useEffect, useState, useRef } from 'react'
import Client from '../services/api'
import { useNavigate, useParams } from 'react-router-dom'
import moment from 'moment'
import {
  XMarkIcon,
  UserGroupIcon,
  ArrowUturnLeftIcon,
  ArrowLeftStartOnRectangleIcon,
  CheckIcon,
  LinkIcon
} from '@heroicons/react/24/outline'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const ViewTicket = ({ user }) => {
  let { id, teamId } = useParams()
  let navigate = useNavigate()
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
    }
    getTicket()
    setUpdate(false)
  }, [update])

  const addComment = async (e) => {
    e.preventDefault()
    const comment = {
      content: content.current.value,
      member: user.id
    }
    await Client.post(`/tickets/${id}/comments`, comment)
    setUpdate(true)
    content.current.value = ''
  }

  const deleteComment = async (commentId) => {
    await Client.delete(`/tickets/${id}/comments/${commentId}`)
    setUpdate(true)
  }

  const solved = async () => {
    const ticket = {
      status: 'Complete',
      solvedBy: user.id
    }
    await Client.put(`/tickets/${id}?teamId=${teamId}`, ticket)
    setUpdate(true)
  }

  const leave = async () => {
    await Client.put(`/tickets/${id}/remove`, { member: user.id })
    setUpdate(true)
  }

  const back = () => {
    navigate(`/teams/${teamId}`)
  }

  return (
    ticket && (
      <div className="flex flex-col justify-center items-center w-full m-auto">
        <div className="mx-auto w-3/4 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            <div className="lg:col-start-3 lg:row-end-1">
              <div className="rounded-lg bg-gray-50 dark:bg-slate-800 shadow-sm ring-1 ring-gray-900/5">
                <dl className="flex flex-wrap">
                  <div className="flex-auto pl-6 pt-6 pb-6">
                    <dt className="flex gap-2 mb-5 font-semibold leading-6 text-lg text-gray-900 dark:text-white">
                      <LinkIcon className="size-5" />
                      Attachments
                    </dt>
                    {ticket.attachments.map((a) => (
                      <p className="dark:text-white">{a}</p>
                    ))}
                  </div>
                </dl>
              </div>
            </div>

            <div className="shadow-sm ring-1 dark:bg-slate-800 ring-gray-900/5 sm:mx-0 sm:rounded-lg lg:col-span-2 lg:row-span-2 lg:row-end-2 xl:px-16 xl:pb-12 xl:pt-16">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold leading-6 text-gray-900 dark:text-white">
                  {ticket.subject}
                </h2>
                <div className="flex gap-3">
                  <span
                    className={classNames(
                      prios[ticket.priority],
                      'rounded-md whitespace-nowrap mt-0.5 px-5 py-2 text-xs font-medium ring-1 ring-inset'
                    )}
                  >
                    {ticket.priority}
                  </span>

                  <span
                    className={classNames(
                      statuses[ticket.status],
                      'rounded-md whitespace-nowrap mt-0.5 px-4 py-2 text-xs font-medium ring-1 ring-inset'
                    )}
                  >
                    {ticket.status}
                  </span>
                </div>
              </div>
              <dt className="flex mt-5">
                <dt className="inline text-gray-500 text-sm dark:text-gray-300">
                  Created By
                </dt>
                <img
                  src={ticket.createdBy.avatar}
                  className="h-6 w-5 ml-3 rounded-3xl mr-2"
                  alt=""
                />
                <dd className="text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">
                  {ticket.createdBy.name}
                </dd>
              </dt>
              <dt className="flex mt-5">
                <dt className="inline text-gray-500 dark:text-gray-300 text-sm">
                  Assigned to
                </dt>
                <UserGroupIcon className="size-6 mx-2 dark:text-gray-300" />
                <dd className="text-sm font-medium leading-6 text-gray-900">
                  <div>
                    {ticket.member.map((member, i) => (
                      <span key={i} className="dark:text-gray-300">
                        {member.name}
                        {i !== ticket.member.length - 1 && ' - '}{' '}
                      </span>
                    ))}
                  </div>
                </dd>
              </dt>
              <dl className="mt-6 grid grid-cols-1 text-sm leading-6 sm:grid-cols-2">
                <div className="sm:pr-4">
                  <dt className="inline text-gray-500 font-semibold dark:text-gray-50">
                    Issued on
                  </dt>{' '}
                  <dd className="inline text-gray-700 dark:text-gray-300">
                    {moment(ticket.createdAt).format('MMMM DD,  YYYY')}
                  </dd>
                </div>
                <div className="mt-2 sm:mt-0 sm:pl-4">
                  <dt className="inline text-gray-500 font-semibold dark:text-gray-50">
                    Due on
                  </dt>{' '}
                  <dd className="inline text-gray-700 dark:text-gray-300">
                    {moment(ticket.due).format('MMMM DD,  YYYY')}
                  </dd>
                </div>

                <div className="mt-6 border-t border-gray-900/5 pt-6 sm:pr-4">
                  <dd className="mt-2 text-gray-500">
                    <span className="font-medium text-gray-900 dark:text-gray-300">
                      {ticket.content}
                    </span>
                  </dd>
                </div>
              </dl>
              <div className="flex gap-5">
                <button
                  onClick={back}
                  className="mt-12 rounded-lg bg-white px-3 py-2 text-sm font-medium text-gray-900 dark:text-white shadow-sm dark:hover:bg-white/20 flex items-center hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border dark:border-gray-100 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white gap-1"
                >
                  <ArrowUturnLeftIcon className="size-5" />
                  Team
                </button>
                {ticket.member
                  .map((member) => member._id)
                  .includes(user.id) && (
                  <button
                    onClick={leave}
                    className="mt-12 rounded-lg bg-white px-3 py-2 text-sm font-medium text-gray-900 dark:text-white shadow-sm dark:hover:bg-white/20 flex items-center hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border dark:border-gray-100 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white gap-1"
                  >
                    <ArrowLeftStartOnRectangleIcon className="size-5" />
                    Leave
                  </button>
                )}
                {ticket.status !== 'Complete' &&
                  ticket.member
                    .map((member) => member._id)
                    .includes(user.id) && (
                    <button
                      onClick={solved}
                      className="mt-12 rounded-lg px-3 py-2 text-sm font-medium text-gray-900 dark:text-white shadow-sm dark:hover:bg-white/20 flex items-center hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 bg-green-600 dark:border dark:border-gray-100 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white gap-1"
                    >
                      <CheckIcon className="size-5" />
                      Solved
                    </button>
                  )}
              </div>
            </div>

            <div className="lg:col-start-3">
              {/* Comment feed */}
              <h2 className="text-sm font-semibold leading-6 text-gray-900">
                Comments
              </h2>

              <ul role="list" className="mt-6 space-y-6">
                {ticket.comments.map((comment) => (
                  <li key={comment.id} className="relative flex gap-x-4">
                    <>
                      <img
                        src={comment.member.avatar}
                        alt=""
                        className="relative mt-3 h-6 w-6 flex-none rounded-full bg-gray-50"
                      />
                      <div className="flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200">
                        <div className="flex justify-between gap-x-4">
                          <div className="py-0.5 text-xs leading-5 text-gray-500">
                            <span className="font-medium text-gray-900 dark:text-gray-100">
                              {comment.member.name}
                            </span>{' '}
                            commented
                          </div>
                          {user.id === comment.member._id && (
                            <button
                              onClick={() => {
                                deleteComment(comment._id)
                              }}
                              type="button"
                              className="rounded-full bg-gray-600 p-1 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                              {' '}
                              <XMarkIcon
                                className="h-4 w-4"
                                aria-hidden="true"
                              />{' '}
                            </button>
                          )}
                        </div>
                        <p className="text-xs leading-6 text-gray-500 dark:text-white text-wrap">
                          {comment.content}
                        </p>
                      </div>
                    </>
                  </li>
                ))}
              </ul>

              {/* New comment form */}
              {ticket.status !== 'Complete' &&
                ticket.member.map((member) => member._id).includes(user.id) && (
                  <div className="mt-6 flex gap-x-3">
                    <form className="relative flex-auto">
                      <div className="overflow-hidden rounded-lg pb-12 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
                        <label htmlFor="comment" className="sr-only">
                          Add your comment
                        </label>
                        <textarea
                          rows={2}
                          name="comment"
                          id="comment"
                          className="block w-full resize-none border-0 bg-transparent py-1 px-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="Add your comment..."
                          defaultValue={''}
                          ref={content}
                        />
                      </div>

                      <div className="absolute inset-x-0 bottom-0 flex py-2 pl-3 pr-2">
                        <button
                          type="submit"
                          className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                          onClick={addComment}
                        >
                          Comment
                        </button>
                      </div>
                    </form>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default ViewTicket
