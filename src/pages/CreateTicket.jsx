import { useNavigate, useParams } from "react-router-dom"
import { useRef } from "react"
import Client from "../services/api"
const CreateTicket = ({ user }) => {
  let navigate = useNavigate()
  let { id } = useParams()
  const formRef = {
    subject: useRef(null),
    content: useRef(null),
    priority: useRef("Urgent"),
    attachments: useRef(null),
    due: useRef(null),
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    const ticket = {
      subject: formRef.subject.current.value,
      content: formRef.content.current.value,
      priority: formRef.priority.current.value,
      attachments: formRef.attachments.current.files,
      due: formRef.due.current.value,
      createdBy: user?.id,
      team: id,
    }
    console.log(ticket.attachments)
    await Client.post(`/tickets/team/${id}`, ticket, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    // navigate(`/teams/${id}`)
  }
  return (
    <div>
      <div>
        <h1 className="  text-center mb-7 mt-3  text-3xl text-gray-900 dark:text-white">
          Create Ticket
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
              htmlFor="attachments"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Attachments
            </label>
            <input
              type="file"
              id="attachments"
              name="attachments[]"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              multiple="multiple"
              ref={formRef.attachments}
            />
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
            Create
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateTicket
