'use client'
import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LineElement, LinearScale, PointElement, Title, Tooltip, Legend, Filler);

type PropsType = { date: string; total_tickets: number }[]

export default function OrdersLine({ orders }: { orders: PropsType }) {
    const dates = orders.map(order => order.date);
    const totalTickets = orders.map((order) => order.total_tickets);

    const data = {
        labels: dates,
        datasets: [
            {
                data: totalTickets,
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
            },
        ],
    };

    // To make configuration
    const options = {
        scales: {
            y: {
                title: {
                    display: true,
                    text: "Number of Tickets",
                },
                display: true,
                min: 0,
            },
        },
        plugins: {
            title: {
                display: true,
                text: 'Number of Tickets Sold by Date',
                font: { size: 24 },
                color: 'black'
            },
            legend: { display: false }
        }
    };

    return (
        <div style={{ height: '50vh', margin: "0 auto" }} >
            <Line data={data} options={options} />
        </div >
    );
};
