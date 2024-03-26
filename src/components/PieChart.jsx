import { DonutChart, Legend } from '@tremor/react'

const PieChart = () => {
  const datahero = [
    {
      name: 'New York',
      value: 9800
    },
    {
      name: 'London',
      value: 4567
    },
    {
      name: 'Hong Kong',
      value: 3908
    },
    {
      name: 'San Francisco',
      value: 2400
    },
    {
      name: 'Singapore',
      value: 2174
    },
    {
      name: 'Bahrain',
      value: 1398
    }
  ]

  return (
    <div className="flex flex-col justify-center items-center">
      <DonutChart data={datahero} variant="pie" />
      <Legend
        categories={[
          'New York',
          'London',
          'Hong Kong',
          'San Francisco',
          'Singapore',
          'Bahrain'
        ]}
        className="max-w-xs"
      />
    </div>
  )
}

export default PieChart
