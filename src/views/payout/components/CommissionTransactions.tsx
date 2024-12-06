import { Card, Pagination } from '@/components/ui';
import classNames from '@/utils/classNames';
import { formatDateCustom } from '@/utils/dateUtils';
import { useState } from 'react';
import transactions from '@/local/data/deals.json'

const shares = {
  consultantShare: 15,
  seniorConsultantShare: 5,
  brokerShare: 2,
  ambassadorAmount: 1500
}



export default function CommissionTransactions() {
  const itemsPerPage = 6;
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
        <h3 className='mb-5 text-center' >Closed Deals Commission Details</h3>
        {/* headings */}

        <div className='grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5'>
          {currentTransactions.length > 0 &&
            currentTransactions.map((e, i) => (
              <div
                className={classNames(
                  'rounded-2xl p-4 flex flex-col justify-center bg-slate-100')}
              >
                <div className="">
                  <h6 className=" text-gray-900 text-center font-bold">{e?.franchise}</h6>
                  <h6 className="text-gray-900 text-center text-green-700">$ {e?.dealAmount.toLocaleString()}</h6>
                  <div className='flex justify- items-center mb-3'>
                  </div>
                  <div className='flex flex-col gap-1'>

                    <div className='flex justify-between items-center'>
                      <div className='text-sm'>
                        <span className='text-gray-800 font-bold' > Candidate: </span>
                        {' ' + e?.candidateName}
                      </div>
                    </div>


                    <div className='flex justify-between items-center'>
                      <div className='text-sm'>
                        <span className='text-gray-800 font-bold' > Consultant: </span>
                        <br className='block md:hidden' />
                        {' ' + e?.consultant}
                      </div>
                      <div className='text-green-700 bg-green-100 px-2 py-1 text-xs font-semibold'>
                        ${e?.ambassador ? ((shares?.consultantShare / 100 * e?.dealAmount) - 1500).toFixed(2) : (shares?.consultantShare / 100 * e?.dealAmount).toFixed(2)}
                      </div>
                    </div>

                    <div className='flex justify-between items-center'>
                      <div className='text-sm'>
                        <span className='text-gray-800 font-bold' >Senior Consultant: </span>
                        <br className='block md:hidden' />
                        {' ' + e?.seniorConsultant}
                      </div>
                      <div className='text-green-700 bg-green-100 px-2 py-1 text-xs font-semibold'>
                        ${' ' + (shares?.seniorConsultantShare / 100 * e?.dealAmount).toFixed(2)}
                      </div>
                    </div>


                    <div className='flex justify-between items-center'>
                      <div className='text-sm'>
                        <span className='text-gray-800 font-bold' >Broker: </span>
                        <br className='block md:hidden' />
                        {' ' + e?.broker}
                      </div>
                      <div className='text-green-700 bg-green-100 px-2 py-1 text-xs font-semibold'>
                        ${' ' + (shares?.brokerShare / 100 * e?.dealAmount).toFixed(2)}
                      </div>
                    </div>


                    <div className='flex justify-between items-center'>
                      <div className='text-sm'>
                        <span className='text-gray-800 font-bold' >Ambassador: </span>
                        <br className='block md:hidden' />

                        {' ' + e?.ambassador || '- -'}
                      </div>
                      <div className='text-green-700 bg-green-100 px-2 py-1 text-xs font-semibold'>
                        $ 1500
                      </div>
                    </div>

                    <div className='text-xs text-gray-700 text-center mt-2' >{formatDateCustom(e?.closingDate)}</div>

                  </div>
                </div>
              </div>
            ))
          }
        </div>



        {/* Pagination */}
        <div
          className='flex justify-center mt-3'
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


