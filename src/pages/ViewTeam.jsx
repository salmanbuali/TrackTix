import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const ViewTeam = ({ user }) => {
  let { id } = useParams()
  const [team, setTeam] = useState({})

  useEffect(() => {}, [])
  return <></>
}
export default ViewTeam
