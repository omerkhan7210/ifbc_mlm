// Commission.jsx
import React, { useEffect, useState } from 'react'
import { getData } from '@/services/axios/axiosUtils'
import { useAuth } from '@/auth'
import useIsAdmin from '../../hooks/useIsAdmin'
import CommissionTable from '../EcommerceDashboard/components/CommissionTable'

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
                    (item) => item.commissionType === 'Child',
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
            <h2>Child Commissions</h2>
            {isLoading ? <p>Loading...</p> : <CommissionTable data={data} />}
        </div>
    )
}

export default Commission
