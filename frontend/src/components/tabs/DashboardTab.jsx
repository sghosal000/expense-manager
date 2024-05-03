import React, { useState, useEffect } from 'react'
import transactionService from '../../apiservice/TransactionService'
import budgetService from '../../apiservice/budgetService'
import LoadingDashboard from "../loading/LoadingDashboard"

const DashboardTab = () => {
    const [transactions, setTransactions] = useState([])
    const [budgets, setBudgets] = useState([])
    const [loading, setLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)

    const fetchData = async () => {
        setLoading(true)

        try {
            const transactions = await transactionService.getAllTransactions()
            const budgets = await budgetService.getBudgets()

            if(!transactions.status){
                throw error(transactions.error)
            }
            if(!budgets.status){
                throw error(budgets.error)
            }
            setTransactions(transactions)
            setBudgets(budgets)
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
    }, [])

    if (loading) {
        return <LoadingDashboard />
    }
    
    if (errorMessage) {
        return (
            <>
                <p className="text-xl text-txt-depressed">{errorMessage}</p>
            </>
        )
    }
    return <LoadingDashboard />
    // return (
    //     <div>DashboardTab</div>
    // )
}

export default DashboardTab