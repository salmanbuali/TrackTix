import { BarList } from '@tremor/react'
const DataBarChart = () => {
  const datahero = [
    { name: '/home', value: 456 },
    { name: '/imprint', value: 351 },
    { name: '/cancellation', value: 51 },
  ];
  return(
    <BarList data={datahero} className="mx-auto max-w-sm" />
  )

}

export default DataBarChart