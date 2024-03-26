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
      <div className="flex flex-row">
        <div className="w-1/3">
          <DBarChart tickets={tickets} />
        </div>

        <div className="w-1/3">
          {team && tickets ? <PieChart team={team} tickets={tickets} /> : null}
        </div>
      </div>

      <div>
        <DataBarChart />
      </div>
    </div>
  )
}

export default Dashboard
