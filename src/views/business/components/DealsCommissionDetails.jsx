import { useAuth } from '@/auth'
import { Card } from '@/components/ui'
import ModalInternalScroll from '@/components/ui/modal/ModalInternalScroll'
import { getData } from '@/services/axios/axiosUtils'
import { formatDateCustom } from '@/utils/dateUtils'
import React, { useEffect, useState } from 'react'
import {
    PiEnvelopeThin,
    PiPhoneCallLight,
    PiCalendarDotsLight,
    PiBuildingOfficeThin
} from 'react-icons/pi'
import CardSkeleton from '../../../components/CardSkeleton'
import PaginationHandler from '@/components/PaginationHandler'
import FiltersHandler from '@/components/FiltersHandler'
import useIsAdmin from '../../../hooks/useIsAdmin'
import DealsEarningStats from '@/components/DealsEarningStats';


export default function DealsCommissionDetails() {
    const { user } = useAuth()
    const isAdmin = useIsAdmin();
    const [data, setData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [dataObj, setDataObj] = useState(null)
    const [openModal, setOpenModal] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [type, setType] = useState('');

    useEffect(() => {
        setIsLoading(true);
        getData(isAdmin ? 'commissions' : `commissions/consultant/${user?.userId}/completed-deals-with-details`).then((response) => {
            setIsLoading(false);
            isAdmin ? setData(response) : setData(response?.totalCompletedDeals);
        }).catch(err => {
            setIsLoading(false);
            console.log(err)
        });
    }, [user]);



    const [totalAmount, setTotalAmount] = useState(0);
    const [itemCount, setItemCount] = useState(0);

    useEffect(() => {
        const calculateTotalAmountAndCount = () => {
            const totalAmount = data.reduce((sum, item) => sum + item.amount, 0);
            const itemCount = data.length.toString();
            setTotalAmount(totalAmount);
            setItemCount(itemCount);
        };

        calculateTotalAmountAndCount();
    }, [data]);

    const handleSearch = () => {

        const query = searchQuery.toLowerCase()
        const filtered = data?.filter((item) => {
            const date = formatDateCustom(item?.commissionDate)?.toLowerCase();
            const name = (`${item?.candidateDetails?.firstName} ${item?.candidateDetails?.lastName}`).toLowerCase();
            const email = item?.candidateDetails?.email?.toLowerCase();
            const phone = item?.candidateDetails?.phone?.toLowerCase();
            const listingName = item?.listingDetails?.name?.toLowerCase();
            const category = item?.listingDetails?.category?.toLowerCase();
            const amount = item?.amount?.toLocaleString('en-US').toLowerCase();
            const amountSimple = item?.amount?.toString().toLowerCase();

            console.log('in handle Search', type, item.commissionType?.toLowerCase() === type.toLowerCase(), item.commissionType?.toLowerCase(), type.toLowerCase())
            return (
                date.includes(query) ||
                name.includes(query) ||
                email.includes(query) ||
                phone.includes(query) ||
                listingName.includes(query) ||
                category.includes(query) ||
                amount.includes(query) ||
                amountSimple.includes(query)
            )
        })

        setFilteredData(filtered)
    }

    useEffect(() => {
        handleSearch()
    }, [searchQuery, data, type])

    useEffect(() => {
        if (type === '') return
        const filtered = data?.filter((item) => {
            return item.commissionType?.toLowerCase() === type.toLowerCase()
        })
        setFilteredData(filtered)
    }, [type, data])

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(Number(e.target.value))
    }

    console.log(type)


    return (
        <div className='flex flex-col  gap-5'>
            <DealsEarningStats
                totalAmount={totalAmount}
                totalCompletedDeals={itemCount}
                totalCommission={(totalAmount * 15 / 100)}
            />
            <Card>
                <h4 className="mb-4">All Completed Deals</h4>

                <FiltersHandler
                    placeholder="Search by Amount, Company Name, Name, Email, Phone, or Date"
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    itemsPerPage={itemsPerPage}
                    handleItemsPerPageChange={handleItemsPerPageChange}
                    noOfItems={filteredData?.length}
                    type={type}
                    setType={setType}
                    showType={true}
                />

                {/* Paginated Data */}
                <PaginationHandler
                    items={filteredData}
                    itemsPerPage={itemsPerPage}
                >
                    {(currentData) => (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  gap-5">
                            {isLoading ? (
                                Array(6)
                                    .fill(0)
                                    .map((_, index) => (
                                        <CardSkeleton key={index} />
                                    ))
                            ) : currentData && currentData.length > 0 ? (
                                currentData.map((e, i) => (
                                    <Card
                                        key={i}
                                        clickable
                                        onClick={() => {
                                            setDataObj(e)
                                            setOpenModal(true)
                                        }}
                                        className="p-0"
                                    >
                                        <div className='text-xs xl:text-sm' >
                                            <div className="flex justify-between items-center mb-3">
                                                <div className='flex gap-2 items-center' >
                                                    <h6 className="text-gray-900 font-bold capitalize">
                                                        {e?.candidateDetails?.firstName}{' '}{e?.candidateDetails?.lastName}
                                                    </h6>
                                                    <div className="bg-blue-100 text-blue-700 px-2 py-1 font-bold text-xs rounded">
                                                        {e?.commissionType === 'Direct' ? 'Direct' : 'Team'}
                                                    </div>
                                                </div>
                                                <div className="bg-green-100 text-green-700 px-2 py-1 font-bold">
                                                    $ {e?.amount?.toLocaleString('eng-US',)}
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <div className="flex justify-start items-center gap-2">
                                                    <PiBuildingOfficeThin className="text-gray-600" />
                                                    <div className="text-gray-700 cursor-pointer">
                                                        {e?.listingDetails?.name}
                                                    </div>
                                                </div>
                                                <div className="flex justify-start items-center gap-2">
                                                    <PiEnvelopeThin className="text-gray-600" />
                                                    <div className="text-gray-700 cursor-pointer">
                                                        {e?.candidateDetails?.email}
                                                    </div>
                                                </div>
                                                <div className="flex justify-start items-center gap-2">
                                                    <PiPhoneCallLight className="text-gray-600" />
                                                    <div className="text-gray-700">
                                                        {e?.candidateDetails?.phone}
                                                    </div>
                                                </div>
                                                <div className="flex justify-start items-center gap-2">
                                                    <PiCalendarDotsLight className="text-gray-600" />
                                                    <div className="text-gray-700">
                                                        {formatDateCustom(
                                                            e?.commissionDate
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="flex justify-start items-center gap-2">
                                                    <div className="text-gray-700">
                                                        {e?.contactReason}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                ))
                            ) : (
                                <h4 className="mt-5">No Data Available</h4>
                            )}
                        </div>
                    )}
                </PaginationHandler>
            </Card>

            {/* Modal for Data Details */}
            <DataModal
                dataObj={dataObj}
                openModal={openModal}
                setOpenModal={setOpenModal}
            />
        </div>
    )
}

const DataModal = ({ dataObj, openModal, setOpenModal }) => {
    return (
        <ModalInternalScroll
            title="Franchise Inquiry Details"
            open={openModal}
            setOpen={setOpenModal}
            width={800}
        >
            {dataObj && (
                <div className="grid grid-cols-1 md:grid-cols-2 ">
                    <div className="h-full flex flex-col justify-between gap-5">
                        <div className="flex flex-col gap-1 md:border-gray-200 md:border-r-2 mr-10 ">
                            <h5 className="mb-2">Candidate Details</h5>

                            <div className="flex justify-start items-center gap-1 capitalize">
                                <div className="text-gray-800 font-semibold ">
                                    Name:{' '}
                                </div>
                                {`${dataObj?.candidateDetails?.firstName} ${dataObj?.candidateDetails?.lastName}`}
                            </div>

                            <div className="flex justify-start items-center gap-1">
                                <div className="text-gray-800 font-semibold">
                                    Email:{' '}
                                </div>
                                <a
                                    href={`mailto:${dataObj?.candidateDetails?.email}`}
                                    className="text-gray-600 cursor-pointer"
                                >
                                    {dataObj?.candidateDetails?.email}
                                </a>
                            </div>
                            <div className="flex justify-start items-center gap-1">
                                <div className="text-gray-800 font-semibold ">
                                    Phone:{' '}
                                </div>
                                <a
                                    href={`tel:${dataObj?.candidateDetails?.phone}`}
                                    className="text-gray-600"
                                >
                                    {dataObj?.candidateDetails?.phone}
                                </a>
                            </div>



                        </div>

                        <div className="text-gray-600 text-xs mb-3">
                            {formatDateCustom(dataObj?.commissionDate)}
                        </div>
                    </div>

                    <div>
                        <h5 className="mb-3">Franchise Details</h5>

                        <div className="flex justify-start items-center gap-5">
                            <img
                                src={
                                    'https://ifbc.co/' + dataObj?.listingDetails?.imgUrl}
                                className="w-40 "
                                alt="img"
                            />
                            <div>
                                <div className="text-gray-700 text-sm font-semibold">
                                    {dataObj?.listingDetails?.name}
                                </div>
                                <div className="text-gray-700 text-xs">
                                    {dataObj?.listingDetails?.category}
                                </div>
                            </div>
                            <hr />
                        </div>

                    </div>
                </div>
            )}
        </ModalInternalScroll>
    )
}
