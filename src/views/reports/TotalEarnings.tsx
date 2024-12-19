import React, { useEffect, useState } from 'react'
import { getData } from '@/services/axios/axiosUtils'
import { useAuth } from '@/auth'
import useIsAdmin from '../../hooks/useIsAdmin'
import CommissionTable from '../EcommerceDashboard/components/CommissionTable'
import TableSkeleton from '@/components/ui/TableSkeleton'

const TotalEarnings = () => {
    const { user } = useAuth()
    const isAdmin = useIsAdmin()
    const [isLoading, setIsLoading] = useState(false)
    const [totalEarnings, setTotalEarnings] = useState([])

    useEffect(() => {
        setIsLoading(true)
        getData(
            isAdmin
                ? 'commissions'
                : `commissions/consultant/${user?.userId}/completed-deals-with-details`,
        )
            .then((response) => {
                console.log(response, 'response')
                setIsLoading(false)
                const fetchedData = isAdmin
                    ? response
                    : response?.totalCompletedDeals

                // Set the filtered data to the state
                setTotalEarnings(fetchedData)
            })
            .catch((err) => {
                setIsLoading(false)
                console.log(err)
            })
    }, [user, isAdmin])

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-gray-300 pb-2">
                Total Earnings
            </h2>

            {isLoading ? (
                <TableSkeleton />
            ) : totalEarnings.length === 0 ? (
                <p className="text-gray-500 text-center">
                    Total Earnings Not Available.
                </p>
            ) : (
                <CommissionTable totalEarnings={totalEarnings} />
            )}
        </div>
    )
}

export default TotalEarnings
