import { useEffect, useState } from 'react'
import Client from '../services/api'
import { useParams } from 'react-router-dom'

const ViewTicket = () => {
  let { id } = useParams()
  const [ticket, setTicket] = useState()
  useEffect(() => {
    const getTicket = async () => {
      const response = await Client.get(`/tickets/${id}`)
      console.log(response.data)
      setTicket(response.data)
    }
    getTicket()
  }, [])
  return <div>Ticket</div>
}

export default ViewTicket
