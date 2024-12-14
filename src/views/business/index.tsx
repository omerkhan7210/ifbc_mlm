import { Card } from '@/components/ui';
import DealsCommissionDetails from './components/DealsCommissionDetails';
import ActivityLog from '@/components/ActivityLog';
import activities from './data/Activities.json'
const Business = () => {
    return <div className='flex flex-col gap-5'>
        <DealsCommissionDetails />
        <Card>
            <h2 className='mb-12'>Activity Log </h2>
            <ActivityLog
                activities={activities}
            />

        </Card>
    </div>
}

export default Business
