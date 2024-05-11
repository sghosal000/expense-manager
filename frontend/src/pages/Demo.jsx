import React from 'react'
import { TransactionGraph } from '../components/TransactionGraph'
import "./Demo.css"

import PieChart from '../components/PieChart'
import { pieData } from '../Fake_data2'
// tumne kuch changeskiya tha kya ? us
function Demo() {
  return (
    <div className='custom-container'>
      
      <div className='graph'>
      <TransactionGraph></TransactionGraph>
      <PieChart pieChartData={pieData}></PieChart>

      </div>
       // are 
      
    </div>
  )
}

export default Demo
