import { useAuth } from '@/auth';
import { Card } from '@/components/ui';
import ModalInternalScroll from '@/components/ui/modal/ModalInternalScroll';
import { getData } from '@/services/axios/axiosUtils';
import { formatDateCustom } from '@/utils/dateUtils';
import React, { useEffect, useState } from 'react';
import { PiEnvelopeThin, PiPhoneCallLight, PiCalendarDotsLight } from "react-icons/pi";
import CardSkeleton from '@/components/CardSkeleton';
import PaginationHandler from '@/components/PaginationHandler';

export default function FranchiseInquiries() {
    const { user } = useAuth();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
    const [dataObj, setDataObj] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [itemsPerPage, setItemsPerPage] = useState(6);

    const getFranchises = () => {
        setIsLoading(true);
        getData(`checkout/referral/${user?.userId}`)
            .then((data) => {
                setIsLoading(false);
                data = data.reverse();
                setData(data);
                setFilteredData(data);
            })
            .catch((error) => {
                setIsLoading(false);
                console.error(error);
            });
    };

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = data.filter(item => {
            const name = `${item?.checkout?.firstName} ${item?.checkout?.lastName}`.toLowerCase();
            const email = item?.checkout?.email.toLowerCase();
            const capital = item?.checkout?.availCapital?.toString().toLowerCase();
            const date = formatDateCustom(item?.checkout?.docDate).toLowerCase();

            return (
                name.includes(query) ||
                email.includes(query) ||
                capital.includes(query) ||
                date.includes(query)
            );
        });

        setFilteredData(filtered);
    };

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(Number(e.target.value));
    };

    useEffect(() => {
        getFranchises();
    }, []);

    return (
        <div>
            <Card>
                <h4 className="mb-4">Franchise Inquiries</h4>

                {/* Filters Section */}
                <div className="mb-4 flex justify-between items-center flex-wrap">

                    {/* Search Input */}

                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearch}
                        placeholder="Search by Name, Email, Available Capital, or Date"
                        className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 w-full md:w-2/4"
                    />

                    {/* Items Per Page Selector */}
                    <select
                        value={itemsPerPage}
                        onChange={handleItemsPerPageChange}
                        className="p-3 border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 w-full md:w-auto"
                        style={{ minWidth: '150px', textAlign: 'center' }}
                    >
                        <option value={6}>6 Items per Page</option>
                        <option value={9}>9 Items per Page</option>
                        <option value={12}>12 Items per Page</option>
                        <option value={15}>15 Items per Page</option>
                    </select>
                </div>

                {/* Paginated Data */}
                <PaginationHandler items={filteredData} itemsPerPage={itemsPerPage}>
                    {(currentData) => (
                        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5">
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
                                            <div className="flex justify-between items-center mb-3">
                                                <h6 className="text-gray-900 font-bold capitalize">
                                                    {`${e?.checkout?.firstName} ${e?.checkout?.lastName}`}
                                                </h6>
                                                <div className="bg-green-100 text-green-700 px-2 py-1 font-bold">
                                                    {e?.checkout?.availCapital === 'string' ? 'N/A' : e?.checkout?.availCapital?.toLocaleString('eng-US')}
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <div className="flex justify-start items-center gap-2">
                                                    <PiEnvelopeThin className="text-gray-600" />
                                                    <div className="text-gray-700 cursor-pointer">
                                                        {e.checkout.email}
                                                    </div>
                                                </div>
                                                <div className="flex justify-start items-center gap-2">
                                                    <PiPhoneCallLight className="text-gray-600" />
                                                    <div className="text-gray-700">
                                                        {e.checkout.phone}
                                                    </div>
                                                </div>
                                                <div className="flex justify-start items-center gap-2">
                                                    <PiCalendarDotsLight className="text-gray-600" />
                                                    <div className="text-gray-700">
                                                        {formatDateCustom(e.checkout.docDate)}
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
            <FranchiseModal
                dataObj={dataObj}
                openModal={openModal}
                setOpenModal={setOpenModal}
            />
        </div>
    );
}

const FranchiseModal = ({ dataObj, openModal, setOpenModal }) => {
    return (
        <ModalInternalScroll
            title="Franchise Inquiry Details"
            open={openModal}
            setOpen={setOpenModal}
            width={800}
        >
            {dataObj && (
                <div>
                    <div className="flex justify-between items-center mb-3">

                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 '>

                        <div className='h-full flex flex-col justify-between gap-5'>

                            <div className="flex flex-col gap-1 border-gray-200 border-r-2 mr-10 ">
                                <h5 className='mb-2'>Candidate Details</h5>

                                <div className="flex justify-start items-center gap-1 capitalize">
                                    <div className='text-gray-800 font- '>Name: </div>
                                    {`${dataObj?.checkout?.firstName} ${dataObj?.checkout?.lastName}`}
                                </div>

                                <div className="flex justify-start items-center gap-1">
                                    <div className='text-gray-800 font-semibold'>Email: </div>
                                    <a href={`mailto:${dataObj?.checkout?.email}`} className="text-gray-600 cursor-pointer">
                                        {dataObj?.checkout?.email}
                                    </a>
                                </div>
                                <div className="flex justify-start items-center gap-1">
                                    <div className='text-gray-800 font-semibold '>Phone: </div>
                                    <a href={`tel:${dataObj?.checkout?.phone}`} className="text-gray-600">
                                        {dataObj?.checkout?.phone}
                                    </a>
                                </div>

                                <div className="flex justify-start items-center gap-1">
                                    <div className='text-gray-800 font-semibold'>Available Capital: </div>
                                    <div className='text-gray-600'>${dataObj?.checkout?.availCapital}</div>
                                </div>


                                <div className="flex justify-start items-center gap-1">
                                    <div className='text-gray-800 font-semibold'>Desired Location: </div>
                                    <div className='text-gray-600'>{dataObj?.checkout?.desiredLoc}</div>
                                </div>


                                <div className="flex justify-start items-center gap-1">
                                    <div className='text-gray-800 font-semibold'>Time Frame: </div>
                                    <div className='text-gray-600'>{dataObj?.checkout?.timeFrame}</div>
                                </div>


                                <div className="flex justify-start items-center gap-1">
                                    <div className='text-gray-800 font-semibold'>Zip Code: </div>
                                    <div className='text-gray-600'>{dataObj?.checkout?.zipcode}</div>
                                </div>




                            </div>

                            <div className='text-gray-600 text-xs'>
                                {formatDateCustom(dataObj?.checkout?.docDate)}
                            </div>

                        </div>

                        <div>
                            <h5 className='mb-3'>Interested Franchises</h5>
                            {dataObj.listings && dataObj?.listings.length > 0 &&
                                dataObj.listings.map(listing => (
                                    <div className='my-8 flex justify-start items-center gap-5'>
                                        <img
                                            src={'https://ifbc.co/' + listing?.imgUrl}
                                            className='w-40 '
                                            alt="img" />
                                        <div  >
                                            <div className='text-gray-700 text-sm font-semibold' >{listing?.name}</div>
                                            <div className='text-gray-700 text-xs' >{listing?.category}</div>

                                        </div>
                                        <hr />
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            )}
        </ModalInternalScroll>
    )
}