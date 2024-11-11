'use client'
import { useEffect, useMemo, useState } from 'react'
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { AgGridReact } from 'ag-grid-react';
import dayjs from 'dayjs';

export default function OrdersTable({ orders, searchParams }: OrderWithEvent & { searchParams: { filter: string, search: string } }) {

    const [rowData, setRowData] = useState(orders);

    const [colDefs, setColDefs] = useState<any>([
        { field: 'id', flex: 0.5 },
        {
            field: 'created at', flex: 1, valueFormatter: (p: any) => dayjs(p.data.created_at).format('YYYY-MM-DD HH:mm'),
            getQuickFilterText: (params: any) => params.data.created_at
        },
        {
            field: 'event name', flex: 2, valueFormatter: (p: any) => p.data.name,
            getQuickFilterText: (params: any) => params.data.name
        },
        { field: 'count', flex: 0.5, valueFormatter: (p: any) => p.data.ticket_count, getQuickFilterText: (params: any) => params.data.ticket_count },
        { field: 'price', flex: 0.5, valueFormatter: (p: any) => p.value.toLowerCase() === 'free' ? 'Free' : p.data.price, getQuickFilterText: (params: any) => params.data.price },
        { field: 'total', valueFormatter: (p: any) => p.data.price.toLowerCase() === 'free' ? 'Free' : `${p.data.price * p.data.ticket_count} ${p.data.currency}`, getQuickFilterText: (params: any) => params.data.currency }]
    );

    const defaultColDef = useMemo(() => {
        return {
            flex: 1,
        };
    }, []);

    useEffect(() => setRowData(orders), [orders])

    return (
        <div className='dashboard_orders-table'>
            <div
                className="ag-theme-quartz" // applying the Data Grid theme
            >
                <AgGridReact quickFilterText={searchParams.search} rowData={rowData} columnDefs={colDefs} defaultColDef={defaultColDef} />
            </div>
        </div>
    )
}
