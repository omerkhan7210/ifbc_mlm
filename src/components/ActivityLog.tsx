import React, { useEffect, useState } from 'react'
import Timeline from '@/components/ui/Timeline'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
import Card from '@/components/ui/Card'
import { getData } from '@/services/axios/axiosUtils'
import { useAuth } from '@/auth'
import { pipe } from 'framer-motion'

interface Log {
    id: number
    userId: number
    candidateId: number
    description: string
    actionType: string
    docDate?: string
    browserInfo?: string
    ipAddress?: string
    module?: string
    requestUrl?: string
}
interface User {
    docId: number
    userId: number
    firstName: string
    lastName: string
    email: string
    profileImage: string
}
interface Listing {
    name: string
    docId: number
    category: string
    imgUrl: string
}

interface Activity {
    log: Log
    user: User
    listings: Listing[]
}

interface Candidates {
    docid: number
    firstName: string
    lastName: string
    email: string
    pipelineStep: string
}

interface ActivityLogProps {
    activities?: Activity[]
    id: string
}

const ActivityLog: React.FC<ActivityLogProps> = ({ id }) => {
    const [activities, setActivities] = useState<Activity[]>([])
    const [candidates, setCandidates] = useState<Candidates[]>([])
    const { user } = useAuth()
    const [selectedCand, setSelectedCand] = useState<Candidates | null>(null)
    // Format date to Pacific Standard Time
    const formatDatePST = (isoDate: string): string => {
        const options: Intl.DateTimeFormatOptions = {
            timeZone: 'America/Los_Angeles',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }
        return new Date(isoDate).toLocaleString('en-US', options)
    }

    const stageColors: { [key: string]: string } = {
        'New Deal': 'bg-blue-500 text-white',
        'Initial Call Attempt': 'bg-orange-500 text-white',
        Connected: 'bg-green-500 text-white',
        'Spoton/Candidate Research': 'bg-purple-500 text-white',
        'Research & Prep Presentation': 'bg-indigo-500 text-white',
        'Present Franchise Review': 'bg-teal-500 text-white',
        'Intro to Zor': 'bg-pink-500 text-white',
        'Franchise Due Diligence': 'bg-yellow-500 text-white',
        'Validation - FSO': 'bg-red-500 text-white',
        'Discovery Day/Award - FSO': 'bg-cyan-500 text-white',
        'Closed Won': 'bg-emerald-500 text-white',
        'Closed Lost': 'bg-gray-500 text-white',
        'On Hold': 'bg-brown-500 text-white',
    }

    const handleGetCandidates = async () => {
        const responseData = await getData(
            `candidateprofile/referral/${user?.userId}`,
        )
        const candidates = responseData.map((candidate: any) => ({
            docid: candidate.docid,
            firstName: candidate.firstName,
            lastName: candidate.lastName,
            email: candidate.email,
            pipelineStep:
                candidate.dealStages && candidate.dealStages.length > 0
                    ? candidate.dealStages[0]?.pipelineStep
                    : null,
        }))

        setCandidates(candidates)
    }

    useEffect(() => {
        handleGetCandidates()
    }, [])

    useEffect(() => {
        if (selectedCand) {
            handleGetAllUserActivitylog(selectedCand.docid)
        }
    }, [selectedCand])

    const handleGetAllUserActivitylog = async (candidateId: number) => {
        const responseData = await getData(
            `activitylogcandidate/candidate/${candidateId}`,
        )
        const logs = responseData.logs.reverse()
        setActivities([...logs])
    }

    useEffect(() => {
        handleGetAllUserActivitylog(parseInt(id))
        const selectedCandidate = candidates.find(
            (candidate) => candidate.docid === parseInt(id),
        )
        setSelectedCand(selectedCandidate)
    }, [id])

    console.log('passed id & logs', id, activities)

    // Map event types to icons
    const getEventIcon = (eventType) => {
        switch (eventType.toLowerCase()) {
            case 'insert':
                return <span className="text-green-500">✅</span>
            case 'update':
                return <span className="text-blue-500">✏️</span>
            case 'delete':
                return <span className="text-red-500">🗑️</span>
            case 'message':
                return <span className="text-yellow-500">💬</span>
            case 'call':
                return <span className="text-purple-500">📞</span>
            default:
                return <span className="text-gray-500">🔄</span>
        }
    }

    return (
        <div className="max-w-[700px] mx-auto p-4">
            <Timeline>
                {activities && activities.length > 0 ? (
                    activities.map((activity, index) => {
                        return (
                            <Timeline.Item
                                key={index}
                                media={
                                    <div className="bg-gray-200 rounded-full overflow-hidden w-10 h-10 flex items-center justify-center">
                                        <span className="text-gray-600">
                                            {getEventIcon(
                                                activity.log.actionType,
                                            )}
                                        </span>
                                    </div>
                                }
                            >
                                <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-200">
                                    <div className="flex items-center mb-2">
                                        <Avatar
                                            src={activity?.user?.profileImage}
                                            alt={activity?.user?.firstName}
                                            size="lg"
                                            className="mr-2"
                                        />

                                        <span className="text-base font-semibold text-gray-900">
                                            {activity?.user?.firstName}{' '}
                                            {activity?.user?.lastName}
                                        </span>
                                        {user?.firstName +
                                            ' ' +
                                            user?.lastName && (
                                            <span className="ml-2 text-gray-600">
                                                with{' '}
                                                <span className="font-semibold text-base capitalize text-gray-800">
                                                    {selectedCand?.firstName}{' '}
                                                    {selectedCand?.lastName}
                                                </span>
                                            </span>
                                        )}
                                        <Badge
                                            stage={selectedCand?.pipelineStep}
                                            content={selectedCand?.pipelineStep}
                                            className="ml-4" // Margin added to the left of the badge
                                        />
                                    </div>
                                    <div className="text-sm text-gray-600 mb-2">
                                        <strong>Franchise: </strong>
                                        {activity?.listings?.[0]?.name}
                                    </div>
                                    <div
                                        className="text-gray-700"
                                        dangerouslySetInnerHTML={{
                                            __html: activity.log.description
                                                .replace(/(\r\n|\n|\r)/gm, ' ')
                                                .replace(/\s\s+/g, ' ')
                                                .replace(/,/g, ''),
                                        }}
                                    />
                                    {/* {activity.details.additionalInfo && (
                            <Card className="mt-3 p-2 bg-gray-50 border border-gray-200 text-gray-600 text-sm">
                                {activity.details.additionalInfo}
                            </Card>
                        )} */}
                                    <span className="block mt-2 text-sm text-gray-500">
                                        {formatDatePST(activity.log.docDate)}
                                    </span>
                                </div>
                            </Timeline.Item>
                        )
                    })
                ) : (
                    <h5></h5>
                )}
            </Timeline>
        </div>
    )
}

export default ActivityLog
