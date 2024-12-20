import React, { useEffect, useState } from 'react'
import Timeline from '@/components/ui/Timeline'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
import { getData, postData } from '@/services/axios/axiosUtils'
import { useAuth } from '@/auth'
import { useLocation } from 'react-router-dom'
import { Button, Card, Input } from '@/components/ui'
import { useParams } from 'react-router-dom'
import ModalInternalScroll from '@/components/ui/modal/ModalInternalScroll'
import toast from 'react-hot-toast'

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
}

const ActivityLogPage: React.FC<ActivityLogProps> = () => {
    const [activities, setActivities] = useState<Activity[]>([])
    const [candidates, setCandidates] = useState<Candidates[]>([])
    const [openModal, setOpenModal] = useState(false)

    const { user } = useAuth()
    const location = useLocation();

    console.log(location.pathname, location?.state,)

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
        'Connected': 'bg-green-500 text-white',
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

    const handleGetAllUserActivitylog = async (candidateId: number) => {
        const responseData = await getData(
            `activitylogcandidate/candidate/${candidateId}`,
        )
        const logs = responseData.logs.reverse()
        setActivities([...logs])
    }

    useEffect(() => {
        setSelectedCand(location?.state);
    }, [location])

    useEffect(() => {
        if (selectedCand) {
            handleGetAllUserActivitylog(selectedCand?.docid)
        }
    }, [selectedCand])

    console.log('selected candidate', selectedCand)




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
        <Card>
            <div className="flex justify-between items-center p-3 mb-5">
                <h2 >Activity Log</h2>
                <Button
                    variant="solid"
                    size="sm"
                    onClick={() => setOpenModal(true)}
                >
                    Add Note
                </Button>
            </div>
            <div className="w-full mx-auto p-4">
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
                                                src={'https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-2409187029.jpg'}
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
                                            {/* <Badge
                                            stage={selectedCand?.pipelineStep}
                                            content={selectedCand?.pipelineStep}
                                            className="ml-4" // Margin added to the left of the badge
                                        /> */}
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
            {/* Modal for Inquiry Details */}
            <DataModal
                user={user}
                cand={selectedCand}
                openModal={openModal}
                setOpenModal={setOpenModal}
                getAllLogs={handleGetAllUserActivitylog}
            />
        </Card>

    )
}


interface DataModalProps {
    openModal: boolean
    setOpenModal: (open: boolean) => void
    user: any
    cand: any
    getAllLogs?: any
}

const DataModal = ({ user, cand, openModal, setOpenModal, getAllLogs }) => {
    const [noteObj, setNoteObj] = useState<any>({
        userId: user?.userId,
        dealStageId: cand?.dealStageId,
        candidateId: cand?.docid,
        description: '',
        actionType: '',
        ipAddress: "",
        browserInfo: window.location.href,
        requestUrl: "",
        module: "",
    })

    const addData = (key: string, val: string) => {
        setNoteObj({ ...noteObj, [key]: val })
    }

    useEffect(() => {
        let obj = {
            userId: user?.userId,
            dealStageId: cand?.dealStageId,
            candidateId: cand?.docid,
            description: '',
            actionType: '',
            ipAddress: "",
            browserInfo: window.location.href,
            requestUrl: "",
            module: "",
        }
        setNoteObj(obj)
    }, [cand])

    const handleAddNote = () => {
        postData('ActivityLogCandidate', noteObj).then((data) => {
            console.log(data, "Data")
            setOpenModal(false)
            toast.success('Note added successfully');
            getAllLogs(noteObj.candidateId)
        }).catch((err) => console.log(err, "Error"))
    }


    console.log('in modal', cand, noteObj)
    return (
        <ModalInternalScroll open={openModal} setOpen={setOpenModal} width={800}>
            <div className="bg-white rounded-lg shadow-lg p-2 md:p-6  mx-auto w-full">

                <h4 className='mb-1'>Add Note</h4>
                <div className="space-y-2">
                    {/* Text Input */}
                    <Input
                        placeholder="Enter Subject"
                        className="w-full border border-gray-300 rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        onChange={(e) => addData('actionType', e.target.value)}
                    />

                    {/* Text Area */}
                    <textarea
                        onChange={(e) => addData('description', e.target.value)}
                        placeholder="Enter Detailed Note Here..."
                        rows={7}
                        className="w-full border border-gray-300 rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>

                    {/* Buttons */}
                    <div className="flex justify-start space-x-4">
                        <Button
                            variant="plain"
                            className="px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100"
                            onClick={() => setOpenModal(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleAddNote}
                            variant="solid"
                            className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                        >
                            Add Note
                        </Button>
                    </div>
                </div>
            </div>
        </ModalInternalScroll>
    )
}

export default ActivityLogPage


