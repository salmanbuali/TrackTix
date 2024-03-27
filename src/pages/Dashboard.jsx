import { useNavigate, useParams } from 'react-router-dom'
import DBarChart from '../components/DBarchart'
import { useEffect, useState } from 'react'
import Client from '../services/api'
import DataBarChart from '../components/DataBarChart'
import PieChart from '../components/PieChart'
import ProcessChart from '../components/ProcessChart'
import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline'

const Dashboard = () => {
  let navigate = useNavigate()
  const { teamId } = useParams()
  const [team, setTeam] = useState(null)
  const [tickets, setTickets] = useState(null)

  useEffect(() => {
    const getTeam = async () => {
      const response = await Client.get(`/teams/${teamId}`)
      const ticketResponse = await Client.get(`/tickets/team/${teamId}`)
      setTickets(ticketResponse.data)
      setTeam(response.data)
    }
    getTeam()
  }, [])

  const back = () => {
    navigate(`/teams/${teamId}`)
  }

  return (
    <div>
      <button
        onClick={back}
        className="rounded-lg bg-white px-3 py-2 text-sm font-medium text-gray-900 dark:text-white shadow-sm dark:hover:bg-white/20 flex items-center hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border dark:border-gray-100 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white gap-1 ml-3"
      >
        <ArrowUturnLeftIcon className="size-5" />
        Team
      </button>
      <div class="flex flex-row items-center w-4/5 m-auto gap-10">
        <div class="w-1/2">
          <DBarChart tickets={tickets} />
          <div className="mt-5 w-4/5 m-auto p-3">
            {tickets && <DataBarChart tickets={tickets} />}
          </div>
        </div>
        <div class="w-1/2 flex flex-col items-center gap-8">
          <div className="text-slate-600 dark:text-slate-400">
            Tickets closed per member
          </div>
          {team && tickets ? <PieChart team={team} tickets={tickets} /> : null}
          <div className="text-slate-600 dark:text-slate-400">
            Tickets processing per member
          </div>
          {team && tickets ? (
            <ProcessChart team={team} tickets={tickets} />
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
