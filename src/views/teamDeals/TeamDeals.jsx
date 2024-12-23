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
    PiBuildingOfficeThin,
    PiUser
} from 'react-icons/pi'
import CardSkeleton from '@/components/CardSkeleton'
import PaginationHandler from '@/components/PaginationHandler'
import FiltersHandler from '@/components/FiltersHandler'
import useIsAdmin from '../../hooks/useIsAdmin'
import DealsEarningStats from '@/components/DealsEarningStats';


export default function TeamDeals() {
    const { user } = useAuth()
    const isAdmin = useIsAdmin();
    const [data, setData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [dataObj, setDataObj] = useState(null)
    const [openModal, setOpenModal] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [itemsPerPage, setItemsPerPage] = useState(6);

    const [totalAmount, setTotalAmount] = useState(0);
    const [itemCount, setItemCount] = useState(0);



    useEffect(() => {
        if (isAdmin) return;
        setIsLoading(true);
        getData(`commissions/consultant/${user?.userId}/all-child-deals-with-details`).then((response) => {
            console.log(response)
            setIsLoading(false);
            isAdmin ? setData(response) : setData(response?.childDeals);
        }).catch(err => {
            setIsLoading(false);
            console.log(err)
        });
    }, [user]);

    const handleSearch = () => {
        const query = searchQuery.toLowerCase()


        const filtered = data?.filter((item) => {
            const date = formatDateCustom(item?.commissionDate)?.toLowerCase();
            const name = (`${item?.candidateDetails?.firstName} ${item?.candidateDetails?.lastName}`).toLowerCase();
            const email = item?.candidateDetails?.email?.toLowerCase();
            const phone = item?.candidateDetails?.phone?.toLowerCase();
            const listingName = item?.listingDetails?.name?.toLowerCase();
            const category = item?.listingDetails?.category?.toLowerCase();
            const amount = item?.amount?.toLocaleString('eng-US',).toLowerCase();
            const amountSimple = toString(item?.amount)?.toLowerCase();
            const consutantName = (`${item?.consultantDetails?.firstName} ${item?.consultantDetails?.lastName}`).toLowerCase();
            const consultantEmail = item?.consultantDetails?.email?.toLowerCase();
            const consultantPhone = item?.consultantDetails?.companyPhoneNumber?.toLowerCase();



            return (
                date.includes(query) ||
                name.includes(query) ||
                email.includes(query) ||
                phone.includes(query) ||
                listingName.includes(query) ||
                category.includes(query) ||
                amount.includes(query) ||
                amountSimple.includes(query) ||
                consutantName.includes(query) ||
                consultantEmail.includes(query) ||
                consultantPhone.includes(query)
            )
        })

        setFilteredData(filtered)
    }


    useEffect(() => {
        handleSearch()
    }, [searchQuery, data])

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(Number(e.target.value))
    }



    return (
        <div className='flex flex-col  gap-5' >


            <Card>
                <h4 className="mb-4">Team's Completed Deals</h4>

                <FiltersHandler
                    placeholder="Search by Amount, Company Name, Name, Email, Phone, or Date"
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    itemsPerPage={itemsPerPage}
                    handleItemsPerPageChange={handleItemsPerPageChange}
                    noOfItems={filteredData?.length}
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
                                        <div className='text-xs xl:text-sm'>
                                            <div className="flex justify-between items-center mb-3">
                                                <h6 className="text-gray-900 font-bold capitalize">
                                                    {e?.candidateDetails?.firstName}{' '}{e?.candidateDetails?.lastName}
                                                </h6>
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


                                                <hr className='my-1' />
                                                <h6 className='mb-1' >Consultant Details</h6>
                                                <div className="flex justify-start items-center gap-2">
                                                    <PiUser className="text-gray-600 " />
                                                    <div className="text-gray-700 cursor-pointer capitalize">
                                                        {e?.consultantDetails?.firstName + ' ' + e?.consultantDetails?.lastName}
                                                    </div>
                                                </div>
                                                <div className="flex justify-start items-center gap-2">
                                                    <PiEnvelopeThin className="text-gray-600" />
                                                    <div className="text-gray-700 cursor-pointer">
                                                        {e?.consultantDetails?.email}
                                                    </div>
                                                </div>
                                                <div className="flex justify-start items-center gap-2">
                                                    <PiPhoneCallLight className="text-gray-600" />
                                                    <div className="text-gray-700">
                                                        {e?.consultantDetails?.companyPhoneNumber}
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
                        <div className="flex flex-col gap-1 border-gray-200 md:border-r-2 mr-10 ">
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

                            <h5 className="mb-2">Consultant Details</h5>

                            <div className="flex justify-start items-center gap-1 capitalize">
                                <div className="text-gray-800 font-semibold ">
                                    Name:{' '}
                                </div>
                                {`${dataObj?.consultantDetails?.firstName} ${dataObj?.consultantDetails?.lastName}`}
                            </div>

                            <div className="flex justify-start items-center gap-1">
                                <div className="text-gray-800 font-semibold">
                                    Email:{' '}
                                </div>
                                <a
                                    href={`mailto:${dataObj?.consultantDetails?.email}`}
                                    className="text-gray-600 cursor-pointer"
                                >
                                    {dataObj?.consultantDetails?.email}
                                </a>
                            </div>
                            <div className="flex justify-start items-center gap-1">
                                <div className="text-gray-800 font-semibold ">
                                    Phone:{' '}
                                </div>
                                <a
                                    href={`tel:${dataObj?.consultantDetails?.companyPhoneNumber}`}
                                    className="text-gray-600"
                                >
                                    {dataObj?.consultantDetails?.companyPhoneNumber}
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
