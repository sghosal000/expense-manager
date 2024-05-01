import React, { useState } from 'react';
import DashboardTab from '../components/tabs/DashboardTab';
import TransactionsTab from '../components/tabs/TransactionsTab';
import BudgetTab from '../components/tabs/BudgetTab';
import RecurringTab from '../components/tabs/RecurringTab';


const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('Dashboard');

    const tabs = [
        { name: 'Dashboard', link: '#' },
        { name: 'Income', link: '#' },
        { name: 'Expense', link: '#' },
        { name: 'Investment', link: '#' },
        { name: 'Budget', link: '#' },
        { name: 'Recurring', link: '#' },
    ]

    const render = (activeTab) => {
        switch (activeTab) {
            case tabs[0].name:
                return <DashboardTab />;
            case tabs[1].name:
                return <TransactionsTab type={income} />;
            case tabs[2].name:
                return <TransactionsTab type={expense} />;
            case tabs[3].name:
                return <TransactionsTab type={investment} />;
            case tabs[4].name:
                return <BudgetTab />;
            case tabs[5].name:
                return <RecurringTab />;
            default:
                return null;
        }
    }

    return (
        <div className="flex flex-col items-center w-full min-h-screen bg-background text-txt">
            <nav className="fixed top-20 bg-base w-2/3 border border-neutral rounded-full shadow-lg px-2">
                <ul className="flex my-auto justify-between text-lg text-center">
                    {tabs.map((tab) => (
                        <li
                            key={tab.name}
                            className={`relative w-1/6 my-3 content-center cursor-pointer transition-all
                                ${activeTab === tab.name ? "my-1 py-2 rounded-full font-bold text-lg shadow-lg bg-slate-600 text-sky-300" : "hover:text-txt-depressed"}
                                ${tab.name !== tabs[0].name && tab.name !== tabs[tabs.length - 1].name ? "border-x border-neutral" : ""} `}
                            onClick={() => setActiveTab(tab.name)}
                        >
                            {tab.name}
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="mt-40">
                {render(activeTab)}
            </div>
        </div>
    )
}

export default Dashboard;
