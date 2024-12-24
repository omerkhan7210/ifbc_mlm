import React from 'react';
import { jsPDF } from 'jspdf';
import Table from '@/components/ui/Table';
import profile from "/images/logo/android-chrome-192x192.png";
import PaginationHandler from '@/components/PaginationHandler';
import { Button } from '../../../components/ui';

const { Tr, Td, TBody, THead, Th } = Table;

const CommissionTable = ({ data = [], totalBouns = [], totalEarnings = [] }) => {
    const allData = [...data, ...totalBouns, ...totalEarnings];
    console.log(allData[0]?.listingDetails?.imgUrl);

    const generatePDF = (commission) => {
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text('Commission Details', 105, 20, { align: 'center' });

        doc.setFontSize(12);
        doc.text(`Commission ID: ${commission?.commissionId || commission?.docId}`, 20, 40);
        doc.text(
            `Candidate Name: ${commission?.candidateDetails?.firstName || commission?.firstName} ${commission?.candidateDetails?.lastName || commission?.lastName}`,
            20,
            50
        );
        doc.text(`Email: ${commission?.candidateDetails?.email || commission?.email}`, 20, 60);
        doc.text(`Phone: ${commission?.candidateDetails?.phone || commission?.phone}`, 20, 70);
        doc.text(`Amount: ${commission?.amount || commission?.refferralId}`, 20, 80);
        doc.text(`Category: ${commission?.listingDetails?.category || commission?.username}`, 20, 90);
        doc.text(`Listing Name: ${commission?.listingDetails?.name || commission?.userType}`, 20, 100);
        doc.text(
            `Commission Date: ${new Date(commission?.commissionDate || commission?.docDate)?.toLocaleString()}`,
            20,
            110
        );
        doc.save(`commission_${commission?.commissionId || commission?.docId}.pdf`);
    };

    const capitalizeFirstLetter = (name) => {
        if (!name) return '';
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    };
    return (
        <div>
            <PaginationHandler
                items={allData}
                itemsPerPage={10}
            >
                {(paginatedItems) => (
                    <Table>
                        <THead>
                            <Tr>
                                <Th>Commission ID</Th>
                                <Th>Profile Image</Th>
                                <Th>User Details</Th>
                                {/* <Th>Email</Th>
                                <Th>Phone</Th> */}
                                <Th>Amount</Th>
                                <Th>Category</Th>
                                <Th>Listing Name</Th>
                                <Th>Commission Date</Th>
                                <Th>Actions</Th>
                            </Tr>
                        </THead>
                        <TBody>
                            {paginatedItems.map((commission) => (
                                <Tr key={commission?.commissionId}>
                                    <Td>{commission?.commissionId}</Td>
                                    <Td>
                                        <img
                                            src={"https://ifbc.co/" + commission?.listingDetails?.imgUrl || profile}
                                            alt="Profile"
                                            style={{ width: "60px", height: "60px", objectFit: "contain" }}
                                        />
                                    </Td>
                                    <Td className="text-center align-middle">
                                        {`${capitalizeFirstLetter(commission?.candidateDetails?.firstName)} ${capitalizeFirstLetter(commission?.candidateDetails?.lastName)}`}<br />
                                        <a
                                            href={`mailto:${commission?.candidateDetails?.email}`}
                                            className="text-blue-500 underline hover:text-blue-700"
                                        >
                                            {commission?.candidateDetails?.email}
                                        </a><br />
                                        <a
                                            href={`tel:${commission?.candidateDetails?.phone}`}
                                            className="text-blue-500 underline hover:text-blue-700"
                                        >
                                            {commission?.candidateDetails?.phone}
                                        </a>
                                    </Td>
                                    {/* <Td>{commission?.candidateDetails?.email}</Td> */}
                                    {/* <Td>{commission?.candidateDetails?.phone}</Td> */}
                                    <Td>{`$ ${commission?.amount}`}</Td>
                                    <Td>{commission?.listingDetails?.category}</Td>
                                    <Td>{commission?.listingDetails?.name}</Td>
                                    <Td>{new Date(commission?.commissionDate)?.toLocaleString()}</Td>
                                    <Td>
                                        {/* <button */}
                                        <Button
                                            onClick={() => generatePDF(commission)}
                                            // className="py-[2px] px-6 bg-[#4CAF50] hover:text-[black] border-none cursor-pointer rounded text-[#FFFF]"
                                            className='bg-[#4CAF50]'
                                        >
                                            Download PDF
                                        </Button>
                                    </Td>
                                </Tr>
                            ))}
                        </TBody>
                    </Table>
                )}
            </PaginationHandler>
        </div>
    );
};

export default CommissionTable;
