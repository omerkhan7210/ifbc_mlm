import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { NavLink, useNavigate } from 'react-router-dom'
import { BASE_API_URL, HEADER_TOKEN } from '@/constants/app.constant'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import { FormatRawDate } from '../../utils/FormatRawDate.js'
import { AnimatePresence, motion } from 'framer-motion'
import { TopButtonsSection } from './TopSection.tsx'
import CandidateStepGraph from '../../Charts/CandidateStepGraph.jsx'
import { PiEnvelope, PiPhoneCallLight, PiBuildingApartmentLight } from 'react-icons/pi'
import { toast } from 'react-toastify'
import { HiOutlineLightBulb } from 'react-icons/hi'
import ConfettiComponent from '../../GlobalPageSections/ConfettiComponent.jsx'
import { useAuth } from '@/auth'
import { getData } from '@/services/axios/axiosUtils'
import DownlineMembersTable from '../EcommerceDashboard/components/DownlineMembersTable.tsx'
import CandidateListSkeleton from '../../components/ui/CandidateListSkeleton.jsx'

const containerVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
}

const steps = [
    'New Deal',
    'Initial Call Attempt',
    'Connected',
    'Spoton/Candidate Research',
    'Research & Prep Presentation',
    'Present Franchise Review',
    'Intro to Zor',
    'Franchise Due Diligence',
    'Validation - FSO',
    'Discovery Day/Award - FSO',
    'Closed Won',
    'Closed Lost',
    'On Hold',
]
const CandidateListGrid = () => {
    const { user } = useAuth()
    const [cands, setCands] = useState()

    const getCandidates = () => {
        setLoading(true)
        getData(`candidateProfile/referral/${user?.userId}`)
            .then((data) => {
                // let users = data.filter((e) => e?.refferralId == user?.userId)

                const candidates = data.flatMap(d =>
                    d?.listings.map(list => ({
                        ...d.candidate,
                        listingName: list.name,
                        listingCategory: list.category,
                        imgUrl: list.imgUrl,
                        franchiseFee: list.franchiseFee,
                        documents: list.documents,
                    }))
                )
                console.log('users', candidates)
                setCands(candidates)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
                setLoading(false)
            })
    }
    useEffect(() => {
        getCandidates()
    }, [])

    const headerConfig = {
        title: 'Downline Members',
        buttonText: 'View Details',
        buttonAction: () => {
            console.log('Navigate to details')
        },
        placeholderText: 'Search your Teams',
        onchangeAction: () => {
            console.log('Navigate to details')
        },
    }

    // const { cands, refetch, isLoading } = useContext(MyCandContext)
    const [filteredCandidates, setFilteredCandidates] = useState([])
    const [filterCands, setFilterCands] = useState()
    const [loading, setLoading] = useState(false)
    const handle = useFullScreenHandle()
    const [switchFormat, setSwitchFormat] = useState('')
    const [closeHint, setCloseHint] = useState(false)

    useEffect(() => {
        const filterCandidates = () => {
            if (!cands || cands.length === 0) return []
            return cands
                ?.sort((a, b) => {
                    // Convert 'docDate' to Date objects, ensuring valid dates
                    const dateA = new Date(a.docDate)
                    const dateB = new Date(b.docDate)

                    // Check if both dates are valid before sorting
                    if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
                        console.error('Invalid date detected, skipping sort')
                        return 0 // Keep original order if invalid date
                    }

                    // Sort in descending order (most recent first)
                    return dateB - dateA
                })
                ?.filter((cand) => {
                    const candDocDate = new Date(FormatRawDate(cand)).getTime()

                    const selectedStepsMatch =
                        filterCands?.selectedSteps.length > 0
                            ? filterCands?.selectedSteps.includes(
                                cand.pipelineStep,
                            )
                            : true

                    // Check all filter conditions
                    const statusMatch =
                        filterCands?.status &&
                            filterCands.status !== 'Select Deal Stage' &&
                            filterCands.status !== 'All'
                            ? cand.pipelineStep === filterCands.status
                            : true

                    // Check all filter conditions
                    const referralStatusMatch = filterCands?.referralStatus
                        ? filterCands.referralStatus === 'Referred Candidates'
                            ? cand.refferralId !== 0
                            : cand.refferralId === 0
                        : true

                    const searchMatch =
                        filterCands?.search && filterCands.search !== ''
                            ? cand.firstName
                                .toLowerCase()
                                .includes(filterCands.search.toLowerCase())
                            : true

                    const dateMatch = filterCands?.selectedRange
                        ? (() => {
                            const { startDate, endDate } =
                                filterCands.selectedRange

                            if (startDate && endDate) {
                                // Both start and end dates are present
                                return (
                                    new Date(candDocDate) >=
                                    new Date(startDate) &&
                                    new Date(candDocDate) <= new Date(endDate)
                                )
                            } else if (startDate) {
                                // Only start date is present
                                return (
                                    new Date(candDocDate).getTime() ===
                                    new Date(startDate).getTime()
                                ) // Compare time values
                            } else if (endDate) {
                                // Only end date is present
                                return (
                                    new Date(candDocDate).getTime() ===
                                    new Date(endDate).getTime()
                                ) // Compare time values
                            }

                            return true // Neither date is present, show all data
                        })()
                        : true // If selectedRange is not defined, show all data

                    const franchiseMatch =
                        filterCands?.franchise &&
                            filterCands.franchise.length > 0
                            ? (() => {
                                const franchiseIds =
                                    filterCands.franchise.map(
                                        (fc) => fc.docId,
                                    )
                                if (cand.franchiseInterested) {
                                    const parsedFranchises = JSON.parse(
                                        cand.franchiseInterested,
                                    )
                                    return parsedFranchises.some(
                                        (franchiseId) =>
                                            franchiseIds.includes(
                                                franchiseId,
                                            ),
                                    )
                                }
                            })()
                            : true

                    const consultantMatch = filterCands?.consultantid
                        ? filterCands.consultantid == cand.agentUserId
                        : true

                    const archiveMatch =
                        filterCands?.isArchive === true
                            ? cand.isArchive
                            : !cand.isArchive

                    // Exclude candidates marked as deleted
                    const isDeletedMatch = filterCands?.selectedApprovalStatus
                        ? filterCands.selectedApprovalStatus === 'isArchived'
                            ? cand.isArchived
                            : filterCands.selectedApprovalStatus === 'isDeleted'
                                ? cand.isDeleted
                                : true
                        : !cand.isDeleted

                    // Apply both conditions together
                    const shouldShow = archiveMatch && isDeletedMatch

                    // Return true if all conditions match
                    return (
                        statusMatch &&
                        searchMatch &&
                        dateMatch &&
                        franchiseMatch &&
                        consultantMatch &&
                        shouldShow &&
                        referralStatusMatch &&
                        selectedStepsMatch
                    )
                })
        }

        // Apply filters and set the filtered candidates
        const filteredResults = filterCandidates()

        const uniqueCands = [...new Set(filteredResults)]
        setFilteredCandidates(uniqueCands)
    }, [filterCands, loading, cands])

    // Function to handle updating the candidate's pipeline step when dropped
    const handleDropCandidate = async (cand, newStep) => {
        setLoading(true)
        try {
            const formData = {
                ...cand,
                pipelineStep: newStep, // Update the pipeline step
            }

            const response = await axios.put(
                `${BASE_API_URL}/candidateprofile/${cand.docid}`,
                formData,
                {
                    headers: {
                        'X-App-Token': HEADER_TOKEN,
                    },
                },
            )

            if (response.status === 204) {
                setFilteredCandidates((prevCands) =>
                    prevCands.map((c) =>
                        c.docid === cand.docid
                            ? { ...c, pipelineStep: newStep }
                            : c,
                    ),
                )
                getCandidates()
            }
        } catch (error) {
            console.error('Error updating pipeline step:', error.message)
        } finally {
            setLoading(false)
        }
    }

    const stepOptions = steps.map((step) => ({ value: step, label: step }))

    const handleStepFilterChange = (selectedOptions) => {
        const selectedSteps = selectedOptions.map((option) => option.value)

        setFilterCands((prev) => ({ ...prev, selectedSteps }))
    }

    const containerRef = useRef()

    const handleMouseDown = (e) => {
        const container = containerRef.current
        container.style.cursor = 'grabbing'
        container.style.userSelect = 'none'

        const startX = e.pageX
        const scrollLeft = container.scrollLeft

        const onMouseMove = (e) => {
            const x = e.pageX - startX
            container.scrollLeft = scrollLeft - x
        }

        const onMouseUp = () => {
            container.style.cursor = 'grab'
            container.style.removeProperty('user-select')
            window.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('mouseup', onMouseUp)
        }

        window.addEventListener('mousemove', onMouseMove)
        window.addEventListener('mouseup', onMouseUp)
    }

    const SwitchFormatHandler = () => {
        switch (switchFormat) {
            case 'graph':
                return (
                    <FullScreen handle={handle}>
                        <motion.div
                            className="w-full bg-white"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <CandidateStepGraph
                                steps={steps}
                                candidates={filteredCandidates}
                            />
                        </motion.div>
                    </FullScreen>
                )
            case 'table':
                return (
                    <FullScreen handle={handle}>
                        <motion.div
                            className="w-full bg-white p-4"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <DownlineMembersTable
                                data={filteredCandidates}
                                headerConfig={headerConfig}
                            />
                        </motion.div>
                    </FullScreen>
                )
            default:
                return (<>
                    {loading ? <CandidateListSkeleton /> :
                        (filteredCandidates && filteredCandidates.length > 0) ?
                            <FullScreen handle={handle}>
                                <motion.div
                                    ref={containerRef}
                                    id="container"
                                    className="max-w-screen mx-auto overflow-x-scroll divide-x-2 flex snap-mandatory snap-x bg-white cursor-grab"
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                >

                                    {steps.map((step, index) => (
                                        <StepColumn
                                            key={index}
                                            step={step}
                                            handle={handle}
                                            candidates={filteredCandidates.filter(
                                                (cand) => cand.pipelineStep === step,
                                            )}
                                            onDropCandidate={handleDropCandidate}
                                            containerRef={containerRef}
                                        />
                                    ))}
                                </motion.div>
                            </FullScreen>
                            :
                            <h3 className='my-5 mx-4' >Sorry! You don't have any Candidates.</h3>}
                </>
                )
        }
    }

    return (
        <motion.div
            className="relative bg-blue-100 flex flex-col gap-1 rounded-xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onMouseDown={handleMouseDown}
        >
            <div className="px-4 pt-4">
                <h1 className="text-2xl font-bold text-left text-blue-800 mb-1">
                    Candidate List
                </h1>
                <p className="text-left text-sm text-gray-600">
                    Here you can find the list of candidates and their current
                    status in the pipeline. Use the filters to narrow down your
                    search.
                </p>
            </div>
            <AnimatePresence mode="wait">
                {!closeHint ? (
                    <motion.span
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        onClick={() => setCloseHint(true)}
                        className="absolute top-1 right-2 z-[9] cursor-pointer"
                    >
                        <HiOutlineLightBulb size={30} color="#E49B0F" />
                    </motion.span>
                ) : (
                    <HintOptions setCloseHint={setCloseHint} />
                )}
            </AnimatePresence>
            <TopButtonsSection
                handle={handle}
                setSwitchFormat={setSwitchFormat}
                handleStepFilterChange={handleStepFilterChange}
                stepOptions={stepOptions}
                switchFormat={switchFormat}
                filteredCandidates={filteredCandidates}
            />
            {SwitchFormatHandler()}
        </motion.div>
    )
}

