import { BarChart } from '@tremor/react'

const DBarChart = ({ tickets }) => {
  let processing = 0
  let complete = 0
  let pending = 0
  tickets?.forEach((ticket) => {
    switch (ticket.status) {
      case 'Processing':
        processing++
        break
      case 'Complete':
        complete++
        break
      case 'Pending':
        pending++
        break
      default:
        break
    }
  })

  const chartdata = [
    {
      name: 'Tickets',
      'Number of processing tickets': processing,
      'Number of complete tickets': complete,
      'Number of pending tickets': pending
    }
  ]

  // Define colors for each bar
  const barColors = ['blue', 'green', 'red']

  return (
    <BarChart
      data={chartdata}
      index="name"
      categories={[
        'Number of processing tickets',
        'Number of complete tickets',
        'Number of pending tickets'
      ]}
      colors={barColors}
      yAxisWidth={78}
      allowDecimals={false}
    />
  )
}

export default DBarChart
