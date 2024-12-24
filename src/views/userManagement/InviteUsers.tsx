import { useUsersStore } from '@/store/authStore'
import React, { useState } from 'react'
import DownlineMembersTable from '../EcommerceDashboard/components/DownlineMembersTable'
import InvitationEmail from '../../components/forms/InvitationEmail'

type BulkEmailNameType = Array<{
    docId: number
    email: string
    firstName: string
    lastName: string
}>

const InviteUsers = () => {
    const users = useUsersStore((state) => state.users)
    console.log(users, 'users')
    const [showInvitation, setShowInvitation] = useState<boolean>(false)
    const [invitationComponent, setInvitationComponent] = useState<string>(
        'InvitationComponent',
    )
    const [allBulkEmailName, setAllBulkEmailName] = useState<BulkEmailNameType>(
        [],
    )

    const headerConfig = {
        title: 'Inbox',
        buttonText: 'Send Invitation',
        placeholderText: 'Search User',
        buttonAction: (actionType: string) => {
            if (actionType === 'invitation') {
                setShowInvitation(true)
            }
        },
        onchangeAction: () => {
            console.log('Onchange details')
        },
    }
    const handleGetValue = (val) => {
        setAllBulkEmailName(val)
    }
    return (
        <>
            {showInvitation && (
                <InvitationEmail
                    onClose={() => setShowInvitation(false)}
                    allBulkEmailName={allBulkEmailName}
                />
            )}
            <DownlineMembersTable
                // data={filteredCandidates}
                data={users}
                invitationComponent={invitationComponent}
                setInvitationComponent={setInvitationComponent}
                headerConfig={headerConfig}
                handleGetValue={handleGetValue}
            />
        </>
    )
}

export default InviteUsers
