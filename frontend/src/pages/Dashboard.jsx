import React, { useEffect } from 'react';
import TabNavigation from '../components/TabNavigation';
import DashboardTab from '../components/tabs/DashboardTab';
import TransactionsTab from '../components/tabs/TransactionsTab';
import BudgetTab from '../components/tabs/BudgetTab';
import RecurringTab from '../components/tabs/RecurringTab';

import { useData } from '../contexts/DataContext';
import useRefreshToken from '../hooks/useRefreshToken';


const Dashboard = () => {
    const { activeTab } = useData()
    // const refresh = useRefreshToken()
    // useEffect(() => {
    //     refresh()
    // }, [activeTab])

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
                return <DashboardTab/>;
            case tabs[1].name:
                return <TransactionsTab type={"income"} />;
            case tabs[2].name:
                return <TransactionsTab type={"expense"} />;
            case tabs[3].name:
                return <TransactionsTab type={"investment"} />;
            case tabs[4].name:
                return <BudgetTab/>;
            case tabs[5].name:
                return <RecurringTab/>;
            default:
                return null;
        }
    }

    return (
        <div className="flex flex-col items-center gap-y-2 py-4 background text-txt">
            <TabNavigation tabs={tabs} />
            <div className="w-5/6 md:w-4/5 text-center">
                {render(activeTab)}
            </div>
        </div>
    )
}

export default Dashboard;
