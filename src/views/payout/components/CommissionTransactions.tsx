import { Card } from '@/components/ui';
import classNames from '@/utils/classNames';
import { formatDateCustom } from '@/utils/dateUtils';
import PaginationHandler from '@/components/PaginationHandler';
import transactions from '@/local/data/deals.json';

const shares = {
  consultantShare: 15,
  seniorConsultantShare: 5,
  brokerShare: 2,
  ambassadorAmount: 1500,
};

export default function CommissionTransactions() {
  return (
    <div>
      <Card>
        <h3 className="mb-5 text-center">Closed Deals Commission Details</h3>
        <PaginationHandler items={transactions} itemsPerPage={6}>
          {(currentTransactions) => (
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5">
              {currentTransactions.map((e, i) => (
                <div
                  key={i}
                  className={classNames(
                    'rounded-2xl p-4 flex flex-col justify-center bg-slate-100'
                  )}
                >
                  <div>
                    <h6 className="text-gray-900 text-center font-bold">{e?.franchise}</h6>
                    <h6 className="text-gray-900 text-center text-green-700">
                      $ {e?.dealAmount.toLocaleString()}
                    </h6>
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between items-center">
                        <div className="text-sm">
                          <span className="text-gray-800 font-bold">Candidate: </span>
                          {' ' + e?.candidateName}
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-sm">
                          <span className="text-gray-800 font-bold">Consultant: </span>
                          <br className="block md:hidden" />
                          {' ' + e?.consultant}
                        </div>
                        <div className="text-green-700 bg-green-100 px-2 py-1 text-xs font-semibold">
                          ${e?.ambassador
                            ? ((shares?.consultantShare / 100) * e?.dealAmount - 1500).toFixed(2)
                            : (shares?.consultantShare / 100 * e?.dealAmount).toFixed(2)}
                        </div>
                      </div>
                      <div className="text-xs text-gray-700 text-center mt-2">
                        {formatDateCustom(e?.closingDate)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </PaginationHandler>
      </Card>
    </div>
  );
}
