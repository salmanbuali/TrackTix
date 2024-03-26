import { BarList } from '@tremor/react'

const DataBarChart = ({ tickets }) => {
  const calculateTime = (timestamp1, timestamp2) => {
    const time1 = new Date(timestamp1).getTime()
    const time2 = new Date(timestamp2).getTime()
    const differenceInMs = Math.abs(time2 - time1)
    const differenceInHours = differenceInMs / (1000 * 3600)

    return differenceInHours
  }

  let totalPending = 0
  let numOfPending = 0

  let numOfProcessing = 0
  let totalProcessing = 0

  tickets.forEach((t, i) => {
    if (t.logs[1]) {
      totalPending =
        totalPending + calculateTime(t.logs[0].timestamp, t.logs[1].timestamp)
      numOfPending++
    }

    if (t.logs[2]) {
      totalProcessing =
        totalProcessing +
        calculateTime(t.logs[1].timestamp, t.logs[2].timestamp)
      numOfProcessing++
    }
  })

  let avgPending = (totalPending / numOfPending).toFixed(2)
  let avgProcessing = (totalProcessing / numOfProcessing).toFixed(2)

  const datahero = [
    { name: 'Average Pending Time in hours', value: avgPending },
    { name: 'Average Processing Time in hours', value: avgProcessing }
  ]

  return <BarList data={datahero} className="mx-auto w-2/3" />
}

export default DataBarChart
