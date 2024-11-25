import Loading from '@/components/shared/Loading'
import Overview from './components/Overview'
import CustomerDemographic from './components/CustomerDemographic'
import RecentOrder from './components/RecentOrder'
import SalesTarget from './components/SalesTarget'
import TopProduct from './components/TopProduct'
import RevenueByChannel from './components/RevenueByChannel'
import Home from '../Home'
// import { apiGetEcommerceDashboard } from '@/services/DashboardService'
// import useSWR from 'swr'
// import type { GetEcommerceDashboardResponse } from './types'

const SalesDashboard = () => {
    // const { data, isLoading } = useSWR(
    //     ['/api/dashboard/ecommerce'],
    //     () => apiGetEcommerceDashboard<GetEcommerceDashboardResponse>(),
    //     {
    //         revalidateOnFocus: false,
    //         revalidateIfStale: false,
    //         revalidateOnReconnect: false,
    //     },
    // )

    const data = {
        statisticData: {
            totalProfit: {
                thisWeek: {
                    value: 21827.13,
                    growShrink: 11.4,
                    comparePeriod: 'from last week',
                    chartData: {
                        series: [
                            {
                                name: 'Sales',
                                data: [24, 28, 21, 34, 30, 44, 25],
                            },
                        ],
                        date: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    },
                },
                thisMonth: {
                    value: 82373.21,
                    growShrink: 3.4,
                    comparePeriod: 'from last month',
                    chartData: {
                        series: [
                            {
                                name: 'Sales',
                                data: [
                                    242, 334, 297, 364, 342, 431, 368, 477, 398,
                                    489, 364, 571,
                                ],
                            },
                        ],
                        date: [
                            '01 Jun',
                            '02 Jun',
                            '03 Jun',
                            '04 Jun',
                            '05 Jun',
                            '06 Jun',
                            '07 Jun',
                            '08 Jun',
                            '09 Jun',
                            '10 Jun',
                            '11 Jun',
                            '12 Jun',
                        ],
                    },
                },
                thisYear: {
                    value: 329489.21,
                    growShrink: 5.1,
                    comparePeriod: 'from last month',
                    chartData: {
                        series: [
                            {
                                name: 'Sales',
                                data: [
                                    240, 255, 210, 275, 230, 280, 220, 340, 305,
                                    350, 300, 420,
                                ],
                            },
                        ],
                        date: [
                            'Jan',
                            'Feb',
                            'Mar',
                            'Apr',
                            'May',
                            'Jun',
                            'Jul',
                            'Aug',
                            'Sep',
                            'Oct',
                            'Nov',
                            'Dec',
                        ],
                    },
                },
            },
            totalOrder: {
                thisWeek: {
                    value: 1782,
                    growShrink: 9.2,
                    comparePeriod: 'from last week',
                    chartData: {
                        series: [
                            {
                                name: 'Orders',
                                data: [14, 18, 12, 24, 20, 27, 16],
                            },
                        ],
                        date: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    },
                },
                thisMonth: {
                    value: 7234,
                    growShrink: -2.8,
                    comparePeriod: 'from last month',
                    chartData: {
                        series: [
                            {
                                name: 'Orders',
                                data: [
                                    124, 173, 156, 183, 171, 211, 188, 244, 202,
                                    258, 192, 271,
                                ],
                            },
                        ],
                        date: [
                            '01 Jun',
                            '02 Jun',
                            '03 Jun',
                            '04 Jun',
                            '05 Jun',
                            '06 Jun',
                            '07 Jun',
                            '08 Jun',
                            '09 Jun',
                            '10 Jun',
                            '11 Jun',
                            '12 Jun',
                        ],
                    },
                },
                thisYear: {
                    value: 28349,
                    growShrink: 2.4,
                    comparePeriod: 'from last year',
                    chartData: {
                        series: [
                            {
                                name: 'Orders',
                                data: [
                                    110, 118, 97, 121, 110, 137, 115, 171, 146,
                                    167, 145, 202,
                                ],
                            },
                        ],
                        date: [
                            'Jan',
                            'Feb',
                            'Mar',
                            'Apr',
                            'May',
                            'Jun',
                            'Jul',
                            'Aug',
                            'Sep',
                            'Oct',
                            'Nov',
                            'Dec',
                        ],
                    },
                },
            },
            totalImpression: {
                thisWeek: {
                    value: 832718,
                    growShrink: -5.1,
                    comparePeriod: 'from last week',
                    chartData: {
                        series: [
                            {
                                name: 'Impressions',
                                data: [
                                    10234, 12812, 11721, 14344, 12030, 15444,
                                    13225,
                                ],
                            },
                        ],
                        date: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    },
                },
                thisMonth: {
                    value: 3123734,
                    growShrink: 4.6,
                    comparePeriod: 'from last month',
                    chartData: {
                        series: [
                            {
                                name: 'Impressions',
                                data: [
                                    242124, 334097, 297364, 364342, 342431,
                                    431368, 368477, 477398, 398489, 489364,
                                    364571, 571664,
                                ],
                            },
                        ],
                        date: [
                            '01 Jun',
                            '02 Jun',
                            '03 Jun',
                            '04 Jun',
                            '05 Jun',
                            '06 Jun',
                            '07 Jun',
                            '08 Jun',
                            '09 Jun',
                            '10 Jun',
                            '11 Jun',
                            '12 Jun',
                        ],
                    },
                },
                thisYear: {
                    value: 12948921,
                    growShrink: 6.3,
                    comparePeriod: 'from last year',
                    chartData: {
                        series: [
                            {
                                name: 'Impressions',
                                data: [
                                    240110, 255123, 210097, 275121, 230110,
                                    280137, 220115, 340171, 305146, 350167,
                                    300145, 420202,
                                ],
                            },
                        ],
                        date: [
                            'Jan',
                            'Feb',
                            'Mar',
                            'Apr',
                            'May',
                            'Jun',
                            'Jul',
                            'Aug',
                            'Sep',
                            'Oct',
                            'Nov',
                            'Dec',
                        ],
                    },
                },
            },
        },
        salesTarget: {
            thisWeek: {
                target: 400,
                achieved: 260,
                percentage: 65,
            },
            thisMonth: {
                target: 1750,
                achieved: 1320,
                percentage: 75,
            },
            thisYear: {
                target: 22000,
                achieved: 15823,
                percentage: 71,
            },
        },
        recentOrders: [
            {
                id: '92627',
                date: 1657332800,
                customer: 'Tara Fletcher',
                status: 0,
                paymentMehod: 'master',
                paymentIdendifier: '•••• 0921',
                totalAmount: 279,
            },
            {
                id: '92509',
                date: 1656232800,
                customer: 'Joyce Freeman',
                status: 1,
                paymentMehod: 'visa',
                paymentIdendifier: '•••• 1232',
                totalAmount: 831,
            },
            {
                id: '91631',
                date: 1655532800,
                customer: 'Brittany Hale',
                status: 0,
                paymentMehod: 'visa',
                paymentIdendifier: '•••• 4597',
                totalAmount: 142,
            },
            {
                id: '90963',
                date: 1654932800,
                customer: 'Luke Cook',
                status: 0,
                paymentMehod: 'master',
                paymentIdendifier: '•••• 3881',
                totalAmount: 232,
            },
            {
                id: '89332',
                date: 1654132800,
                customer: 'Eileen Horton',
                status: 1,
                paymentMehod: 'paypal',
                paymentIdendifier: '••••@gmail.com',
                totalAmount: 597,
            },
            {
                id: '89107',
                date: 1650132800,
                customer: 'Frederick Adams',
                status: 2,
                paymentMehod: 'visa',
                paymentIdendifier: '•••• 3356',
                totalAmount: 72,
            },
            {
                id: '89021',
                date: 1649832800,
                customer: 'Lee Wheeler',
                status: 0,
                paymentMehod: 'master',
                paymentIdendifier: '•••• 9564',
                totalAmount: 110,
            },
        ],
        topProduct: [
            {
                id: '18',
                name: 'Maneki Neko Poster',
                productCode: '098336NT',
                img: '/img/products/product-7.jpg',
                sales: 1249,
                growShrink: 15.2,
            },
            {
                id: '14',
                name: 'Echoes Necklace',
                productCode: '098383NT',
                img: '/img/products/product-3.jpg',
                sales: 1145,
                growShrink: 13.9,
            },
            {
                id: '20',
                name: 'Spiky Ring',
                productCode: '098392NT',
                img: '/img/products/product-9.jpg',
                sales: 1073,
                growShrink: 9.5,
            },
            {
                id: '21',
                name: 'Pastel Petals Poster',
                productCode: '098355NT',
                img: '/img/products/product-10.jpg',
                sales: 1022,
                growShrink: 2.3,
            },
            {
                id: '23',
                name: 'Il Limone',
                productCode: '098377NT',
                img: '/img/products/product-12.jpg',
                sales: 992,
                growShrink: -0.7,
            },
            {
                id: '17',
                name: 'Ringed Earring',
                productCode: '098314NT',
                img: '/img/products/product-6.jpg',
                sales: 1201,
                growShrink: -1.1,
            },
        ],
        customerDemographic: [
            {
                id: 'us',
                name: 'United States',
                value: 38.61,
                coordinates: [-95.7129, 37.0902],
            },
            {
                id: 'br',
                name: 'Brazil',
                value: 32.79,
                coordinates: [-51.9253, -14.235],
            },
            {
                id: 'in',
                name: 'India',
                value: 26.42,
                coordinates: [78.9629, 20.5937],
            },
            {
                id: 'uk',
                name: 'United Kingdom',
                value: 17.42,
                coordinates: [0.1278, 51.5074],
            },
            {
                id: 'tr',
                name: 'Turkey',
                value: 12.85,
                coordinates: [28.9784, 41.0082],
            },
        ],
        revenueByChannel: {
            thisWeek: {
                value: 21827.13,
                growShrink: 11.4,
                percentage: {
                    onlineStore: 24,
                    physicalStore: 35,
                    socialMedia: 41,
                },
            },
            thisMonth: {
                value: 82373.21,
                growShrink: 3.4,
                percentage: {
                    onlineStore: 28,
                    physicalStore: 32,
                    socialMedia: 40,
                },
            },
            thisYear: {
                value: 329489.21,
                growShrink: 5.1,
                percentage: {
                    onlineStore: 24,
                    physicalStore: 38,
                    socialMedia: 38,
                },
            },
        },
    }

    return (
        // <Loading loading={isLoading}>
        // {data && data.statisticData && (
        <div>
            <div className="flex flex-col gap-4 max-w-full overflow-x-hidden">
                <div className="flex flex-col xl:flex-row gap-4">
                    <div className="flex flex-col gap-4 flex-1 xl:col-span-3">
                        {/* <Overview data={data.statisticData} /> */}
                        <Home />
                        {/* <CustomerDemographic data={data.customerDemographic} /> */}
                    </div>
                    {/* <div className="flex flex-col gap-4 2xl:min-w-[360px]">
                        <SalesTarget data={data.salesTarget} />
                        <TopProduct data={data.topProduct} />
                        <RevenueByChannel data={data.revenueByChannel} />
                    </div> */}
                </div>

                <RecentOrder data={data.recentOrders} />
            </div>
        </div>
        // )}
        // </Loading>
    )
}

export default SalesDashboard
