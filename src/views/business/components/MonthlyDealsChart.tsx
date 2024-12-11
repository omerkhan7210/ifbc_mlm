import Chart from 'react-apexcharts'
import { COLOR_2 } from '@/constants/chart.constant'
import { Card, Select } from '@/components/ui'
import { useAuth } from '@/auth';
import { useEffect, useState } from 'react';
import { getData } from '@/services/axios/axiosUtils';

const MonthlyDealsChart = () => {
    const { user } = useAuth();
    const [data, setData] = useState([]);
    const [year, setYear] = useState(new Date().getFullYear());
    const [chartData, setChartData] = useState(Array(12).fill(0));

    useEffect(() => {
        getData(`commissions/consultant/${user?.userId}/completed-deals-with-details`).then((response) => {
            setData(response.totalCompletedDeals);
        }).catch(err => console.log(err));
    }, [user]);

    useEffect(() => {
        const monthlyData = Array(12).fill(0);
        data.forEach(deal => {
            const dealDate = new Date(deal.commissionDate);
            if (dealDate.getFullYear() === year) {
                monthlyData[dealDate.getMonth()] += 1;
            }
        });
        setChartData(monthlyData.map(Math.round));
    }, [data, year]);

    const handleYearChange = (newValue: number) => {
        setYear(newValue);
    };


    const [years, setYears] = useState<number[]>([]);
    useEffect(() => {
        const tempYears = [];
        for (let i = new Date().getFullYear(); i >= 2000; i--) {
            tempYears.push(i);
        }
        setYears(tempYears);
    }, [])


    return (
        <Card>
            {/* <Select onChange={(newValue) => handleYearChange(newValue as number)} value={year}>
                {years.map(y => (
                    <option key={y} value={y}>{y}</option>
                ))}
            </Select> */}
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
                            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                        ],
                    },
                }}
                series={[{ name: 'Deals', data: chartData }]}
                height={300}
            />
        </Card>
    );
};

export default MonthlyDealsChart;
