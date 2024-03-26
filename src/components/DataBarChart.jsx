import { BarList } from '@tremor/react'

const DataBarChart = ({ tickets }) => {
  const datahero = [
    { name: 'Average Pending Time', value: 456 },
    { name: 'Average Processing Time', value: 1493 }
  ]

  const calculateTimeDifference = (timestamp1, timestamp2) => {
    const time1 = new Date(timestamp1).getTime();
    const time2 = new Date(timestamp2).getTime();
    return Math.abs(time2 - time1);
  }

  tickets.forEach((t)=>{
    // console.log(t)
    // console.log(t.logs[0].timestamp)
    // console.log(t.logs[1]?.timestamp)
    console.log(calculateTimeDifference(t.logs[0].timestamp, t.logs[1]?.timestamp))
    // console.log(t.logs[1]?.timestamp)
  })
   
  return <BarList data={datahero} className="mx-auto max-w-lg" />
}

export default DataBarChart
