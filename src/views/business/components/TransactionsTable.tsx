import { Card, Pagination } from '@/components/ui';
import { formatDateCustom } from '@/utils/dateUtils';
import { useState } from 'react';
import transactions from '../data/Transations.json'


export default function TransactionsTable() {
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState<number>(1);

    // Calculate the total number of pages
    const totalTransactions = transactions.length;
    const totalPages = Math.ceil(totalTransactions / itemsPerPage);

    // Get the transactions for the current page
    const currentTransactions = transactions.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <Card>
                {/* headings */}
                <div className="hidden md:block">
                    <div className="grid grid-cols-5 pb-3 mb-3 border-gray-400 border-b-2">
                        <div className="text-sm font-semibold ">Transaction Id</div>
                        <div className="text-sm font-semibold ">Member Name</div>
                        <div className="text-sm font-semibold ">Category</div>
                        <div className="text-sm font-semibold ">Amount</div>
                        <div className="text-sm font-semibold ">Transaction Date</div>
                    </div>
                </div>

                {/* table body */}
                {currentTransactions.length > 0 &&
                    currentTransactions.map((e, i) => (
                        <div
                            key={i}
                            className="grid grid-cols-1 md:grid-cols-5 py-2 my-2 border-gray-100 border-b-2"
                        >
                            <div className="text-sm flex items-center gap-3 mb-1 ">
                                <span className='font-semibold block md:hidden'>Transaction ID: </span>
                                {e?.transactionId}
                            </div>

                            <div className="text-sm flex items-center gap-3 mb-1 ">
                                <span className='font-semibold block md:hidden'>Member Name: </span>
                                {e?.memberName}
                            </div>
                            <div className="text-sm flex items-center gap-3 mb-1 ">
                                <span className='font-semibold block md:hidden'>Category: </span>
                                {e?.category}
                            </div>
                            <div
                                className={`text-sm font-semibold flex items-center gap-3 mb-1 ${e?.transactionType === 'credit' ? 'text-green-700' : 'text-red-600 '}`}
                            >
                                <span className='font-semibold block md:hidden text-gray-500 '>Amount: </span>
                                $ {e?.amount}
                            </div>
                            <div className="text-xs flex items-center gap-3 mb-1 ">
                                <span className='font-semibold block md:hidden'>Date: </span>
                                {formatDateCustom(e?.transactionDate)}
                            </div>
                        </div>
                    ))
                }

                {/* Pagination */}
                <div
                    className='flex justify-center'
                >
                    <Pagination
                        currentPage={currentPage}
                        total={totalTransactions}
                        pageSize={itemsPerPage}
                        onChange={handlePageChange}
                    />
                </div>

            </Card>
        </div>
    );
}
