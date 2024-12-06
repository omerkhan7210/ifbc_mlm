import { useAuth } from '@/auth';
import { Card } from '@/components/ui';
import ModalInternalScroll from '@/components/ui/modal/ModalInternalScroll';
import { getData } from '@/services/axios/axiosUtils';
import classNames from '@/utils/classNames';
import { formatDateCustom } from '@/utils/dateUtils';
import React, { useEffect, useState } from 'react';
import { MdEmail, MdPhone } from 'react-icons/md';
import { PiEnvelopeThin, PiPhoneCallLight, PiCalendarDotsLight } from "react-icons/pi";



export default function FranchiseInquiries() {
    const { user } = useAuth();
    const [data, setData] = useState([]);
    const [dataObj, setDataObj] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    const getFranchises = () => {
        getData(`checkout/referral/${user?.userId}`)
            .then((data) => {
                setData([...data]);
                console.log(data);
            })
            .catch(error => console.log(error));
    };

    useEffect(() => {
        getFranchises();
    }, []);

    return (
        <div>
            <Card>
                <h4 className="mb-4">Franchise Inquiries</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-3 gap-5">
                    {data.length > 0 &&
                        data.map((e, i) => (
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
                                            {e?.checkout?.availCapital === 'string' ? 'N/A' : e?.checkout?.availCapital}
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
                        ))}
                </div>
            </Card>
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
            open={openModal} setOpen={setOpenModal}
            width={800}
        >
            {dataObj && (
                <div>
                    <div className="flex justify-between items-center mb-3">
                        <h6 className="text-gray-900 font-bold capitalize">
                            {`${dataObj?.checkout?.firstName} ${dataObj?.checkout?.lastName}`}
                        </h6>
                        <div className='text-gray-600 text-xs'>
                            {formatDateCustom(dataObj?.checkout?.docDate)}
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
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

                        <div className="flex justify-start items-center ">

                        </div>

                    </div>
                </div>
            )}
        </ModalInternalScroll>
    )
}