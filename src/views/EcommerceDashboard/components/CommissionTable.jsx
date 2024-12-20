import React from 'react'
import { jsPDF } from 'jspdf'
import Table from '@/components/ui/Table'
import profile from "/images/logo/android-chrome-192x192.png"

const { Tr, Td, TBody, THead, Th } = Table

const CommissionTable = ({ data = [], totalBouns = [], totalEarnings = [], subscriptionData = [], user = {} }) => {

    const generatePDF = (commission) => {
        const doc = new jsPDF()

        doc.setFontSize(18)
        doc.text('Commission Details', 105, 20, { align: 'center' })

        doc.setFontSize(12)
        doc.text(`Commission ID: ${commission?.commissionId || commission?.docId}`, 20, 40)
        doc.text(
            `Candidate Name: ${commission?.candidateDetails?.firstName || commission?.firstName} ${commission?.candidateDetails?.lastName || commission?.lastName}`,
            20,
            50
        );
        doc.text(`Email: ${commission?.candidateDetails?.email || commission?.email}`, 20, 60)
        doc.text(`Phone: ${commission?.candidateDetails?.phone || commission?.phone}`, 20, 70)
        doc.text(`Amount: ${commission?.amount || commission?.refferralId}`, 20, 80)
        doc.text(`Category: ${commission?.listingDetails?.category || commission?.username}`, 20, 90)
        doc.text(`Listing Name: ${commission?.listingDetails?.name || commission?.userType}`, 20, 100)
        doc.text(
            `Commission Date: ${new Date(commission?.commissionDate || commission?.docDate)?.toLocaleString()}`,
            20,
            110
        )
        doc.save(`commission_${commission?.commissionId || commission?.docId}.pdf`)
    }
    console.log(subscriptionData, "subscriptionData")
    return (
        <div>
            <Table>
                <THead>
                    {subscriptionData?.length > 0 ?
                        <Tr>
                            <Th>S.NO</Th>
                            <Th>Profile</Th>
                            <Th>Name</Th>
                            <Th>Email</Th>
                            <Th>Phone</Th>
                            <Th>User Name</Th>
                            <Th>Refferral Id</Th>
                            <Th>User Type</Th>
                            <Th>Date</Th>
                            <Th>Actions</Th>
                        </Tr> :
                        // <Tr>
                        //     <Th>Commission ID</Th>
                        //     <Th>Candidate Name</Th>
                        //     <Th>Email</Th>
                        //     <Th>Phone</Th>
                        //     <Th>Amount</Th>
                        //     <Th>Category</Th>
                        //     <Th>Listing Name</Th>
                        //     <Th>Commission Date</Th>
                        //     <Th>Actions</Th>
                        // </Tr>
                        <>efe</>
                    }
                </THead>
                <TBody>
                    {data?.map((commission) => (
                        <Tr key={commission?.commissionId}>
                            <Td>{commission?.commissionId}</Td>
                            <Td>{`${commission?.candidateDetails?.firstName} ${commission?.candidateDetails?.lastName}`}</Td>
                            <Td>{commission?.candidateDetails?.email}</Td>
                            <Td>{commission?.candidateDetails?.phone}</Td>
                            <Td>{commission?.amount}</Td>
                            <Td>{commission?.listingDetails?.category}</Td>
                            <Td>{commission?.listingDetails?.name}</Td>
                            <Td>{new Date(commission?.commissionDate)?.toLocaleString()}</Td>
                            <Td>
                                <button
                                    onClick={() => generatePDF(commission)}
                                    className='py-[2px] px-6 bg-[#4CAF50] border-none cursor-pointer rounded text-[#FFFF]'
                                >
                                    Download PDF
                                </button>
                            </Td>
                        </Tr>
                    ))}
                    {totalBouns?.map((commission) => (
                        <Tr key={commission?.commissionId}>
                            <Td>{commission?.commissionId}</Td>
                            <Td>{`${commission?.candidateDetails?.firstName} ${commission?.candidateDetails?.lastName}`}</Td>
                            <Td>{commission?.candidateDetails?.email}</Td>
                            <Td>{commission?.candidateDetails?.phone}</Td>
                            <Td>{commission?.amount}</Td>
                            <Td>{commission?.listingDetails?.category}</Td>
                            <Td>{commission?.listingDetails?.name}</Td>
                            <Td>{new Date(commission?.commissionDate)?.toLocaleString()}</Td>
                            <Td>
                                <button
                                    onClick={() => generatePDF(commission)}
                                    className='py-[2px] px-6 bg-[#4CAF50] border-none cursor-pointer rounded text-[#FFFF]'
                                >
                                    Download PDF
                                </button>
                            </Td>
                        </Tr>
                    ))}
                    {totalEarnings?.map((commission) => (
                        <Tr key={commission?.commissionId}>
                            <Td>{commission?.commissionId}</Td>
                            <Td>{`${commission?.candidateDetails?.firstName} ${commission?.candidateDetails?.lastName}`}</Td>
                            <Td>{commission?.candidateDetails?.email}</Td>
                            <Td>{commission?.candidateDetails?.phone}</Td>
                            <Td>{commission?.amount}</Td>
                            <Td>{commission?.listingDetails?.category}</Td>
                            <Td>{commission?.listingDetails?.name}</Td>
                            <Td>{new Date(commission?.commissionDate)?.toLocaleString()}</Td>
                            <Td>
                                <button
                                    onClick={() => generatePDF(commission)}
                                    className='py-[2px] px-6 bg-[#4CAF50] border-none cursor-pointer rounded text-[#FFFF]'
                                >
                                    Download PDF
                                </button>
                            </Td>
                        </Tr>
                    ))}
                    {subscriptionData?.map((commission) => (
                        <Tr key={commission?.docId}>
                            <Td>{commission?.docId}</Td>
                            <Td>  <img
                                src={commission?.profileImage || profile}
                                alt="Profile" style={{ width: "40px", height: "40px", }}
                            /></Td>
                            <Td>{`${commission?.firstName} ${commission?.lastName}`}</Td>
                            <Td>{commission?.email}</Td>
                            <Td>{commission?.phone}</Td>
                            <Td>{commission?.username}</Td>
                            <Td>{`${user?.firstName} ${commission.refferralId}`}</Td>
                            <Td>{commission.userType === "A" ? "Ambassador" : "Consultant"}</Td>
                            <Td>{new Date(commission?.docDate).toLocaleString()}</Td>
                            {/* <Td>{new Date(subscription.commissionDate).toLocaleString()}</Td> */}
                            <Td>
                                <button
                                    onClick={() => generatePDF(commission)}
                                    className='py-[2px] px-6 bg-[#4CAF50] border-none cursor-pointer rounded text-[#FFFF]'
                                >
                                    Download PDF
                                </button>
                            </Td>
                        </Tr>
                    ))}
                </TBody>
            </Table >
        </div >
    )
}

export default CommissionTable
