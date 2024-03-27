import { DonutChart, Legend } from '@tremor/react'

const ProcessChart = ({ team, tickets }) => {
  let data = team?.members.map((member) => ({
    name: member.name,
    value: 0
  }))

  const processing = tickets?.filter((ticket) => ticket.status === 'Processing')
  processing?.forEach((ticket) => {
    ticket.member.forEach((member) => {
      const memberIndex = data.findIndex(
        (memberI) => memberI.name === member.name
      )
      data[memberIndex].value += 1
    })
  })

  const categories = data?.map((member) => member.name)

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <DonutChart data={data} variant="pie" />
      <Legend categories={categories} />
    </div>
  )
}

export default ProcessChart
