import { useParams } from 'react-router-dom'
import DBarChart from '../components/DBarchart'
import { useEffect, useState } from 'react'
import Client from '../services/api'
import DataBarChart from '../components/DataBarChart'
import PieChart from '../components/PieChart'

const Dashboard = () => {
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

  return (
    <div className="flex justify-center flex-col">
      <div class="flex flex-row items-center w-4/5 m-auto gap-10 p-3 h-80">
        <div class="w-1/2">
          <DBarChart tickets={tickets} />
        </div>
        <div class="w-1/2 flex flex-col items-center gap-5">
          <div className="text-slate-600 dark:text-slate-400">
            Tickets closed per member
          </div>
          {team && tickets ? <PieChart team={team} tickets={tickets} /> : null}
        </div>
      </div>
      <div className="mt-5 w-4/5 m-auto p-3">
        {tickets && <DataBarChart tickets={tickets} />}
      </div>
    </div>
  )
}

export default Dashboard
