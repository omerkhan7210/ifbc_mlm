import React from 'react'
import { jsPDF } from 'jspdf'
import Table from '@/components/ui/Table'

const { Tr, Td, TBody, THead, Th } = Table

const CommissionTable = ({ data = [], totalBouns = [], totalEarnings = [] }) => {


    const generatePDF = (commission) => {
        const doc = new jsPDF()

        doc.setFontSize(18)
        doc.text('Commission Details', 105, 20, { align: 'center' })

        doc.setFontSize(12)
        doc.text(`Commission ID: ${commission.commissionId}`, 20, 40)
        doc.text(
            `Candidate Name: ${commission.candidateDetails.firstName} ${commission.candidateDetails.lastName}`,
            20,
            50
        )
        doc.text(`Email: ${commission.candidateDetails.email}`, 20, 60)
        doc.text(`Phone: ${commission.candidateDetails.phone}`, 20, 70)
        doc.text(`Amount: ${commission.amount}`, 20, 80)
        doc.text(`Category: ${commission.listingDetails.category}`, 20, 90)
        doc.text(`Listing Name: ${commission.listingDetails.name}`, 20, 100)
        doc.text(
            `Commission Date: ${new Date(commission.commissionDate).toLocaleString()}`,
            20,
            110
        )
        doc.save(`commission_${commission.commissionId}.pdf`)
    }

    return (
        <div>
            <Table>
                <THead>
                    <Tr>
                        <Th>Commission ID</Th>
                        <Th>Candidate Name</Th>
                        <Th>Email</Th>
                        <Th>Phone</Th>
                        <Th>Amount</Th>
                        <Th>Category</Th>
                        <Th>Listing Name</Th>
                        <Th>Commission Date</Th>
                        <Th>Actions</Th>
                    </Tr>
                </THead>
                <TBody>
                    {data.map((commission) => (
                        <Tr key={commission.commissionId}>
                            <Td>{commission.commissionId}</Td>
                            <Td>{`${commission.candidateDetails.firstName} ${commission.candidateDetails.lastName}`}</Td>
                            <Td>{commission.candidateDetails.email}</Td>
                            <Td>{commission.candidateDetails.phone}</Td>
                            <Td>{commission.amount}</Td>
                            <Td>{commission.listingDetails.category}</Td>
                            <Td>{commission.listingDetails.name}</Td>
                            <Td>{new Date(commission.commissionDate).toLocaleString()}</Td>
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
                    {totalBouns.map((commission) => (
                        <Tr key={commission.commissionId}>
                            <Td>{commission.commissionId}</Td>
                            <Td>{`${commission.candidateDetails.firstName} ${commission.candidateDetails.lastName}`}</Td>
                            <Td>{commission.candidateDetails.email}</Td>
                            <Td>{commission.candidateDetails.phone}</Td>
                            <Td>{commission.amount}</Td>
                            <Td>{commission.listingDetails.category}</Td>
                            <Td>{commission.listingDetails.name}</Td>
                            <Td>{new Date(commission.commissionDate).toLocaleString()}</Td>
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
                    {totalEarnings.map((commission) => (
                        <Tr key={commission.commissionId}>
                            <Td>{commission.commissionId}</Td>
                            <Td>{`${commission.candidateDetails.firstName} ${commission.candidateDetails.lastName}`}</Td>
                            <Td>{commission.candidateDetails.email}</Td>
                            <Td>{commission.candidateDetails.phone}</Td>
                            <Td>{commission.amount}</Td>
                            <Td>{commission.listingDetails.category}</Td>
                            <Td>{commission.listingDetails.name}</Td>
                            <Td>{new Date(commission.commissionDate).toLocaleString()}</Td>
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
            </Table>
        </div>
    )
}

export default CommissionTable
