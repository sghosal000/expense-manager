import React from 'react'

const ProgressBarSmall = ({ percentage }) => {
	return (
		<div className='flex space-x-2 items-center'>
			<div className='h-2 w-full rounded-full bg-neutral'>
				<div className={`h-full max-w-full bg-accent rounded-full`} style={{ width: `${percentage}%` }}></div>
			</div>
			<p className='text-sm text-txt-depressed'>{percentage}%</p>
		</div>
	)
}

export default ProgressBarSmall