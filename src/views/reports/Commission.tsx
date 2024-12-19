// Commission.jsx
import React, { useEffect, useState } from 'react'
import { getData } from '@/services/axios/axiosUtils'
import { useAuth } from '@/auth'
import useIsAdmin from '../../hooks/useIsAdmin'
import CommissionTable from '../EcommerceDashboard/components/CommissionTable'
import Loading from '@/components/shared/Loading'
import TableSkeleton from '@/components/ui/TableSkeleton'

const Commission = () => {
    const { user } = useAuth()
    const isAdmin = useIsAdmin()
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState([])

    useEffect(() => {
        setIsLoading(true)
        getData(
            isAdmin
                ? 'commissions'
                : `commissions/consultant/${user?.userId}/completed-deals-with-details`,
        )
            .then((response) => {
                setIsLoading(false)
                const fetchedData = isAdmin
                    ? response
                    : response?.totalCompletedDeals

                const filteredData = fetchedData.filter(
                    (item) => item.commissionType === 'Direct',
                )

                // Set the filtered data to the state
                setData(filteredData)
            })
            .catch((err) => {
                setIsLoading(false)
                console.log(err)
            })
    }, [user, isAdmin])

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-gray-300 pb-2">
                Total Commissions
            </h2>
            {isLoading ? (
                <TableSkeleton rows={5} columns={9} />
            ) : data?.length === 0 ? (
                <p className="text-gray-500 text-center">
                    Commission Not Available.
                </p>
            ) : (
                <CommissionTable data={data} />
            )}
        </div>
    )
}

export default Commission
