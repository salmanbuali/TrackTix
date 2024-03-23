import Client from "../services/api"
import { useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import InviteMember from "../components/InviteMember"

const ViewTeam = ({ user }) => {
  let { id } = useParams()
  const [team, setTeam] = useState({})

  useEffect(() => {
    const getTeam = async () => {
      const response = await Client.get(`/teams/${id}`)
      console.log(response)
      setTeam(response.data)
    }
    getTeam()
  }, [])
  return <InviteMember userId={user?.id} teamId={id} members={team?.members} />
}
export default ViewTeam
