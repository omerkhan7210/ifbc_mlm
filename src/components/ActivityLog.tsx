import React from 'react'
import Timeline from '@/components/ui/Timeline'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
import Card from '@/components/ui/Card'
import { getData } from '@/services/axios/axiosUtils'

// Types for Activity and ActivityDetail
interface ActivityDetails {
    message: string
    additionalInfo: string | null
    media: string | null
}

interface Activity {
    consultantId: string
    consultantName: string
    subConsultantId: string | null
    subConsultantName: string | null
    franchiseName: string
    stage: string
    timestamp: string
    details: ActivityDetails
}

interface ActivityLogProps {
    activities: Activity[]
}

const ActivityLog: React.FC<ActivityLogProps> = ({ activities }) => {
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
        Connected: 'bg-green-500 text-white',
        'Initial Call Attempt': 'bg-yellow-500 text-white',
        'Closed Won': 'bg-emerald-500 text-white',
        'Closed Lost': 'bg-red-500 text-white',
        'On Hold': 'bg-gray-500 text-white',
    }

    getData('/activitylogcandidate')
        .then((data) => console.log('User list:', data))
        .catch((error) => console.error('Error fetching users:', error))

    return (
        <div className="max-w-[700px] mx-auto p-4">
            <Timeline>
                {activities.map((activity, index) => (
                    <Timeline.Item
                        key={index}
                        media={
                            <Avatar
                                src={activity.details.media || undefined}
                                size={40}
                                shape="circle"
                                className="bg-gray-200 text-gray-800"
                            >
                                {activity.consultantName[0]}
                            </Avatar>
                        }
                    >
                        <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-200">
                            <div className="flex items-center mb-2">
                                <span className="text-lg font-semibold text-gray-900">
                                    {activity.consultantName}
                                </span>
                                {activity.subConsultantName && (
                                    <span className="ml-2 text-gray-600">
                                        with{' '}
                                        <span className="font-semibold">
                                            {activity.subConsultantName}
                                        </span>
                                    </span>
                                )}
                                <Badge
                                    stage={activity.stage}
                                    content={activity.stage}
                                    className="ml-4" // Margin added to the left of the badge
                                />
                            </div>
                            <div className="text-sm text-gray-600 mb-2">
                                <strong>Franchise: </strong>
                                {activity.franchiseName}
                            </div>
                            <p className="text-gray-700">
                                {activity.details.message}
                            </p>
                            {activity.details.additionalInfo && (
                                <Card className="mt-3 p-2 bg-gray-50 border border-gray-200 text-gray-600 text-sm">
                                    {activity.details.additionalInfo}
                                </Card>
                            )}
                            <span className="block mt-2 text-sm text-gray-500">
                                {formatDatePST(activity.timestamp)}
                            </span>
                        </div>
                    </Timeline.Item>
                ))}
            </Timeline>
        </div>
    )
}

export default ActivityLog
