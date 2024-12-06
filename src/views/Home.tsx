import Chart from 'react-apexcharts'
import { COLORS, COLOR_2 } from '@/constants/chart.constant'
import axios from 'axios'
import { useEffect, useState } from 'react'

const months = [
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
]

const apiFetch = async (endpoint: string, decryptedToken: string) => {
    const res = axios
        .get(`https://backend.ifbc.co/api/${endpoint}`, {
            headers: {
                ...(decryptedToken && decryptedToken !== ''
                    ? {
                          Authorization: `Bearer ${decryptedToken}`,
                      }
                    : {}),
                'X-App-Token': 'your-app-specific-token-ifbc',
            },
        })
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            console.error(error)
        })

    return res
}

interface User {
    userType: string
    docDate: string
}
interface MonthlyData {
    month: string
    count: number
}

const Home = () => {
    const [data, setData] = useState<MonthlyData[]>([])
    const [consultantsData, setConsultantsData] = useState([])
    const [ambassadorsData, setAmbassadorsData] = useState<MonthlyData[]>([])

    useEffect(() => {
        const fetchDataAsync = async () => {
            const result = await apiFetch('candidateprofile', '')

            const resultUsers = await apiFetch('users', '')

            const filterUsersByType = (users: User[], type: string) => {
                return users.filter(
                    (user: { userType: string }) => user.userType === type,
                )
            }

            const consultants = filterUsersByType(resultUsers, 'C')
            const ambassadors = filterUsersByType(resultUsers, 'A')

            const groupDataByMonth = (data: { docDate: string }[]) => {
                return data.reduce(
                    (
                        acc: { [key: string]: number },
                        curr: { docDate: string },
                    ) => {
                        const month = new Date(curr.docDate).toLocaleString(
                            'en-US',
                            {
                                month: 'short',
                            },
                        )
                        acc[month] = (acc[month] || 0) + 1
                        return acc
                    },
                    {},
                )
            }

            const groupedData = groupDataByMonth(result)
            const groupedConsultantData = groupDataByMonth(consultants)
            const groupedAmbassadorData = groupDataByMonth(ambassadors)

            const formattedDataConsultant = Object.keys(
                groupedConsultantData,
            ).map((month) => ({
                month,
                count: groupedConsultantData[month],
            }))

            const formattedDataAmbassador = Object.keys(
                groupedAmbassadorData,
            ).map((month) => ({
                month,
                count: groupedAmbassadorData[month],
            }))

            const formattedData = Object.keys(groupedData).map((month) => ({
                month,
                count: groupedData[month],
            }))

            setConsultantsData(formattedDataConsultant)
            setAmbassadorsData(formattedDataAmbassador)
            setData(formattedData)
        }
        fetchDataAsync()
    }, [])

    return (
        <div className="bg-white p-5 flex  gap-10 ">
            <div className="w-full ">
                <h2 className="text-sm text-center mb-2">
                    Monthly Candidates Data
                </h2>
                <BasicLine data={data} />
            </div>
            <div className="w-full">
                <h2 className="text-sm text-center mb-2">Monthly Users Data</h2>
                <SplineArea
                    consultantData={consultantsData}
                    ambassadorData={ambassadorsData}
                />
            </div>
        </div>
    )
}

const BasicLine = ({ data: candData }: { data: MonthlyData[] }) => {
    const data = [
        {
            name: 'Candidates',
            data: months.map((month) => {
                const monthData = candData.find((d) => d.month === month)
                return monthData ? monthData.count : 0
            }),
        },
    ]

    return (
        <Chart
            options={{
                chart: {
                    type: 'line',
                    zoom: {
                        enabled: false,
                    },
                },
                dataLabels: {
                    enabled: false,
                },
                stroke: {
                    curve: 'smooth',
                    width: 3,
                },
                colors: [COLOR_2],
                xaxis: {
                    categories: months,
                },
            }}
            series={data}
            height={300}
        />
    )
}

const SplineArea = ({
    consultantData,
    ambassadorData,
}: {
    consultantData: MonthlyData[]
    ambassadorData: MonthlyData[]
}) => {
    const data = [
        {
            name: 'Ambassadors',
            data: months.map((month) => {
                const monthData = ambassadorData.find((d) => d.month === month)
                return monthData ? monthData.count : 0
            }),
        },
        {
            name: 'Consultants',
            data: months.map((month) => {
                const monthData = consultantData.find((d) => d.month === month)
                return monthData ? monthData.count : 0
            }),
        },
    ]

    return (
        <Chart
            options={{
                dataLabels: {
                    enabled: false,
                },
                colors: COLORS,
                stroke: {
                    curve: 'smooth',
                },
                xaxis: {
                    type: 'category',
                    categories: months,
                },
                tooltip: {
                    x: {
                        format: 'dd/MM/yy HH:mm',
                    },
                },
            }}
            series={data}
            type="area"
            height={300}
        />
    )
}

export default Home
