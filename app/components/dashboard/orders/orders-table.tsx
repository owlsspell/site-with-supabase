'use client'
import { useEffect, useMemo, useState } from 'react'
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { AgGridReact } from 'ag-grid-react';
import dayjs from 'dayjs';

export default function OrdersTable({ orders, searchParams }: OrderWithEvent & { searchParams: { filter: string, search: string } }) {
    const getTicketsCount = (data: any) => {
        return data.reduce((acc: number, val: { ticket_count: number }) => val.ticket_count + acc, 0)
    }
    const getTotalPrice = (data: any) => {
        return +(data.price * getTicketsCount(data.tickets)).toFixed(2)
    }

    const colsForTickets = useMemo(() => [
        { field: 'id', flex: 0.5 },
        {
            field: 'created_at', headerName: "Created at", flex: 1,
            valueFormatter: (p: any) => dayjs(p.data.created_at).format('YYYY/MM/DD HH:mm'),
            getQuickFilterText: (params: any) => params.data.created_at
        },
        {
            field: 'name', headerName: 'Event name', flex: 2,
        },
        {
            field: 'ticket_count', headerName: 'ticket count', flex: 0.5,
        },
        {
            field: 'price', flex: 0.5,
            comparator: priceComparator,
            valueFormatter: (p: any) => p.value.toLowerCase() === 'free' ? 'Free' : p.data.price,
            getQuickFilterText: (params: any) => params.data.price
        },
        {
            field: 'total',
            comparator: priceTicketsComparator,
            valueFormatter: (p: any) => p.data.price.toLowerCase() === 'free' ? 'Free' : `${p.data.price * p.data.ticket_count} ${p.data.currency}`,
            getQuickFilterText: (params: any) => params.data.currency
        }
    ], [])

    const colsForOrders = useMemo(() => [
        {
            headerName: 'created at', field: 'created_at', flex: 1,
            valueFormatter: (p: any) => dayjs(p.data.created_at).format('YYYY/MM/DD HH:mm'),
            getQuickFilterText: (params: any) => params.data.created_at
        },
        {
            field: 'name', headerName: 'Event name', flex: 2,
        },
        {
            field: 'ticket_count', headerName: 'ticket count', flex: 1,
            comparator: ticketCountComparator,
            valueParser: (p: any) => getTicketsCount(p.data.tickets),
            valueFormatter: (p: any) => getTicketsCount(p.data.tickets)
        },
        {
            field: "ticketsTotal", headerName: 'ticket total', flex: 1,
            comparator: totalTicketsComparator,
            valueFormatter: (p: any) => p.data.ticketsTotal ?? 'unlimited'
        },
        {
            field: 'price', flex: 0.5,
            comparator: priceComparator,
            valueFormatter: (p: any) => p.value.toLowerCase() === 'free' ? 'Free' : p.data.price,
            getQuickFilterText: (params: any) => params.data.price
        },
        {
            field: 'total',
            comparator: totalPriceComparator,
            valueFormatter: (p: any) => p.data.price.toLowerCase() === 'free' ? 'Free' : `${getTotalPrice(p.data)} ${p.data.currency}`,
            getQuickFilterText: (params: any) => params.data.currency
        }
    ], []);

    const [rowData, setRowData] = useState(orders);

    const [colDefs, setColDefs] = useState<any>(colsForTickets);

    function priceTicketsComparator(valueA: any, valueB: any, nodeA: any, nodeB: any, isDescending: boolean) {
        if (isDescending && nodeB.data.price.toLowerCase() === 'free') return 1;
        if (!isDescending && nodeA.data.price.toLowerCase() === 'free') return -1;

        if ((nodeA.data.price * nodeA.data.ticket_count) === (nodeB.data.price * nodeB.data.ticket_count)) return 0
        return (nodeA.data.price * nodeA.data.ticket_count) - (nodeB.data.price * nodeB.data.ticket_count)
    }

    function totalPriceComparator(valueA: any, valueB: any, nodeA: any, nodeB: any, isDescending: boolean) {
        if (nodeB.data.price.toLowerCase() === 'free') return 1;
        if (nodeA.data.price.toLowerCase() === 'free') return -1;

        if ((nodeA.data.price * getTicketsCount(nodeA.data.tickets)) === (nodeB.data.price * getTicketsCount(nodeB.data.tickets))) return 0
        return (nodeA.data.price * getTicketsCount(nodeA.data.tickets)) - (nodeB.data.price * getTicketsCount(nodeB.data.tickets))
    }

    function ticketCountComparator(valueA: any, valueB: any, nodeA: any, nodeB: any) {
        if (nodeB.data.tickets.length === 0) return 1;
        if (nodeA.data.tickets.length === 0) return -1
        else {
            return getTicketsCount(nodeA.data.tickets) > getTicketsCount(nodeB.data.tickets)
        }
    }
    function totalTicketsComparator(valueA: any, valueB: any) {
        if (valueA === null) return 1;
        if (valueB === null) return -1;
        return valueA - valueB
    }
    function priceComparator(valueA: any, valueB: any) {
        if (valueB.toLowerCase() === 'free') return 1;
        if (valueA.toLowerCase() === 'free') return -1;
        return valueA - valueB
    }

    useEffect(() => {
        if (!searchParams.table) return
        if (searchParams.table === "orders") {
            setColDefs(colsForOrders)
        }
        else {
            setColDefs(colsForTickets)
        }
    }, [searchParams.table])

    const defaultColDef = useMemo(() => {
        return {
            // flex: 1,
            // sortable: true,
        };
    }, []);

    useEffect(() => setRowData(orders), [orders])

    return (
        <div className='dashboard_orders-table'>
            <div
                className="ag-theme-quartz" // applying the Data Grid theme
            >
                <AgGridReact
                    quickFilterText={searchParams.search}
                    rowData={rowData} columnDefs={colDefs} defaultColDef={defaultColDef} />
            </div>
        </div>
    )
}
