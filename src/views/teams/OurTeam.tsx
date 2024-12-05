import React, { useState } from 'react'
import DownlineMembersTable from '../EcommerceDashboard/components/DownlineMembersTable'
import profileImage from '../../../public/images/logo/android-chrome-192x192.png'
import TeamsForm from '@/components/forms/TeamsForm'

const OurTeam = () => {
    const treeViewData = [
        {
            id: 1,
            profile: profileImage,
            tittle: 'INF00123',
            name: 'Sagar Uphade',
            level: '1',
        },
        {
            id: 2,
            profile: profileImage,
            tittle: 'INF00123',
            name: 'Sagar Uphade',
            level: '2',
        },
        {
            id: 3,
            profile: profileImage,
            tittle: 'INF00123',
            name: 'Sagar Uphade',
            level: '3',
        },
        {
            id: 4,
            profile: profileImage,
            tittle: 'INF00123',
            name: 'Sagar Uphade',
            level: '2',
        },
        {
            id: 5,
            profile: profileImage,
            tittle: 'INF00123',
            name: 'Sagar Uphade',
            level: '2',
        },
        {
            id: 6,
            profile: profileImage,
            tittle: 'INF00123',
            name: 'Sagar Uphade',
            level: '2',
        },
        {
            id: 7,
            profile: profileImage,
            tittle: 'INF00123',
            name: 'Sagar Uphade',
            level: '1',
        },
        {
            id: 8,
            profile: profileImage,
            tittle: 'INF00123',
            name: 'Sagar Uphade',
            level: '1',
        },
        {
            id: 9,
            profile: profileImage,
            tittle: 'INF00123',
            name: 'Sagar Uphade',
            level: '1',
        },
        {
            id: 10,
            profile: profileImage,
            tittle: 'INF00123',
            name: 'Sagar Uphade',
            level: '3',
        },
    ]

    const headerConfig = {
        title: 'Downline Members',
        buttonText: 'Create New Team',
        buttonAction: () => {
            handleToggleModel()
        },
        placeholderText: 'Search your Teams',
        onchangeAction: () => {
            console.log('Navigate to details')
        },
    }

    const [openModel, setOpenModel] = useState(false)
    const handleToggleModel = () => {
        setOpenModel(!openModel)
    }
    return (
        <>
            <div>
                <DownlineMembersTable
                    data={treeViewData}
                    headerConfig={headerConfig}
                />
                {openModel && <TeamsForm onClose={handleToggleModel} />}
            </div>
        </>
    )
}

export default OurTeam
