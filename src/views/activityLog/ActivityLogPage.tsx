import { Card } from '@/components/ui'
import React from 'react'
import ActivityLog from '@/components/ActivityLog';
import { useParams } from 'react-router-dom';

export default function ActivityLogPage() {
  const params = useParams();

  return (
    <Card>
      <h2 className='mb-8'>Activity Log </h2>
      <ActivityLog id={params.id} />
    </Card>
  )
}
