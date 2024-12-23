import React, { useContext, useState } from 'react'
import DownlineMembersTable from '../views/EcommerceDashboard/components/DownlineMembersTable'
import profileImage from '../../public/images/logo/android-chrome-192x192.png'
import EmailModel from '../components/forms/EmailModel'
import InvitationEmail from '../components/forms/InvitationEmail'
import toast from 'react-hot-toast'
import AuthContext from '@/auth/AuthContext'
import { useUsersStore } from '@/store/authStore'

type BulkEmailNameType = Array<{
    docId: number
    email: string
    firstName: string
    lastName: string
}>

const Mailbox = () => {
    const users = useUsersStore((state) => state.users)
    // const filteredCandidates = [
    //     {
    //         additionalEmail: '',
    //         additionalFirstName: '',
    //         additionalLastName: '',
    //         additionalPhone: '',
    //         additionalRelationship: '',
    //         agentUserId: 8,
    //         currentCity: 'amherst junction',
    //         currentState: 'wisconsin',
    //         currentZipcode: '12345-rtr',
    //         docDate: '2024-12-06T13:55:56.327',
    //         docid: 429,
    //         email: 'odoobasit+test023@gmail.com',
    //         firstName: 'abid',
    //         franchiseInterested: '[9]',
    //         isArchive: false,
    //         isCompleted: true,
    //         isDeleted: false,
    //         lastName: 'shan',
    //         lostReason: 'string',
    //         phone: '03172555927',
    //         pipelineStep: 'Closed Won',
    //         refEmail: 'odoobasit@gmail.com',
    //         refName: 'Syed Basit  Mehdi ',
    //         refPhone: '03338286467',
    //         refferralId: 8,
    //         status: '',
    //         territoryCity: 'anamoose',
    //         territoryState: 'north dakota',
    //         territoryZipcode: '12345',
    //         updateDt: '2024-12-06T13:55:56.327',
    //     },
    //     {
    //         docid: 427,
    //         agentUserId: 8,
    //         docDate: '2024-12-05T23:46:00.74',
    //         firstName: 'qamar',
    //         lastName: 'uddin',
    //         email: 'example2@gmail.com',
    //         phone: '03212223344',
    //         pipelineStep: 'Negotiation',
    //         status: '',
    //         territoryCity: 'anamoose',
    //         territoryState: 'north dakota',
    //         territoryZipcode: '12345',
    //         updateDt: '2024-12-06T13:55:56.327',
    //     },
    //     {
    //         docid: 405,
    //         agentUserId: 8,
    //         docDate: '2024-11-25T12:45:45.31',
    //         firstName: 'syed',
    //         lastName: 'basit',
    //         email: 'example3@gmail.com',
    //         phone: '03001234567',
    //         pipelineStep: 'Prospecting',
    //         status: '',
    //         territoryCity: 'anamoose',
    //         territoryState: 'north dakota',
    //         territoryZipcode: '12345',
    //         updateDt: '2024-12-06T13:55:56.327',
    //     },
    //     {
    //         docid: 398,
    //         agentUserId: 8,
    //         docDate: '2024-11-20T10:30:15.12',
    //         firstName: 'john',
    //         lastName: 'doe',
    //         email: 'example4@gmail.com',
    //         phone: '03331234567',
    //         pipelineStep: 'Contact Made',
    //         status: '',
    //         territoryCity: 'anamoose',
    //         territoryState: 'north dakota',
    //         territoryZipcode: '12345',
    //         updateDt: '2024-12-06T13:55:56.327',
    //     },
    // ]
    console.log(users, 'users')
    const [showEmailModel, setShowEmailModel] = useState<boolean>(false)
    const [showInvitation, setShowInvitation] = useState<boolean>(false)
    const [allBulkEmailName, setAllBulkEmailName] = useState<BulkEmailNameType>(
        [],
    )
    // if (allBulkEmailName?.length > 2) {
    //     toast.error(
    //         'You can select a maximum of 10 email addresses in one time.',
    //     )
    // }
    const headerConfig = {
        title: 'Inbox',
        buttonText: 'New email',
        placeholderText: 'Search User',
        buttonAction: (actionType: string) => {
            if (actionType === 'newEmail' && allBulkEmailName.length <= 10) {
                setShowEmailModel(true)
            } else if (actionType === 'invitation') {
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
        <div>
            {showEmailModel && (
                <EmailModel
                    onClose={() => setShowEmailModel(false)}
                    allBulkEmailName={allBulkEmailName}
                />
            )}
            {showInvitation && (
                <InvitationEmail
                    onClose={() => setShowInvitation(false)}
                    allBulkEmailName={allBulkEmailName}
                />
            )}

            <DownlineMembersTable
                // data={filteredCandidates}
                data={users}
                headerConfig={headerConfig}
                handleGetValue={handleGetValue}
            />
        </div>
    )
}

export default Mailbox
