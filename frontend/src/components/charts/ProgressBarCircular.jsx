import React from 'react';

const ProgressBarCircular = ({ data }) => {
    // Calculate percentages
    // const income = 100
    // const expense = 45
    // const investment = 20
    const { income, expense, investment } = data
    const expensePercentage = parseFloat(((expense / income) * 100).toFixed(1)) || 0
    const investmentPercentage = parseFloat(((investment / income) * 100).toFixed(1)) || 0

    const width = 150
    const radius = 70;
    const circumference = 2 * Math.PI * radius;

    const expenseOffset = circumference - (expensePercentage / 100) * circumference;
    const investmentOffset = circumference - ((investmentPercentage + expensePercentage) / 100) * circumference;

    return (
        <div className="relative flex items-center justify-center w-full h-full">
            <svg className="absolute transform rotate-[-90deg] drop-shadow-2xl" width="100%" height="100%" viewBox={`0 0 ${width} ${width}`}>
                {/* Background circle */}
                <circle
                    cx={width / 2}
                    cy={width / 2}
                    r={radius}
                    className='fill-none stroke-neutral stroke-2'
                />
                <circle
                    cx={width / 2}
                    cy={width / 2}
                    r={radius}
                    strokeDasharray={circumference}
                    strokeDashoffset={investmentOffset}
                    strokeWidth='5'
                    className='fill-none stroke-lime-500'
                    strokeLinecap='round'
                    />
                <circle
                    cx={width / 2}
                    cy={width / 2}
                    r={radius}
                    strokeDasharray={circumference}
                    strokeDashoffset={expenseOffset}
                    strokeWidth='5'
                    className='fill-none stroke-teal-500'
                    strokeLinecap='round'
                />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-xs">
                <p>
                    <span className="text-txt">Expense: </span>
                    <span className="text-txt-depressed">{expensePercentage}%</span>
                </p>
                <p>
                    <span className="text-txt">Invest: </span>
                    <span className="text-txt-depressed">{investmentPercentage}%</span>
                </p>
            </div>
        </div>
    );
};

export default ProgressBarCircular
