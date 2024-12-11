import { useAuth } from '@/auth'
import { BASE_API_URL, HEADER_TOKEN } from '@/constants/app.constant'
import { getData } from '@/services/axios/axiosUtils'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CandidateListGrid from './CandidateListGrid'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

export default function Candidates() {
    const { user, isAdmin } = useAuth()
    const [cands, setCands] = useState()
    const [completeData, setCompleteData] = useState([])

    const getCandidates = async () => {
        if (isAdmin) {
            const data = await getData('candidateProfile')
            setCands(data)
        } else {
            const data = await getData(
                `candidateProfile/referral/${user?.userId}`,
            )
            const candidates = data?.map((d: any) => d.candidate)
            setCands(candidates)
            setCompleteData(data)
        }
    }
    useEffect(() => {
        getCandidates()
    }, [])

    return (
        <div>
            <DndProvider backend={HTML5Backend}>
                <CandidateListGrid cands={cands} completeData={completeData} />
            </DndProvider>
        </div>
    )
}
