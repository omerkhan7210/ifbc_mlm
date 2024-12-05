import React, { useState } from 'react'
import DownlineMembersTable from '../views/EcommerceDashboard/components/DownlineMembersTable'
import profileImage from '../../public/images/logo/android-chrome-192x192.png'
import EmailModel from '../components/forms/EmailModel'

const Mailbox = () => {
    const treeViewData = [
        {
            id: 1,
            profile: profileImage,
            tittle: 'INF00123',
            name: 'Sagar uphade',
            level: '1',
        },
        {
            id: 2,
            profile: profileImage,
            tittle: 'INF00123',
            name: 'Sagar uphade',
            level: '2',
        },
        {
            id: 3,
            profile: profileImage,
            tittle: 'INF00123',
            name: 'Sagar uphade',
            level: '3',
        },
        {
            id: 4,
            profile: profileImage,
            tittle: 'INF00123',
            name: 'Sagar uphade',
            level: '2',
        },
        {
            id: 5,
            profile: profileImage,
            tittle: 'INF00123',
            name: 'Sagar uphade',
            level: '2',
        },
        {
            id: 6,
            profile: profileImage,
            tittle: 'INF00123',
            name: 'Sagar uphade',
            level: '2',
        },
        {
            id: 7,
            profile: profileImage,
            tittle: 'INF00123',
            name: 'Sagar uphade',
            level: '1',
        },
        {
            id: 8,
            profile: profileImage,
            tittle: 'INF00123',
            name: 'Sagar uphade',
            level: '1',
        },
        {
            id: 9,
            profile: profileImage,
            tittle: 'INF00123',
            name: 'Sagar uphade',
            level: '1',
        },
        {
            id: 10,
            profile: profileImage,
            tittle: 'INF00123',
            name: 'Sagar uphade',
            level: '3',
        },
    ]
    const [showEmailModel, setShowEmailModel] = useState<boolean>(false)

    const headerConfig = {
        title: 'Inbox',
        buttonText: 'New email',
        placeholderText: 'Search User',
        buttonAction: () => {
            setShowEmailModel(true)
            console.log('Navigate to details')
        },
        onchangeAction: () => {
            console.log('Onchange details')
        },
    }

    return (
        <div>
            {showEmailModel && (
                <EmailModel onClose={() => setShowEmailModel(false)} />
            )}

            <DownlineMembersTable
                data={treeViewData}
                headerConfig={headerConfig}
            />
        </div>
    )
}

export default Mailbox
