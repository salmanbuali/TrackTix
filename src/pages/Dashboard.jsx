import DBarChart from '../components/DBarchart'
import DataBarChart from '../components/DataBarChart'
import PieChart from '../components/PieChart'

const Dashboard = () => {
  return (
    <div className="flex justify-center flex-col">
      <div className="flex flex-row">
        <div className="w-1/3">
          <DBarChart />
        </div>

        <div className="w-1/3">
          <PieChart />
        </div>
      </div>

      <div>
        <DataBarChart />
      </div>
    </div>
  )
}

export default Dashboard
