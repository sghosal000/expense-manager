import React, { useState, useEffect } from 'react'
import useAuthService from '../../apiservice/useAuthService'
import useTransactionService from '../../apiservice/useTransactionService'
import LoadingDashboard from "../loading/LoadingDashboard"
import ProfileCard from '../ProfileCard'
import TransactionsTable from '../tables/TransactionsTable'

import { useData } from '../../contexts/DataContext'


const DashboardTab = () => {
    const { getDetails } = useAuthService()
    const { activeTab, trigger } = useData()
    const transactionService = useTransactionService()

    const [user, setUser] = useState({})
    const [transactions, setTransactions] = useState([])
	const [transactionsMonth, setTransactionsMonth] = useState({})
    const [totalTransaction, setTotalTransaction] = useState({})
    const [transactionsByCategory, setTransactionsByCategory] = useState({})

    const [loading, setLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')

    const fetchData = async () => {
        setLoading(true)

        try {
            const resUser = await getDetails()
            const resTransaction = await transactionService.getTransactions("")
            const resTransactionsForMonth = await transactionService.getTransactionsForMonth("income", "")
            const resTotalTransaction = await transactionService.getTotalTransactionsForMonth("")
            const resTransactionsByCategory = await transactionService.getTransactionsCategoryWise("expense", "")

            if (!resUser.status) {
                throw error(resUser.error)
            }
            if (!resTransaction.status) {
                throw error(resTransaction.error)
            }
			if(!resTransactionsForMonth.status){
				throw error(resTransactionsForMonth.error)
			}
            if(!resTotalTransaction.status){
                throw error(resTotalTransaction.error)
            }
            if(!resTransactionsByCategory.status){
                throw error(resTransactionsByCategory.error)
            }

            setUser(resUser.data.userData)
            setTransactions(resTransaction.data.transactions)
			setTransactionsMonth(resTransactionsForMonth.data.dailyTransactions)
            setTotalTransaction(resTotalTransaction.data.totalOfMonth)
            setTransactionsByCategory(resTransactionsByCategory.data.transactionsByCategory)
            setErrorMessage(null)
        } catch (error) {
            console.error(error)
            setErrorMessage("Error Loading Data. Please try again later...")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [activeTab, trigger])

    if (loading) {
        return <LoadingDashboard />
    }

    if (errorMessage) {
        return (
            <p className="text-xl text-txt-depressed">{errorMessage}</p>
        )
    }

    return (
        <div className='flex flex-col space-y-2'>
            <div className="flex flex-col space-y-2 md:flex-row md:space-x-6">
                <div className='w-full md:w-1/3'>
                    <ProfileCard user={user} totalTransaction={totalTransaction} transactionsByCategory={Object.entries(transactionsByCategory).slice(0, 5)} />
                </div>
                <div className="-full h-full md:w-2/3 md:text-xs">
                    <TransactionsTable data={transactions} />
                </div>
            </div>
        </div>
    )
}

export default DashboardTab