const HintOptions = ({ setCloseHint }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-3 right-3 bg-white p-5 rounded-lg shadow-lg z-[999999999]"
        >
            <button
                onClick={() => setCloseHint(false)}
                className="absolute top-1 right-3 text-red-600 text-2xl hover:text-red-800"
            >
                &times;
            </button>
            <h2 className="text-sm font-bold text-blue-800 mb-2">Hints</h2>
            <ul className="text-xs text-gray-600 list-disc list-inside">
                <li>Drag and drop candidates to update their pipeline step.</li>
                <li>
                    Use the filters above to narrow down the candidate list.
                </li>
                <li>Click on a candidate's name to view their profile.</li>
                <li>
                    Click on the step name to filter candidates by that step.
                </li>
            </ul>
        </motion.div>
    )
}

const StepColumn = ({
    step,
    candidates,
    onDropCandidate,
    handle,
    containerRef,
}) => {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [droppedItem, setDroppedItem] = useState(null)

    const handleConfirmUserIsAddedOrNot = () => {
        setIsModalVisible(true)
    }
    const capitalizeFirstLetter = (str) =>
        str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()

    const notifyUpdate = (cand, step) => {
        const firstName = capitalizeFirstLetter(cand.firstName) // Capitalize
        toast.success(
            `${firstName} has been added to ${step} (Pipeline Step) successfully!`,
            {
                style: {
                    backgroundColor: 'white', // Custom background color
                    color: 'rgba(0,0,0,0.8)', // Text color
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '12px',
                    borderRadius: '8px',
                    padding: '10px',
                },
                icon: '🎉', // Add an icon
            },
        )
    }

    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'CANDIDATE',
        drop: (item, monitor) => {
            console.log(item, monitor, 'moniter')
            // Perform the drop action
            if (monitor.didDrop()) {
                return
            }
            if (item?.cand?.pipelineStep !== step) {
                setDroppedItem(item)
                handleConfirmUserIsAddedOrNot()
            } else {
                notifyUpdate(
                    'The candidate is already in this pipeline step. Please choose a different step.',
                )
            }
            // onDropCandidate(item.cand, step);
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }))

    const navigate = useNavigate()
    const [showConfettiComponent, setShowConfettiComponent] = useState(false)
    const [stepTrack, setStepTrack] = useState('')

    useEffect(() => {
        if (stepTrack === 'Closed Won') {
            setShowConfettiComponent(true)
            // onDropCandidate()
            const timer = setTimeout(() => {
                setShowConfettiComponent(false)
            }, 10000)
            return () => {
                clearTimeout(timer)
            }
        }
    }, [stepTrack, showConfettiComponent])

    const totalFranchiseFee = candidates.reduce((total, cand) => {
        const fee = parseFloat(cand.franchiseFee.replace(/[$,]/g, '')) || 0;
        return total + fee;
    }, 0).toLocaleString();
    const totalCommission = candidates.reduce((total, cand) => {
        const fee = parseFloat(cand.franchiseFee.replace(/[$,]/g, '')) || 0;
        return total + (fee * 0.15);
    }, 0).toLocaleString();

    const totalCandidates = candidates.length;

    return (
        <>
            <AnimatePresence>
                <div>{showConfettiComponent && <ConfettiComponent />}</div>
                {isModalVisible && (
                    <motion.div
                        className="fixed inset-0 bg-blue-500/50 backdrop-blur-[1px] flex items-center justify-center z-[999999999999999]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.div
                            className="bg-white rounded-lg shadow-lg p-6 w-96"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h2 className="text-lg font-bold mb-4">
                                Confirm Action
                            </h2>
                            <p className="text-gray-600 mb-4">
                                Are you sure you want to proceed with this
                                action?
                            </p>
                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={() => setIsModalVisible(false)}
                                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        if (droppedItem) {
                                            onDropCandidate(
                                                droppedItem?.cand,
                                                step,
                                            )
                                            notifyUpdate(
                                                droppedItem?.cand,
                                                step,
                                            )
                                            setIsModalVisible(false)
                                            setStepTrack(step)
                                        } else {
                                            console.error('No item to confirm.')
                                        }
                                    }}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Confirm
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            <div
                ref={drop}
                className={`flex-1 min-w-[370px] !z-0 ${isOver ? 'bg-blue-200' : ''}`}
            >
                <div className="relative group  ">
                    <div className=" flex items-center justify-between w-full bg-[#2176ff] p-2 ">
                        <h1 className="text-white flex flex-col gap-1  text-left text-sm ">
                            {step}
                            <span className='text-xs'>{totalCandidates}</span>
                        </h1>

                        <div className="flex  text-white gap-1 text-xs">
                            <p className='flex items-center'>
                                {/* <span className="font-light text-[8px]">Total Franchise Fee: </span> */}
                                <span title="This is the total franchise fee calculated from all candidates."
                                    className='text-green-700 bg-green-50 rounded-full px-2 py-1' >
                                    ${totalFranchiseFee}
                                </span>

                            </p>

                            <p className='flex items-center'>
                                {/* <span className="font-light text-[8px]">Total Commission: </span> */}
                                <span title="This is the total commission amount."
                                    className='text-green-700 bg-green-50  rounded-full px-2 py-1'>
                                    ${totalCommission}
                                </span>
                            </p>
                        </div>
                    </div>
                    {/* <button
                        onClick={() => {
                            navigate('/dashboard/candidates-list', {
                                state: { step },
                            })
                        }}
                        className="absolute z-10 top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                        <span className="text-white text-xs font-bold capitalize">
                            Click here to apply the filter
                        </span>
                    </button> */}
                </div>
                <div
                    className={`p-3 flex flex-col bg-slate-50 ${handle.active ? 'max-h-screen' : 'max-h-[680px]'}  overflow-y-auto gap-5`}
                >
                    {candidates.map((cand, index) => (
                        <DraggableCard
                            cand={cand}
                            key={index}
                            containerRef={containerRef}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

const ReferralRibbon = ({ cand }) => {
    if (cand.refferralId && cand.refferralId !== 0) {
        return (
            <div className="absolute top-0 right-0 bg-blue-950 text-white text-xs px-2 py-1 rounded-bl-lg rounded-tr-xl">
                Referred
            </div>
        )
    }
    return null
}

const DraggableCard = ({ cand, key, containerRef }) => {
    const [{ isDragging }, drag, preview] = useDrag(() => ({
        type: 'CANDIDATE',
        item: { cand },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }))

    const handleDrag = (event) => {
        const container = containerRef.current
        if (!container) return

        const { clientX } = event

        // Scroll left if near the start
        if (clientX < 200) {
            container.scrollLeft -= 10 // Adjust speed
        }

        // Scroll right if near the end
        if (window.innerWidth - clientX < 200) {
            container.scrollLeft += 10 // Adjust speed
        }
    }

    useEffect(() => {
        const handleMouseUp = () => {
            window.removeEventListener('mousemove', handleDrag)
            window.removeEventListener('mouseup', handleMouseUp)
        }

        window.addEventListener('mouseup', handleMouseUp)

        return () => {
            window.removeEventListener('mouseup', handleMouseUp)
        }
    }, [])

    return (
        <div
            ref={(node) => {
                drag(node)
                preview(node) // Enable dragging and preview
            }}
            onDrag={handleDrag} // Call drag handling logic
            key={key}
            style={{ opacity: isDragging ? 0.5 : 1 }}
            className="p-2 rounded-xl border-2 border-[#2176ff]/50 z-9 relative cursor-pointer snap-start bg-gradient-to-r from-blue-50 to-blue-200 flex flex-col items-start justify-start gap-2 transition-all duration-300 group shadow-inner max-w-full"
        >
            <ReferralRibbon cand={cand} />
            <NavLink
                to={`/dashboard/candidate-profile/${cand.docid}`}
                className="text-lg text-left text-black/90 font-semibold text-custom-heading-color capitalize"
            >
                {cand.firstName} {cand.lastName}
            </NavLink>
            {/* <ul className="flex flex-col items-start gap-2 border-b-[1.5px] border-b-stone-700 border-dotted pb-3 text-xs max-w-full">

                <li className="flex items-start gap-1">
                    <PiPhoneCallLight
                        size={15}
                        color="black"
                        strokeWidth="5px"
                    />

                    <p className="text-xs font-semibold ">
                        <a href={`tel:${cand.phone}`} className='text-black/70'> {cand.phone}</a>
                    </p>
                </li>
                <li className="flex items-start gap-1">
                    <PiEnvelope size={15} color="black" strokeWidth="2px" />
                    <p className="text-xs font-semibold ">
                        <a href={`mailto:${cand.email}`} className='text-black/70'>{cand.email}</a>
                    </p>
                </li>
            </ul> */}
            <div className='border-b-stone-700 border-dotted border-b-[1.5px] pb-3'>
                <li className="flex flex-col justify-start items-start gap-1 ">
                    <div className="flex gap-2 items-center">
                        <img
                            className='size-10 rounded'
                            src={"https://ifbc.co/" + cand?.imgUrl} alt="" />

                        <div className="flex flex-col gap-1">
                            <p className="text-sm font-semibold text-black/70">
                                {cand?.listingName}
                            </p>
                            <p className='text-xs' >Fee: {cand?.franchiseFee}</p>
                        </div>
                    </div>
                    {/* <p className='text-xs' >Category: {cand?.listingCategory}</p> */}



                </li>
            </div>
            <div className="flex items-center gap-2 mt-2">
                <span className="text-xs font-semibold text-gray-600">
                    Status:
                </span>
                <span className="text-xs font-semibold text-blue-600">
                    {cand.pipelineStep}
                </span>
            </div>
        </div>
    )
}
export default CandidateListGrid
