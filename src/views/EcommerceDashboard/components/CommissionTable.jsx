import React from 'react'
import Table from '@/components/ui/Table'
import Profile from "../../../../public/images/logo/android-chrome-192x192.png"

const { Tr, Td, TBody, THead, Th } = Table

const CommissionTable = ({ data }) => {
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
                        {/* <Th>Listing Image</Th> */}
                        <Th>Commission Date</Th>
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
                            {/* <Td><img src={commission?.listingDetails?.imgUrl || Profile} alt="Listing Image" /></Td> */}
                            <Td>{new Date(commission.commissionDate).toLocaleString()}</Td>
                        </Tr>
                    ))}
                </TBody>
            </Table>
        </div>
    )
}

export default CommissionTable
