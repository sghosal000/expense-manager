import React from 'react'

export const ProgressBar = ({ data }) => {
    const progress = (data.totalSpent/data.goal)*100
    const color = progress<=80? "bg-green": "bg-red"
  return (
    <div className='bg-base h-auto p-4 space-y-2 rounded-lg highlight-white content-center text-txt'>
        <h1>{data.type}</h1>
        <div className='h-4 w-full rounded-full bg-neutral'>
            <div className={`h-full ${color} rounded-full`} style={{width: `${progress}%`}}></div>
        </div>
    </div>
  )
}
