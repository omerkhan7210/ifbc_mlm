import { useAuth } from '@/auth';
import { Card, Button } from '@/components/ui';
import ModalInternalScroll from '@/components/ui/modal/ModalInternalScroll';
import { getData, putData } from '@/services/axios/axiosUtils';
import { formatDateCustom } from '@/utils/dateUtils';
import React, { useEffect, useState } from 'react';
import { PiEnvelopeThin, PiPhoneCallLight, PiCalendarDotsLight, PiUser } from "react-icons/pi";
import CardSkeleton from '@/components/CardSkeleton';
import PaginationHandler from '@/components/PaginationHandler';
import FiltersHandler from '@/components/FiltersHandler';
import useIsAdmin from '../../../hooks/useIsAdmin';


export default function Members() {
    const { user } = useAuth();
    const isAdmin = useIsAdmin();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
    const [dataObj, setDataObj] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [itemsPerPage, setItemsPerPage] = useState(6);
   

    const getUsers = () => {
        setIsLoading(true);
        getData(isAdmin ? 'users' : `users/referral/${user?.userId}`)
            .then((data) => {
                setIsLoading(false);
                data = data.reverse().filter(e => !e?.isDeleted);
                console.log(data)
                setData(data);
                setFilteredData(data);
            })
            .catch((error) => {
                setIsLoading(false);
                console.error(error);
            });
    };

    const handleSearch = () => {
        const query = searchQuery.toLowerCase();

        const filtered = data.filter(item => {
            const name = `${item?.firstName} ${item?.lastName}`.toLowerCase();
            const email = item?.email.toLowerCase();
            const username = item?.username.toLowerCase();
            const date = formatDateCustom(item?.docDate).toLowerCase();

            return (
                name.includes(query) ||
                email.includes(query) ||
                date.includes(query) ||
                username.includes(query)
            );
        });

        setFilteredData(filtered);
    };


    useEffect(() => {
        handleSearch()
    }, [searchQuery])

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(Number(e.target.value));
    };


    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div>
            <Card>
                <h4 className="mb-4">All Members</h4>

                <FiltersHandler
                    placeholder='Search by Name, Username, Email, Phone, or Date'
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    itemsPerPage={itemsPerPage}
                    handleItemsPerPageChange={handleItemsPerPageChange}
                    noOfItems={filteredData?.length}
                />

                {/* Paginated Data */}
                <PaginationHandler items={filteredData} itemsPerPage={itemsPerPage}>
                    {(currentData) => (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                            {isLoading
                                ? Array(9).fill(0).map((_, index) => <CardSkeleton key={index} />)
                                : currentData && currentData.length > 0 ? currentData.map((e, i) => (
                                    <Card
                                        key={i}
                                        clickable
                                        onClick={() => {
                                            setDataObj(e);
                                            setOpenModal(true);
                                        }}
                                        className="p-0"
                                    >
                                        <div>
                                            <div className="flex justify-between items-top mb-3">
                                                <div className='flex flex-col gap-3'>
                                                    <img
                                                        className='w-20 h-20 rounded-full object-cover border border-gray-200 '
                                                        src={e?.profileImage || 'https://admin.ifbc.co/images/consultant-placeholer.jpg'} alt="" />
                                                    <h6 className="text-gray-900 font-bold capitalize text-center">
                                                        {`${e?.firstName} ${e?.lastName}`}
                                                    </h6>
                                                </div>
                                                <div>
                                                    <div className='text-xs '>
                                                        {e?.isApproved ?
                                                            <div className='p-2 px-3 bg-green-100 text-green-700  rounded-lg'>Approved</div> :
                                                            <div className='p-2 px-3 bg-red-100 text-red-700 rounded-lg' >Not Approved</div>}
                                                    </div>
                                                    <div className='p-2 px-3 bg-slate-100 text-gray-800  rounded-lg mt-3 text-xs text-center'>
                                                        {e?.userType === 'C' ?
                                                            <div className=''>Consultant</div> :
                                                            <div className='' >Ambassador</div>}
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <div className="flex justify-start items-center gap-2">
                                                    <PiUser className="text-gray-600" />
                                                    <div className="text-gray-700 cursor-pointer">
                                                        {e?.username}
                                                    </div>
                                                </div>
                                                <div className="flex justify-start items-center gap-2">
                                                    <PiEnvelopeThin className="text-gray-600" />
                                                    <div className="text-gray-700 cursor-pointer">
                                                        {e?.email}
                                                    </div>
                                                </div>
                                                <div className="flex justify-start items-center gap-2">
                                                    <PiPhoneCallLight className="text-gray-600" />
                                                    <div className="text-gray-700">
                                                        {e?.phone}
                                                    </div>
                                                </div>
                                                <div className="flex justify-start items-center gap-2">
                                                    <PiCalendarDotsLight className="text-gray-600" />
                                                    <div className="text-gray-700">
                                                        {formatDateCustom(e?.docDate)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                )) : <h4 className='mt-5'>No Data Available </h4>}
                        </div>
                    )}
                </PaginationHandler>
            </Card>

            {/* Modal for Inquiry Details */}
            <DataModal
                dataObj={dataObj}
                openModal={openModal}
                setOpenModal={setOpenModal}
                getUsers={getUsers}
            />
        </div>
    );
}

