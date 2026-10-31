'use client'
import React, { useState } from 'react'
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PricePie() {
    const [data, setData] = useState({ free: 10, paid: 20 });

    const chartData = {
        labels: ['Free', 'Paid'],
        datasets: [{
            label: 'Number of Tickets',
            data: [data.free, data.paid],
            backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
            borderWidth: 1,
        },],
    };

    return (
        <div style={{ height: '30vh', margin: "0 auto" }} >
            <Pie data={chartData} />
        </div>
    )
}