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
} from 'react-icons/pi'
import { CiMapPin } from 'react-icons/ci'
import CardSkeleton from '../../../components/CardSkeleton'
import PaginationHandler from '@/components/PaginationHandler'
import FiltersHandler from '@/components/FiltersHandler'
import useIsAdmin from '../../../hooks/useIsAdmin'

export default function ContactUs() {
    const { user } = useAuth()
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
        getData(isAdmin ? 'ContactUs' : `ContactUs/referral/${user?.userId}`)
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

        /**
         * Filters the data array based on the query string.
         *
         * @param {Array} data - The array of contact objects to be filtered.
         * @param {string} query - The search query string used to filter the data.
         * @returns {Array} - The filtered array of contact objects that match the query.
         *
         * Each contact object is expected to have the following properties:
         * - contactName {string}: The name of the contact.
         * - contactEmail {string}: The email of the contact.
         * - contactPhone {string}: The phone number of the contact.
         * - contactDate {string}: The date associated with the contact.
         *
         * The function performs a case-insensitive search on the contactName, contactEmail, contactPhone, and contactDate fields.
         */
        const filtered = data.filter((item) => {
            const name = item.contactName.toLowerCase()
            const email = item?.contactEmail.toLowerCase()
            const phone = item?.contactPhone.toLowerCase()
            const date = formatDateCustom(item?.contactDate).toLowerCase()
            const reason = item?.contactReason.toLowerCase()

            return (
                name.includes(query) ||
                email.includes(query) ||
                phone.includes(query) ||
                date.includes(query) ||
                reason.includes(query)
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
                <h4 className="mb-4">Contact Us Inquiries</h4>

                <FiltersHandler
                    placeholder="Search by Name, Email, Phone, Contact Reason, or Date"
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
                                                    {e?.contactName}
                                                </h6>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <div className="flex justify-start items-center gap-2">
                                                    <PiEnvelopeThin className="text-gray-600" />
                                                    <div className="text-gray-700 cursor-pointer">
                                                        {e?.contactEmail}
                                                    </div>
                                                </div>
                                                <div className="flex justify-start items-center gap-2">
                                                    <PiPhoneCallLight className="text-gray-600" />
                                                    <div className="text-gray-700">
                                                        {e?.contactPhone}
                                                    </div>
                                                </div>
                                                <div className="flex justify-start items-center gap-2">
                                                    <PiCalendarDotsLight className="text-gray-600" />
                                                    <div className="text-gray-700">
                                                        {formatDateCustom(
                                                            e?.contactDate,
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
                            {dataObj?.contactName || '- -'}
                        </div>
                        <div className="flex justify-start items-center gap-1">
                            <div className="text-gray-800 font-semibold">
                                Email:{' '}
                            </div>
                            <a
                                href={`mailto:${dataObj?.email}`}
                                className="text-gray-600 cursor-pointer"
                            >
                                {dataObj?.contactEmail || '- -'}
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
                                {dataObj?.contactPhone || '- -'}
                            </a>
                        </div>
                        <div className="flex justify-start items-center gap-1">
                            <div className="text-gray-800 font-semibold">
                                Contact Path:{' '}
                            </div>
                            <div className="text-gray-600">
                                {dataObj?.contactPath || '- -'}
                            </div>
                        </div>
                        <div className="flex justify-start items-center gap-1">
                            <div className="text-gray-800 font-semibold">
                                Contact Company:{' '}
                            </div>
                            <div className="text-gray-600">
                                {dataObj?.contactCompany || '- -'}
                            </div>
                        </div>
                        <div className="flex justify-start items-center gap-1">
                            <div className="text-gray-800 font-semibold">
                                Contact Reason:{' '}
                            </div>
                            <div className="text-gray-600">
                                {dataObj?.contactReason || '- -'}
                            </div>
                        </div>
                        <div className="flex justify-start items-center gap-1">
                            <div className="text-gray-800 font-semibold">
                                Comments:{' '}
                            </div>
                            <div className="text-gray-600">
                                {dataObj?.contactComments || '- -'}
                            </div>
                        </div>
                    </div>
                    <div className="text-gray-600 text-xs mt-3">
                        {formatDateCustom(dataObj?.contactDate)}
                    </div>
                </div>
            )}
        </ModalInternalScroll>
    )
}
