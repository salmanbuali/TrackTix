import Client from '../services/api'
import { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import moment from 'moment'

const EditTicket = () => {
  let navigate = useNavigate()
  let { teamId, ticketId } = useParams()
  const [ticket, setTicket] = useState({})
  const formRef = {
    subject: useRef(null),
    content: useRef(null),
    priority: useRef(null),
    due: useRef(null)
  }
  useEffect(() => {
    const getTicket = async () => {
      const response = await Client.get(`/tickets/${ticketId}`)
      setTicket(response.data)
      formRef.subject.current.value = response.data.subject
      formRef.content.current.value = response.data.content
      formRef.priority.current.value = response.data.priority
      formRef.due.current.value = moment(response.data.due).format('yyyy-MM-DD')
    }
    getTicket()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const ticket = {
      subject: formRef.subject.current.value,
      content: formRef.content.current.value,
      priority: formRef.priority.current.value,
      due: formRef.due.current.value
    }
    await Client.put(`/tickets/${ticketId}`, ticket)
    navigate(`/teams/${teamId}`)
  }
  return (
    <div>
      <div>
        <h1 className="  text-center mb-7 mt-3  text-3xl text-gray-900 dark:text-white">
          {ticket.subject} Ticket
        </h1>
        <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="subject"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Subject:
            </label>
            <input
              type="text"
              id="subject"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              ref={formRef.subject}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="content"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              ref={formRef.content}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="priority"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select Priority
            </label>
            <select
              id="priority"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              ref={formRef.priority}
            >
              <option defaultValue>Choose a Priority</option>
              <option value="Urgent">Urgent</option>
              <option value="High">High</option>
              <option value="Mid">Mid</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div className="mb-5">
            <label
              htmlFor="due"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Due Date
            </label>
            <input
              type="date"
              id="due"
              ref={formRef.due}
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  )
}

export default EditTicket