const DataModal = ({ dataObj, openModal, setOpenModal, getUsers }) => {

    let [updating, setUpdating] = useState(false);
    let [removing, setRemoving] = useState(false);

    const handleUserApprove = (user, status) => {
        setUpdating(true);
        putData(`users/${user?.docId}`, { ...user, isApproved: status }).then(resp => {
            setOpenModal(false);
            getUsers();
            setUpdating(false);
        }).catch(error => {
            setUpdating(false);
            console.log(error)
        })
    }

    const handleUserRemove = (user) => {
        setRemoving(true);
        putData(`users/${user?.docId}`, { ...user, isDeleted: true }).then(resp => {
            setOpenModal(false);
            getUsers();
            setRemoving(false);
        }).catch(error => {
            setRemoving(false);
            console.log(error)
        })
    }


    const handleUserArchive = (user, status) => {
        setRemoving(true);
        putData(`users/${user?.docId}`, { ...user, isArchived: status }).then(resp => {
            setOpenModal(false);
            getUsers();
            setRemoving(false);
        }).catch(error => {
            setRemoving(false);
            console.log(error)
        })
    }




    return (
        <ModalInternalScroll
            title="Consultant Inquiry Details"
            open={openModal}
            setOpen={setOpenModal}
        >
            {dataObj && (
                <div>
                    <div className="flex flex-col gap-1">
                        <div className="flex justify-start items-center gap-1 capitalize">
                            <div className="text-gray-800 font-semibold">
                                Name:{' '}
                            </div>
                            {`${dataObj?.firstName} ${dataObj?.lastName}` ||
                                '- -'}
                        </div>
                        <div className="flex justify-start items-center gap-1 capitalize">
                            <div className="text-gray-800 font-semibold">
                                Username:{' '}
                            </div>
                            {dataObj?.username ||
                                '- -'}
                        </div>
                        <div className="flex justify-start items-center gap-1 capitalize">
                            <div className="text-gray-800 font-semibold">
                                User Tpye:{' '}
                            </div>
                            {dataObj?.userType === 'C' ?
                                <div className=''>Consultant</div> :
                                <div className='' >Ambassador</div>}
                        </div>
                        <div className="flex justify-start items-center gap-1">
                            <div className="text-gray-800 font-semibold">
                                Email:{' '}
                            </div>
                            <a
                                href={`mailto:${dataObj?.email}`}
                                className="text-gray-600 cursor-pointer"
                            >
                                {dataObj?.email || '- -'}
                            </a>
                        </div>
                        <div className="flex justify-start items-center gap-1">
                            <div className="text-gray-800 font-semibold">
                                Phone:{' '}
                            </div>
                            <a
                                href={`tel:${dataObj?.phone}`}
                                className="text-gray-600"
                            >
                                {dataObj?.phone || '- -'}
                            </a>
                        </div>


                    </div>
                    <div className='flex justify-between items-end'>
                        <div className="text-gray-600 text-xs mt-3">
                            {formatDateCustom(dataObj?.docDate)}
                        </div>
                        <div className='flex gap-2'>
                            <button
                                onClick={() => handleUserApprove(dataObj, !dataObj?.isApproved)}
                                disabled={updating}
                                className={'text-white text-xs p-2 px-3 rounded-lg ' + (dataObj?.isApproved ? 'bg-red-500' : 'bg-green-600')}>

                                {updating ? 'Loading...' : dataObj?.isApproved ? "Disapprove" : "Approve"}
                            </button>
                            <button
                                onClick={() => handleUserRemove(dataObj, !dataObj?.isArchived)}
                                disabled={removing}
                                className={'text-white text-xs p-2 px-3 rounded-lg bg-red-500'}>
                                {removing ? 'Loading...' : "Remove"}
                            </button>
                        </div>
                    </div>

                </div>
            )}
        </ModalInternalScroll>
    )
}