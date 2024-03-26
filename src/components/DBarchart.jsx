import { BarChart } from '@tremor/react'

const DBarChart = () => {
  const chartdata = [
    {
      name: 'Tickets',
      'Number of proccessing tickets': 4,
      'Number of complete tickets': 2,
      'Number of pending tickets': 3

    }
  ];

  // Define colors for each bar
  const barColors = ['blue', 'green', 'red'];

  return (
    <BarChart
      data={chartdata}
      index="name"
      categories={['Number of proccessing tickets','Number of complete tickets','Number of pending tickets']}
      colors={barColors} // Assign colors array
      yAxisWidth={48}
      onValueChange={(v) => console.log(v)}
    />
  );
};

export default DBarChart
