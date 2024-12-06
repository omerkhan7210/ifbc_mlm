import { useAuth } from '@/auth';
import { Card } from '@/components/ui';
import ModalInternalScroll from '@/components/ui/modal/ModalInternalScroll';
import { getData } from '@/services/axios/axiosUtils';
import { formatDateCustom } from '@/utils/dateUtils';
import React, { useEffect, useState } from 'react';
import { PiEnvelopeThin, PiPhoneCallLight, PiCalendarDotsLight } from "react-icons/pi";
import CardSkeleton from './../../components/CardSkeleton'

export default function BecomeConsultant() {
    const { user } = useAuth();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [dataObj, setDataObj] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    const getAllData = () => {
        setIsLoading(true);
        getData(`BecomeConsultant/referral/${user?.userId}`)
            .then((data) => {
                setIsLoading(false)
                setData([...data]);
                console.log(data);
            })
            .catch(error => {
                setIsLoading(false);
                console.log(error)
            });
    };

    useEffect(() => {
        getAllData();
    }, []);

    return (
        <div>
            <Card>
                <h4 className="mb-4">Become Consultant Inquiries</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-3 gap-5">
                    {isLoading
                        ? Array(6).fill(0)
                            .map((_, index) => <CardSkeleton key={index} />)
                        : data.length > 0 &&
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
                                            <PiCalendarDotsLight className="text-gray-600" />
                                            <div className="text-gray-700">
                                                {formatDateCustom(e?.docDate)}
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </Card>
                        ))}
                </div>
            </Card>
            <DataModal
                dataObj={dataObj}
                openModal={openModal}
                setOpenModal={setOpenModal}
            />
        </div>
    );
}


const DataModal = ({ dataObj, openModal, setOpenModal }) => {
    return (
        <ModalInternalScroll
            title="Franchise Inquiry Details"
            open={openModal}
            setOpen={setOpenModal}
        >
            {dataObj && (
                <div>




                    <div className='h-full flex flex-col justify-between gap-5'>

                        <div className="flex flex-col gap-1  ">
                            {/* <h5 className='mb-2'>All Details</h5> */}

                            <div className="flex justify-start items-center gap-1 capitalize">
                                <div className='text-gray-800 font-semibold '>Name: </div>
                                {`${dataObj?.firstName} ${dataObj?.lastName}`}
                            </div>

                            <div className="flex justify-start items-center gap-1">
                                <div className='text-gray-800 font-semibold'>Email: </div>
                                <a href={`mailto:${dataObj?.email}`} className="text-gray-600 cursor-pointer">
                                    {dataObj?.email}
                                </a>
                            </div>
                            <div className="flex justify-start items-center gap-1">
                                <div className='text-gray-800 font-semibold '>Phone: </div>
                                <a href={`tel:${dataObj?.phone}`} className="text-gray-600">
                                    {dataObj?.phone}
                                </a>
                            </div>

                            <div className="flex justify-start items-center gap-1">
                                <div className='text-gray-800 font-semibold'>Address: </div>
                                <div className='text-gray-600'>{`${dataObj?.street}, ${dataObj?.city}, ${dataObj?.state}, ${dataObj?.postal}`}</div>
                            </div>


                            <div className="flex justify-start items-center gap-1">
                                <div className='text-gray-800 font-semibold'>Geographical: </div>
                                <div className='text-gray-600'>{dataObj?.geographical}</div>
                            </div>


                            <div className="flex justify-start items-center gap-1">
                                <div className='text-gray-800 font-semibold'>Employed: </div>
                                <div className='text-gray-600'>{dataObj?.employed}</div>
                            </div>



                            <div className="flex justify-start items-center gap-1">
                                <div className='text-gray-800 font-semibold'>Networking: </div>
                                <div className='text-gray-600'>{dataObj?.networking}</div>
                            </div>


                            <div className="flex justify-start items-center gap-1">
                                <div className='text-gray-800 font-semibold'>Presentations: </div>
                                <div className='text-gray-600'>{dataObj?.presentations}</div>
                            </div>

                            <div className="flex justify-start items-center gap-1">
                                <div className='text-gray-800 font-semibold'>Hear About : </div>
                                <div className='text-gray-600'>{dataObj?.hearAboutSpecify}</div>
                            </div>

                        </div>

                        <div className='text-gray-600 text-xs'>
                            {formatDateCustom(dataObj?.docDate)}
                        </div>

                    </div>

                </div>
            )}
        </ModalInternalScroll>
    )
}
