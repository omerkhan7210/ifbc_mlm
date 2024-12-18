import React, { useEffect, useState } from 'react'
import DownlineMembersTable from '../EcommerceDashboard/components/DownlineMembersTable'
import profileImage from '../../../public/images/logo/android-chrome-192x192.png'
import { getData } from '@/services/axios/axiosUtils'
import { useAuth } from '@/auth'

const DownlineMembers = () => {
    const { user } = useAuth()
    const [apiData, setApiData] = useState([])
    const [allBulkEmailName, setAllBulkEmailName] = useState([])

    const handleData = () => {
        getData(`consultants/getconsultanthierarchy/${user?.userId}`)
            .then((data) => {
                console.log(data, 'data')
                const cleanedData = {
                    ...data,
                    firstName: data.firstName.trim(),
                    lastName: data.lastName.trim(),
                    subConsultants: data.subConsultants.map((sub) => ({
                        ...sub,
                        firstName: sub.firstName.trim(),
                        lastName: sub.lastName.trim(),
                    })),
                }
                setApiData([cleanedData])
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        handleData()
    }, [])

    const handleGetValue = (val) => {
        setAllBulkEmailName(val)
    }
    const headerConfig = {
        title: 'Downline Members',
        buttonText: 'View Details',
        buttonAction: () => {
            console.log('Navigate to details')
        },
        placeholderText: 'Search your Teams',
        onchangeAction: () => {
            console.log('Navigate to details')
        },
    }
    return (
        <div>
            <DownlineMembersTable
                data={apiData}
                headerConfig={headerConfig}
                handleGetValue={handleGetValue}
            />
        </div>
    )
}

export default DownlineMembers
