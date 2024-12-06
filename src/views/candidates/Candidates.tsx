import { useAuth } from '@/auth'
import { BASE_API_URL, HEADER_TOKEN } from '@/constants/app.constant'
import { getData } from '@/services/axios/axiosUtils'
import axios from 'axios'
import React, { useEffect } from 'react'
import CandidateListGrid from './CandidateListGrid'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

export default function Candidates() {
    const { user } = useAuth()

    const getCandidates = () => {
        getData('candidateProfile')
            .then((data) => {
                let users = data.filter((e) => e?.refferralId == user?.userId)
                console.log(users, 'users')
            })
            .catch((error) => console.log(error))
    }
    useEffect(() => {
        getCandidates()
    }, [])

    return (
        <div>
            <DndProvider backend={HTML5Backend}>
                <CandidateListGrid />
            </DndProvider>
        </div>
    )
}
