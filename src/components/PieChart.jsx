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
    <div className="flex flex-col justify-center items-center gap-5">
      <DonutChart data={data} variant="pie" />
      <Legend categories={categories} />
    </div>
  )
}

export default PieChart
