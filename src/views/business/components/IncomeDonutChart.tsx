
import Chart from 'react-apexcharts'
import { COLORS } from '@/constants/chart.constant'
import { Card } from '@/components/ui'

const IncomeDonutChart = () => {
    return (
        <Card>
            <div className="flex items-center justify-between mb-5">
                <h4>Graphical Business Overview</h4>
            </div>
            <Chart
                options={{
                    // colors: ['#e0f2fe', '#d1fae5', '#fce7f3', '#a7f3d0'],
                    colors: COLORS,
                    labels: ['Completed Deals', 'In Progress Deal'],
                    responsive: [
                        {
                            breakpoint: 480,
                            options: {
                                chart: {
                                    width: 200,
                                },
                                legend: {
                                    position: 'bottom',
                                },
                            },
                        },
                    ],
                }}
                series={[12, 7]}
                height={300}
                type="donut"
            />
        </Card>
    )
}

export default IncomeDonutChart

