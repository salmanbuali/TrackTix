import { useParams } from 'react-router-dom'
import DBarChart from '../components/DBarchart'
import { useEffect, useState } from 'react'
import Client from '../services/api'

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
    <div>
      hi
      <DBarChart tickets={tickets} />
    </div>
  )
}

export default Dashboard
