import { useAuth } from '@/auth'
import { BASE_API_URL, HEADER_TOKEN } from '@/constants/app.constant'
import { getData } from '@/services/axios/axiosUtils'
import axios from 'axios'
import React, { useEffect } from 'react'

export default function Candidates() {

    const { user } = useAuth();

    const getCandidates = () => {

        getData('candidateProfile').then(data => {
            let users = data.filter(e => e?.refferralId == user?.userId)
        }
        ).catch(error => console.log(error))
    }
    useEffect(() => {
        getCandidates();
    }, [])

    return (
        <div>Candidates</div>
    )
}
