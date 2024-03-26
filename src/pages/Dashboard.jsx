import { useParams } from 'react-router-dom'
import DBarChart from '../components/DBarchart'
import { useEffect, useState } from 'react'
import Client from '../services/api'
import DataBarChart from '../components/DataBarChart'
import PieChart from '../components/PieChart'

const Dashboard = () => {
  const { teamId } = useParams()
  const [team, setTeam] = useState({})
  const [tickets, setTickets] = useState([])

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
      <div className="flex flex-row items-center bg-gray-200 dark:bg-transparent border border-gray-700 rounded-3xl w-4/5 m-auto gap-10 p-3">
        <div className="w-1/2">
          <DBarChart tickets={tickets} />
        </div>

        <div className="w-1/3">
          <PieChart />
        </div>
      </div>

      <div className="mt-10 border border-gray-700 bg-gray-200 dark:bg-transparent rounded-3xl w-4/5 m-auto p-3">
        <DataBarChart tickets={tickets} />
      </div>
    </div>
  )
}

export default Dashboard
