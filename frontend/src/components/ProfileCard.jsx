import React from 'react'
import ProgressBarCircular from './charts/ProgressBarCircular'
import ProgressBarSmall from './charts/ProgressBarSmall'

const ProfileCard = ({ user, totalTransaction, transactionsByCategory }) => {
	const savings = totalTransaction.income - totalTransaction.expense - totalTransaction.investment
	return (
		<div className='flex flex-col space-y-4 items-center p-6 bg-base highlight-white rounded-lg'>
			{/* <img width="96" height="96" src="https://img.icons8.com/ink/96/person-female.png" alt="person-female"/> */}
			{/* <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC+klEQVR4nO2ZW4hNYRTHf2YMzYzEMC9yKZRcS0oTHvBALvE03tzNJHliKA/Eg0mUZ+RBjVsoipTMg1tNZkhyS2Ikxt2439la9T91Op3L3mfv+fZO86tVpzPfty77fHut9a2BbrpJHD2BWuAQ8Aj4AnwC7gB7gJkkmAXAY8ArIFeASSSAHsAS4DLwwYfj6fIdWBn3UTke0OlssiKuALZH4LwH/AQmu3Z+CPAjogA8oBUocRnApgid9ySzXAZwLsP4G2AM0BsYBMwGdgPtAQLY7zKApxnG1+VZe1ZrOgoEcMuh/3zOMD46z9oRKmQTlDrt12sEmjJ0vHfoPx8zjJcXWL9YL+kaoAFYBvTP0GFBOqM1zfDfgHvnpX3+k5GJnLEhRADkCKABh1Sl1QFr2IrlYVoxM51O+SrjW0Lo2Cwd9jCcchS4KePDQugZKh031Fc5TaNWtJ5EoKsd6AV8U3frBLukVKh6hjW6V2nYAnDGfWAUUBNBE1YjXQ9wyEGgLkJ9dcBhHDJd6bM6Al3V0jUDxzTqlwhLE7CDGOinBqxvCB0VQCcwgJg4BSwNsX85cIYYsVvU1SL3Wvq9DcyJ2KfATtzTSx2UhUqdTu/C2VitQVWQgmZrW3Q/iJ0y4G7AulCvYlhGQpir7tTPfGeieik7QomhXF3la2BqnnXTgFdaGyb9Rs5wOd8G/FaDNgXoI7HP+/S3awrC+p/EYKmwWRf15jyjk/NaY5OJ+SSIk3oxUxnGphAXgHeSi/oulalsoHuaBJC6E9jTHRlg32DtOQBUEgPjgZ0aKaaOx/oA+9em7XsL7NLgq0ux2edW5fxs5/uFz/a6Ksto0pNYVd8GjI3K6Uqd7TafA1qrrgPz6LMX+JJPXddV5S2LBaZE//55VsSY/KXG7+NUH8r1RDcCz4vQ16EqX+rXecsUR4ow1NVyzG/jtyoBzno5xI5UQVoS4KiXQ6yKF6QzAY56OcTmUQX5lQBHvTxS+t8FUKvBqg1rk3x8UmKTEPP1BLDoH/koYTw/VNKwAAAAAElFTkSuQmCC"></img> */}
			{/* <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="User / User_02"> <path id="Vector" d="M20 21C20 18.2386 16.4183 16 12 16C7.58172 16 4 18.2386 4 21M12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13Z" stroke="#000000" strokeWidth="0.21600000000000003" strokeLinecap="round" stroke-linejoin="round"></path> </g> </g></svg> */}
			<div className='w-full flex justify-around space-x-4'>
				<img width="96" height="96" src="https://img.icons8.com/ink/96/person-male.png" alt="person-male" className='bg-neutral rounded-full highlight-white' />
				<div className='flex flex-col justify-center text-left'>
					<h1 className='text-xl font-semibold'>Hey, {user.fname}</h1>
					<h2 className='text-md text-txt-depressed'>Have a look at your Your personal Finance</h2>
				</div>
			</div>
			<div className='w-full p-2 rounded-lg highlight-white'>
				<p className='font-semibold'>Your Monthly status</p>
				<div className='w-full flex justify-between items-center'>
					<div className='w-1/2 text-left'>
						<p>
							<span className='inline-block p-1 m-1 rounded-full bg-neutral highlight-white'></span>
							<span>Income: </span>
							<span className='text-txt-depressed'>{totalTransaction.income}</span>
						</p>
						<p>
							<span className='inline-block p-1 m-1 rounded-full bg-teal-500 highlight-white'></span>
							<span>Expense: </span>
							<span className='text-txt-depressed'>{totalTransaction.expense}</span>
						</p>
						<p>
							<span className='inline-block p-1 m-1 rounded-full bg-lime-500 highlight-white'></span>
							<span>Investment: </span>
							<span className='text-txt-depressed'>{totalTransaction.investment}</span>
						</p>
					</div>
					<div className='w-1/2 h-40 p-4'>
						<ProgressBarCircular data={totalTransaction} />
					</div>
				</div>
				{
					savings === 0 ?
						<p className='text-txt-depressed text-sm'>Your wallet looks empty this month...</p>
						: savings > 0 ?
							<p className='text-light-green text-sm'>You are saving {savings} this month</p>
							: <p className='text-light-red text-sm'>You are spending {Math.abs(savings)} more than income this month</p>
				}
			</div>
			<div className='w-full p-2 rounded-lg highlight-white'>
				<p className='font-semibold'>You mostly spent in:</p>
				{
					transactionsByCategory.length === 0 && <p className='text-txt-depressed text-sm'>Add some transactions to see stats...</p>
				}
				<div className='flex space-x-2 justify-between pt-4'>
					<div className='w-1/3 flex flex-col justify-between text-sm text-left'>
						{
							transactionsByCategory && transactionsByCategory.map((transaction, index) => (
								<p key={index}>{index + 1}. {transaction[0]}</p>
							))
						}
						{/* <p>1. Food</p>
						<p>2. Education</p>
					<p>3. Travel</p> */}
					</div>
					<div className='w-2/3 flex flex-col justify-between'>
						{
							transactionsByCategory && transactionsByCategory.map((transaction, index) => (
								<ProgressBarSmall key={index} percentage={(transaction[1] / totalTransaction.expense * 100).toFixed(1)} />
							))
						}
						{/* <ProgressBarSmall percentage={60} />
						<ProgressBarSmall percentage={45} />
						<ProgressBarSmall percentage={20} /> */}
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProfileCard
