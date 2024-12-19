import { Button, Card, Input } from '@/components/ui'
import React, { useState } from 'react'
import ActivityLog from '@/components/ActivityLog'
import { useParams } from 'react-router-dom'
import ModalInternalScroll from '@/components/ui/modal/ModalInternalScroll'

export default function ActivityLogPage() {
    const params = useParams()
    const [openModal, setOpenModal] = useState(false)

    return (
        <Card>
            <div className="flex justify-between items-center">
                <h2 className="mb-8">Activity Log</h2>
                <Button
                    variant="solid"
                    size="sm"
                    onClick={() => setOpenModal(true)}
                >
                    Add Note
                </Button>
            </div>
            <ActivityLog id={params.id} />
            {/* Modal for Inquiry Details */}
            <DataModal openModal={openModal} setOpenModal={setOpenModal} />
        </Card>
    )
}

const DataModal = ({ openModal, setOpenModal }) => {
    return (
        <ModalInternalScroll open={openModal} setOpen={setOpenModal} width={700}>
            <div className="bg-white rounded-lg shadow-lg p-2 md:p-6  mx-auto w-full">
                <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
                    Add Note
                </h2>
                <p className="text-gray-600 text-sm text-center mb-6">
                    Add your note below. You can provide additional information
                    if needed.
                </p>

                <div className="space-y-6">
                    {/* Text Input */}
                    <Input
                        placeholder="Enter Title or Short Note"
                        className="w-full border border-gray-300 rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {/* Text Area */}
                    <textarea
                        placeholder="Enter detailed note here..."
                        rows={7}
                        className="w-full border border-gray-300 rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>

                    {/* Buttons */}
                    <div className="flex justify-end space-x-4">
                        <Button
                            variant="outline"
                            className="px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100"
                            onClick={() => setOpenModal(false)}
                        >
                            Cancel
                        </Button>
                        <Button
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
