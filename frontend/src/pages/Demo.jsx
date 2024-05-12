import React from 'react'
import LineChart from '../components/charts/LineChart'
import DoughnutChart from '../components/charts/PieChart'
import { pieData, amountByType } from '../components/charts/Fake_data2'

// tumne kuch changeskiya tha kya ? us
function Demo() {
  return (
    <div className='custom-container'>
      <div className='graph'>
        <LineChart />
        {/* <PieChart pieChartData={pieData}></PieChart> */}
        <DoughnutChart amountByType={amountByType} />
      </div>
    </div>
  )
}

export default Demo
