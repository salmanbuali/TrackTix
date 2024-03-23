import Client from '../services/api'
import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'

const ViewTeam = ({ user }) => {
  let { id } = useParams()
  const [team, setTeam] = useState({})

  useEffect(() => {
    const getTeam = async () => {
      const response = await Client.get(`/teams/${id}`)
      setTeam(response.data)
      console.log(response.data)
    }
    getTeam()
  }, [])
  return <></>
}
export default ViewTeam
