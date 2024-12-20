import { useAuth } from '@/auth';
// import { Card, Button } from '@/components/ui';
// import ModalInternalScroll from '@/components/ui/modal/ModalInternalScroll';
import { getData, putData } from '@/services/axios/axiosUtils';
// import { formatDateCustom } from '@/utils/dateUtils';
import React, { useEffect, useState } from 'react';
// import { PiEnvelopeThin, PiPhoneCallLight, PiCalendarDotsLight, PiUser } from "react-icons/pi";
// import CardSkeleton from '@/components/CardSkeleton';
// import PaginationHandler from '@/components/PaginationHandler';
// import FiltersHandler from '@/components/FiltersHandler';
import CommissionTable from '../EcommerceDashboard/components/CommissionTable'
import TableSkeleton from '@/components/ui/TableSkeleton'


import useIsAdmin from '../../hooks/useIsAdmin';

const SubscriptionReport = () => {
    const { user } = useAuth();
    const isAdmin = useIsAdmin();


    const [isLoading, setIsLoading] = useState(false);
    const [subscriptionData, setSubscriptionData] = useState([]);


    const getUsers = () => {
        setIsLoading(true);
        getData(isAdmin ? 'users' : `users/referral/${user?.userId}`)
            .then((data) => {
                setIsLoading(false);
                data = data.reverse().filter(e => !e?.isDeleted);
                console.log(data)
                setSubscriptionData(data)
                // setFilteredData(data);
            })
            .catch((error) => {
                setIsLoading(false);
                console.error(error);
            });
    };

    useEffect(() => {
        getUsers()
    }, [])


    console.log(subscriptionData, "data")
    return <>
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-gray-300 pb-2">
                Total Subscriber
            </h2>

            {isLoading ? (
                <TableSkeleton />
            ) : subscriptionData.length === 0 ? (
                <p className="text-gray-500 text-center">
                    Subscription Data Not Available.
                </p>
            ) : (
                <CommissionTable subscriptionData={subscriptionData} user={user} />
            )}
        </div>
    </>
}

export default SubscriptionReport
