import React from 'react'
import DownlineMembersTable from '../EcommerceDashboard/components/DownlineMembersTable'
import profileImage from '../../../public/images/logo/android-chrome-192x192.png'
import { TbBinaryTree } from 'react-icons/tb'

const DownlineMembers = () => {
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
    return (
        <div>
            <DownlineMembersTable data={treeViewData} />
        </div>
    )
}

export default DownlineMembers
