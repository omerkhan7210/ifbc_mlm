import { Button, Card, Input } from '@/components/ui'
import React, { useState } from 'react'
import ActivityLog from '@/components/ActivityLog';
import { useParams } from 'react-router-dom';
import ModalInternalScroll from '@/components/ui/modal/ModalInternalScroll';

export default function ActivityLogPage() {
  const params = useParams();
  const [openModal, setOpenModal] = useState(false);


  return (
    <Card>
      <div className='flex justify-between items-center'>
        <h2 className='mb-8'>Activity Log </h2>
        <Button
          variant='solid'
          size='sm'
          onClick={() => setOpenModal(true)}
        >Add Note</Button>
      </div>
      <ActivityLog id={params.id} />
      {/* Modal for Inquiry Details */}
      <DataModal
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </Card>
  )
}

const DataModal = ({ openModal, setOpenModal }) => {
  return (
    <ModalInternalScroll
      open={openModal}
      setOpen={setOpenModal}
    >

      <div className='mt-12 flex justify-between gap-5 ' >
        <Input
          placeholder='Enter Note'
        />
        <Button
          variant='solid'
        >Add</Button>
      </div>
    </ModalInternalScroll>
  )
}

