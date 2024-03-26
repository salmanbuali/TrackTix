import { DonutChart, Legend } from '@tremor/react'

const PieChart = ({ team, tickets }) => {
  let data = team?.members.map((member) => ({
    name: member.name,
    value: 0
  }))

  const completed = tickets?.filter((ticket) => ticket.status === 'Complete')
  completed?.forEach((ticket) => {
    const memberIndex = data.findIndex(
      (member) => member.name === ticket.solvedBy.name
    )
    data[memberIndex].value += 1
  })

  const categories = data?.map((member) => member.name)

  return (
    <div className="flex flex-col justify-center items-center">
      <DonutChart data={data} variant="pie" />
      <Legend categories={categories} className="max-w-xs" />
    </div>
  )
}

export default PieChart
