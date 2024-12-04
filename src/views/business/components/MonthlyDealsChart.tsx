
import Chart from 'react-apexcharts'
import { COLOR_2 } from '@/constants/chart.constant'
import { Card } from '@/components/ui'

const MonthlyDealsChart = () => {
    const data = [
        {
            name: '$',
            data: [2, 3, 4, 2, 5, 6, 3, 8, 6, 9, 11, 0],
        },
    ]

    return (
        <Card>
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

export default MonthlyDealsChart;

