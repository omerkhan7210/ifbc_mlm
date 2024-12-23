import React, { act, useEffect, useState } from 'react'
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
import { FormatRawDate } from '../../utils/FormatRawDate.js'

interface CandidateDetails {
    firstName: string
    lastName: string
    email: string
    phone: string
    refferralId: number
    agentUserId: number
}

interface ListingDetails {
    name: string
    imgUrl: string
    category: string
}

interface DealStageDetails {
    docId: number
    candidateId: number
    listingId: number
    pipelineStep: string
    isApproved: boolean
    listing: any
    candidate: any
}

interface UserDetails {
    firstName: string
    lastName: string
    email: string
    phone: string
    profileImage: string
}

interface Log {
    id: number
    userId: number
    pipelineStep: string
    userDetails: UserDetails
    dealStageId: number
    candidateId: number
    description: string
    actionType: string
    localDocDate: string
    ipAddress: string
    browserInfo: string
    requestUrl: string
    module: string
}

interface Activity {
    candidateDetails: CandidateDetails
    listingDetails: ListingDetails
    dealStageDetails: DealStageDetails
    logs: Log
}

interface Candidates {
    docid: number
    firstName: string
    lastName: string
    email: string
    pipelineStep: string
    dealStageId: number
}

interface ActivityLogProps {
    activities?: Activity[]
}

const ActivityLogPage: React.FC<ActivityLogProps> = () => {
    const [activities, setActivities] = useState<Activity[]>([])
    const [openModal, setOpenModal] = useState(false)

    const { user } = useAuth()
    const location = useLocation();


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

    const handleGetAllUserActivitylog = async () => {
        const responseData = await getData(
            `activitylogcandidate/dealStageId/${selectedCand?.dealStageId}`,
            // `activitylogcandidate/dealStageId/${79}`,
        )
        const logs = responseData.reverse()
        setActivities([...logs])
    }

    console.log("All activities", activities)



    useEffect(() => {
        setSelectedCand(location?.state);
    }, [location])

    useEffect(() => {
        if (selectedCand) {
            handleGetAllUserActivitylog()
        }
    }, [selectedCand, location])


    // Map event types to icons
    const getEventIcon = (eventType) => {
        switch (eventType?.toLowerCase()) {
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

    const customStyles = {
        backgroundColor: "var(--primary)", // Use the CSS variable
    };

    return (
        <div>
            {/* <Card> */}
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
            </Card>
            <div className="w-full mx-auto p-4">
                <Timeline>
                    {activities && activities?.length > 0 ? (
                        activities.map((activity, index) => {
                            return (
                                <Timeline.Item
                                    key={index}
                                    media={
                                        <div className="bg-gray-200 rounded-full overflow-hidden w-10 h-10 flex items-center justify-center">
                                            <span className="text-gray-600">
                                                {getEventIcon(
                                                    activity?.logs?.actionType,
                                                )}
                                            </span>
                                        </div>
                                    }
                                >
                                    <div className=" bg-white rounded-lg shadow-sm border border-gray-200">
                                        <div className="p-2  rounded-t-lg text-white text-base md:text-xl font-semibold  text-center"
                                            style={{ backgroundColor: 'var(--primary)' }}
                                        >
                                            {activity?.logs?.actionType}

                                        </div>

                                        <div className="p-4">
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center">
                                                    <Avatar
                                                        src={'https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-2409187029.jpg'}
                                                        alt={activity?.logs?.userDetails?.firstName}
                                                        size="sm"
                                                        className="mr-2"
                                                    />
                                                    <div className='flex flex-col md:flex-row md:items-center md:gap-2'>
                                                        <div className="text-sm md:text-lg font-semibold text-gray-900">
                                                            {activity?.logs?.userDetails?.firstName}{' '}
                                                            {activity?.logs?.userDetails?.lastName}
                                                        </div>

                                                        <div className="text-gray-600 flex items-center gap-2">
                                                            with
                                                            <div className="font-semibold text-sm md:text-lg capitalize text-gray-800">
                                                                {activity?.candidateDetails?.firstName}{' '}
                                                                {activity?.candidateDetails?.lastName}
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div
                                                    className='max-md:hidden'
                                                >
                                                    {activity?.logs?.pipelineStep && <Badge
                                                        stage={activity?.logs?.pipelineStep ?? activity?.dealStageDetails?.pipelineStep}
                                                        content={activity?.logs?.pipelineStep ?? activity?.dealStageDetails?.pipelineStep}
                                                        className="ml-4" // Margin added to the left of the badge
                                                    />}
                                                </div>
                                            </div>
                                            <div
                                                className='mt-3 pr-3 flex justify-end md:hidden'
                                            >
                                                {activity?.logs?.pipelineStep && <Badge
                                                    stage={activity?.logs?.pipelineStep ?? activity?.dealStageDetails?.pipelineStep}
                                                    content={activity?.logs?.pipelineStep ?? activity?.dealStageDetails?.pipelineStep}
                                                    className="ml-4" // Margin added to the left of the badge
                                                />}
                                            </div>
                                            <div className='flex flex-col gap-1 my-4' >
                                                {/* <div className="text-sm text-gray-700">
                                                    <strong>Action Type: </strong>
                                                    {activity?.logs?.actionType}
                                                </div> */}
                                                <Card>
                                                    <div
                                                        className="text-gray-700 "
                                                        dangerouslySetInnerHTML={{
                                                            __html: activity?.logs?.description
                                                                .replace(/(\r\n|\n|\r)/gm, ' ')
                                                                .replace(/\s\s+/g, ' ')
                                                                .replace(/,/g, ''),
                                                        }}
                                                    />
                                                </Card>
                                            </div>

                                            <div
                                                className='w-full flex justify-end'
                                            >
                                                <span className="block mt-2 text-sm text-gray-800 font-semibold ">
                                                    {FormatRawDate(activity?.logs)}
                                                </span>
                                            </div>

                                        </div>
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
            {/* </Card> */}
        </div>

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
            setOpenModal(false)
            toast.success('Note added successfully');
            getAllLogs(noteObj.candidateId)
        }).catch((err) => console.log(err, "Error"))
    }


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


