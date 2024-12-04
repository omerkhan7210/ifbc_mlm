import { Card, Pagination } from '@/components/ui';
import classNames from '@/utils/classNames';
import { formatDateCustom } from '@/utils/dateUtils';
import { useState } from 'react';

const shares = {
  consultantShare: 15,
  seniorConsultantShare: 5,
  brokerShare: 2,
  ambassadorAmount: 1500
}


const transactions = [
  {
    id: 1201,
    franchise: 'The Brothers That Just Do Gutters',
    dealAmount: 43000,
    consultant: 'Ali Rehman',
    seniorConsultant: 'Zeeshan Sadiq',
    broker: 'Saima Basheer',
    closingDate: '2024-02-15T05:16:00-08:00',
    ambassador: 'Rehan Nazir'
  },
  {
    id: 1202,
    franchise: 'Bright Future Landscaping',
    dealAmount: 52000,
    consultant: 'Sana Khan',
    seniorConsultant: 'Ahmed Raza',
    broker: 'Kamran Tariq',
    closingDate: '2024-03-10T14:30:00-08:00',
    ambassador: 'Nida Farooq'
  },
  {
    id: 1203,
    franchise: 'Eco-Friendly Cleaners',
    dealAmount: 67000,
    consultant: 'Sara Malik',
    seniorConsultant: 'Usman Ali',
    broker: 'Hira Shah',
    closingDate: '2024-04-20T10:45:00-08:00',
    ambassador: 'Bilal Aslam'
  },
  {
    id: 1204,
    franchise: 'HomeSafe Inspections',
    dealAmount: 38000,
    consultant: 'Hassan Javed',
    seniorConsultant: 'Yasmin Iqbal',
    broker: 'Naveed Khan',
    closingDate: '2024-01-12T09:00:00-08:00',
    ambassador: 'Tariq Mehdi'
  },
  {
    id: 1205,
    franchise: 'Green Energy Solutions',
    dealAmount: 45000,
    consultant: 'Zara Yousaf',
    seniorConsultant: 'Fahad Mustafa',
    broker: 'Amna Iqbal',
    closingDate: '2024-06-25T16:00:00-08:00',
    ambassador: 'Nashit Ali'
  },
  {
    id: 1206,
    franchise: 'Urban Farmstead',
    dealAmount: 60000,
    consultant: 'Hamza Ahmed',
    seniorConsultant: 'Maria Qureshi',
    broker: 'Imran Nazir',
    closingDate: '2024-05-18T11:30:00-08:00',
    ambassador: 'Saba Rehman'
  },
  {
    id: 1207,
    franchise: 'Speedy Car Wash',
    dealAmount: 39000,
    consultant: 'Farah Nadeem',
    seniorConsultant: 'Hammad Saeed',
    broker: 'Kashif Malik',
    closingDate: '2024-07-22T08:00:00-08:00',
    ambassador: 'Adil Mehmood'
  }
];


export default function CommissionTransactions() {
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
        <h4 className='mb-5' >Closed Deals Commission Details</h4>
        {/* headings */}

        <div className='grid grid-cols-3 gap-5'>
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
                        <span className='text-gray-800 font-bold' > Consultant: </span>
                        {' ' + e?.consultant}
                      </div>
                      <div className='text-green-700 bg-green-100 px-2 py-1 text-xs font-semibold'>
                        ${' ' + (shares?.consultantShare / 100 * e?.dealAmount).toFixed(2)}
                      </div>
                    </div>

                    <div className='flex justify-between items-center'>
                      <div className='text-sm'>
                        <span className='text-gray-800 font-bold' >Senior Consultant: </span>
                        {' ' + e?.seniorConsultant}
                      </div>
                      <div className='text-green-700 bg-green-100 px-2 py-1 text-xs font-semibold'>
                        ${' ' + (shares?.seniorConsultantShare / 100 * e?.dealAmount).toFixed(2)}
                      </div>
                    </div>


                    <div className='flex justify-between items-center'>
                      <div className='text-sm'>
                        <span className='text-gray-800 font-bold' >Broker: </span>
                        {' ' + e?.broker}
                      </div>
                      <div className='text-green-700 bg-green-100 px-2 py-1 text-xs font-semibold'>
                        ${' ' + (shares?.brokerShare / 100 * e?.dealAmount).toFixed(2)}
                      </div>
                    </div>


                    <div className='flex justify-between items-center'>
                      <div className='text-sm'>
                        <span className='text-gray-800 font-bold' >Ambassador: </span>
                        {' ' + e?.ambassador || '- -'}
                      </div>
                      <div className='text-green-700 bg-green-100 px-2 py-1 text-xs font-semibold'>
                        ${' ' + (shares?.brokerShare / 100 * e?.dealAmount).toFixed(2)}
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


