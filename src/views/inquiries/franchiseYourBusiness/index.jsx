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
    PiLinkSimpleLight,
    PiBuildingOfficeThin,
} from 'react-icons/pi'
import CardSkeleton from '../../../components/CardSkeleton'
import PaginationHandler from '@/components/PaginationHandler'
import FiltersHandler from '@/components/FiltersHandler'
import useIsAdmin from '../../../hooks/useIsAdmin'

export default function FranchiseYourBusiness() {
    const { user } = useAuth();
    const isAdmin = useIsAdmin();
    const [data, setData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [dataObj, setDataObj] = useState(null)
    const [openModal, setOpenModal] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [itemsPerPage, setItemsPerPage] = useState(6)

    const getAllData = () => {
        setIsLoading(true)
        getData(isAdmin ? "FranchiseYourBusiness" : `FranchiseYourBusiness/referral/${user?.userId}`)
            .then((data) => {
                setIsLoading(false)
                const reversedData = data.reverse()
                setData(reversedData)
                setFilteredData(reversedData)
                console.log(reversedData)
            })
            .catch((error) => {
                setIsLoading(false)
                console.error(error)
            })
    }

    const handleSearch = () => {
        const query = searchQuery.toLowerCase()

        const filtered = data.filter((item) => {
            const name = `${item?.firstName} ${item?.lastName}`.toLowerCase()
            const email = item?.email.toLowerCase()
            const phone = item?.phone.toLowerCase()
            const date = formatDateCustom(item?.docDate).toLowerCase()
            const companyName = item?.companyName.toLowerCase()
            const companyWebsiteUrl = item?.companyWebsiteUrl.toLowerCase()

            return (
                name.includes(query) ||
                email.includes(query) ||
                phone.includes(query) ||
                date.includes(query) ||
                companyName.includes(query) ||
                companyWebsiteUrl.includes(query)
            )
        })

        setFilteredData(filtered)
    }

    useEffect(() => {
        handleSearch()
    }, [searchQuery])

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(Number(e.target.value))
    }

    useEffect(() => {
        getAllData()
    }, [])

    return (
        <div>
            <Card>
                <h4 className="mb-4">Franchise Your Business Inquiries</h4>

                <FiltersHandler
                    placeholder="Search by Name, Email, Phone, Company, or Date"
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
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
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
                                        <div>
                                            <div className="flex justify-between items-center mb-3">
                                                <h6 className="text-gray-900 font-bold capitalize">
                                                    {`${e?.firstName} ${e?.lastName}`}
                                                </h6>
                                            </div>
                                            <div className="flex flex-col gap-1">
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
                                                    <PiBuildingOfficeThin className="text-gray-600" />
                                                    <div className="text-gray-700 capitalize">
                                                        {e?.companyName}
                                                    </div>
                                                </div>

                                                <div className="flex justify-start items-center gap-2">
                                                    <PiCalendarDotsLight className="text-gray-600" />
                                                    <div className="text-gray-700">
                                                        {formatDateCustom(
                                                            e?.docDate,
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
                        <div className="flex justify-start items-center gap-1">
                            <div className="text-gray-800 font-semibold">
                                Company Name:{' '}
                            </div>
                            <div className="text-gray-600">
                                {dataObj?.companyName || '- -'}
                            </div>
                        </div>
                        <div className="flex justify-start items-center gap-1">
                            <div className="text-gray-800 font-semibold">
                                Company Website:{' '}
                            </div>
                            <a href={dataObj?.companyNameUrl} target="_blank">
                                <div className="text-gray-600 cursor-pointer">
                                    {dataObj?.companyWebsiteUrl || '- -'}
                                </div>
                            </a>
                        </div>
                        <div className="flex justify-start items-center gap-1">
                            <div className="text-gray-800 font-semibold">
                                Interested In:{' '}
                            </div>
                            <div className="text-gray-600">
                                {dataObj?.interestedIn || '- -'}
                            </div>
                        </div>
                        <div className="flex justify-start items-center gap-1">
                            <div className="text-gray-800 font-semibold">
                                Note:{' '}
                            </div>
                            <div className="text-gray-600">
                                {dataObj?.note || '- -'}
                            </div>
                        </div>
                    </div>
                    <div className="text-gray-600 text-xs mt-3">
                        {formatDateCustom(dataObj?.docDate)}
                    </div>
                </div>
            )}
        </ModalInternalScroll>
    )
}
