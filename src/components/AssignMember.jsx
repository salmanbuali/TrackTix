import { useEffect, useRef, useState } from 'react'
import Client from '../services/api'

const AssignMember = ({ ticket, members }) => {
  const [availableMembers, setAvailableMembers] = useState([])
  const memberRef = useRef({})
  useEffect(() => {
    const ticketMembers = ticket?.member.map((member) => member._id)
    const tempMembers = members?.filter(
      (member) => !ticketMembers.includes(member._id)
    )
    setAvailableMembers(tempMembers)
  }, [])

  const assign = async () => {
    const id = memberRef.current.value
    await Client.put(`/tickets/${ticket._id}/assign`, { member: id })
  }

  return (
    <div>
      <select
        id="member"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        ref={memberRef}
      >
        {availableMembers.map((member) => (
          <option value={member._id}>{member.name}</option>
        ))}
      </select>
      <button
        onClick={assign}
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Assign
      </button>
    </div>
  )
}

export default AssignMember
