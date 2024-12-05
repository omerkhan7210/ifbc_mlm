
import Chart from 'react-apexcharts'
import { COLOR_2 } from '@/constants/chart.constant'
import { Card } from '@/components/ui'

const MonthlyIncome = () => {
    const data = [
        {
            name: '$',
            data: [140, 4100, 35700, 51000, 4950, 62980, 69040, 91400, 14855, 69040, 91400],
        },
    ]

    return (
        <Card>
            <div className="flex items-center justify-between mb-5">
                <h4>Monthly Income</h4>
            </div>
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
                        categories: [
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
                            'Dec'
                        ],
                    },
                }}
                series={data}
                height={300}
            />
        </Card>
    )
}

export default MonthlyIncome;

