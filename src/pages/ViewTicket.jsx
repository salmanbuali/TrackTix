import { useEffect, useState, useRef } from 'react'
import Client from '../services/api'
import { useParams } from 'react-router-dom'

const ViewTicket = ({ user }) => {
  let { id } = useParams()
  const [ticket, setTicket] = useState()
  const [update, setUpdate] = useState(false)
  let content = useRef(null)
  useEffect(() => {
    const getTicket = async () => {
      const response = await Client.get(`/tickets/${id}`)
      setTicket(response.data)
      console.log(response.data)
    }
    getTicket()
  }, [update])

  const addComment = async () => {
    const comment = {
      content: comment.body.current.value,
      member: user.id
    }
    await Client.post(`/tickets/${id}/comments`, comment)
    setUpdate(true)

    comment.body.current.value = ''
  }

  return (
    ticket && (
      <div className="flex flex-col justify-center items-center">
        <p className="text-3xl">{ticket.subject}</p>
        <div><img src={ticket.createdBy.avatar} alt="avatar" /> {ticket.createdBy.name}</div>
      </div>
    )
  )
}

export default ViewTicket
