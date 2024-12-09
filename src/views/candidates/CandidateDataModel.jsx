import ModalInternalScroll from '@/components/ui/modal/ModalInternalScroll'
import { formatDateCustom } from '@/utils/dateUtils'
import React from 'react'
import { useAuth } from '@/auth'

const InfoRow = ({ label, value, isLink, linkType }) => (
    <div className="flex justify-start items-center gap-1">
        <div className="text-gray-800 font-semibold">{label}:</div>
        {isLink ? (
            <a
                href={`${linkType}:${value}`}
                className="text-gray-600 cursor-pointer"
            >
                {value}
            </a>
        ) : (
            <div className="text-gray-600">{value}</div>
        )}
    </div>
)

const CandidateDataModel = ({ dataObj, openModal, setOpenModal, title }) => {
    const { user } = useAuth()
    return (
        <ModalInternalScroll
            title={`${title} Details`}
            open={openModal}
            setOpen={setOpenModal}
            width={1200}
        >
            {dataObj && (
                <div className="grid grid-cols-1 md:grid-cols-3 divide-x-2 divide-gray-200">
                    <div className="h-full flex flex-col justify-between gap-2">
                        <div className="flex flex-col gap-1">
                            <h5 className="mb-2">Candidate Details</h5>
                            <InfoRow
                                label="Name"
                                value={`${dataObj?.candidate?.firstName} ${dataObj?.candidate?.lastName}`}
                            />
                            <InfoRow
                                label="Email"
                                value={dataObj?.candidate?.email}
                                isLink
                                linkType="mailto"
                            />
                            <InfoRow
                                label="Phone"
                                value={dataObj?.candidate?.phone}
                                isLink
                                linkType="tel"
                            />
                            <InfoRow
                                label="Territory State"
                                value={dataObj?.candidate?.territoryState}
                            />
                            <InfoRow
                                label="Territory City"
                                value={dataObj?.candidate?.territoryCity}
                            />
                            <InfoRow
                                label="Territory Zipcode"
                                value={dataObj?.candidate?.territoryZipcode}
                            />
                            <InfoRow
                                label="Current State"
                                value={dataObj?.candidate?.currentState}
                            />
                            <InfoRow
                                label="Current City"
                                value={dataObj?.candidate?.currentCity}
                            />
                            <InfoRow
                                label="Current Zipcode"
                                value={dataObj?.candidate?.currentZipcode}
                            />
                        </div>
                        <div className="text-gray-600 text-xs">
                            {formatDateCustom(dataObj?.candidate?.docDate)}
                        </div>
                    </div>

                    <div id="referral-details" className="pl-5">
                        <h5 className="mb-2">Consultant Details</h5>
                        {dataObj?.candidate?.refferralId !== 0 && (
                            <InfoRow
                                label="Referral Consultant Name"
                                value={dataObj?.candidate?.refferralId}
                            />
                        )}
                        <InfoRow
                            label="Name"
                            value={`${user?.firstName} ${user?.lastName}`}
                        />
                        <InfoRow label="Email" value={user?.email} />
                        <InfoRow
                            label="Phone"
                            value={user?.companyPhoneNumber || user?.phone}
                        />
                    </div>

                    <div id="franchise-details" className="pl-5">
                        <h5 className="mb-1">Interested Franchises</h5>
                        {dataObj.listings &&
                            dataObj?.listings.length > 0 &&
                            dataObj.listings.map((listing) => (
                                <div
                                    className="flex justify-start items-center gap-5"
                                    key={listing?.id}
                                >
                                    <img
                                        src={
                                            'https://ifbc.co/' + listing?.imgUrl
                                        }
                                        className="w-24"
                                        alt="img"
                                    />
                                    <div>
                                        <div className="text-gray-700 text-sm font-semibold">
                                            {listing?.name}
                                        </div>
                                        <div className="text-gray-700 text-xs">
                                            {listing?.category}
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            ))}
                    </div>
                </div>
            )}
        </ModalInternalScroll>
    )
}
export default CandidateDataModel
