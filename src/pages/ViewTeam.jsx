import Client from "../services/api"
import { useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import InviteMember from "../components/InviteMember"
import Members from "../components/Members"
import Tickets from "../components/Tickets"

const ViewTeam = ({ user }) => {
  let { id } = useParams()
  const [team, setTeam] = useState({})
  const [viewMembers, setViewMembers] = useState(false)

  useEffect(() => {
    const getTeam = async () => {
      const response = await Client.get(`/teams/${id}`)
      console.log(response)
      setTeam(response.data)
    }
    getTeam()
  }, [])

  const toggleView = (view) => {
    if (view === "m") {
      setViewMembers(true)
    } else {
      setViewMembers(false)
    }
  }

  return (
    <div>
      <InviteMember userId={user?.id} teamId={id} members={team?.members} />
      <Link to={`/teams/${team._id}/createticket/`}>
        <button
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Create Ticket
        </button>
      </Link>

      <div className="inline-flex rounded-md shadow-sm" role="group">
        <button
          onClick={() => {
            toggleView("m")
          }}
          type="button"
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
        >
          <svg
            className="w-3 h-3 me-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
          </svg>
          Members
        </button>
        <button
          onClick={() => {
            toggleView("t")
          }}
          type="button"
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
        >
          <svg
            className="w-3 h-3 me-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z" />
            <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
          </svg>
          Tickets
        </button>
      </div>

      {viewMembers && <Members members={team?.members} />}
      {!viewMembers && <Tickets />}
    </div>
  )
}
export default ViewTeam
