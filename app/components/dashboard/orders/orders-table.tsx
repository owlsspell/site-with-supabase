'use client'
import { useMemo, useState } from 'react'
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { AgGridReact } from 'ag-grid-react';

export default function OrdersTable({ orders }: OrderWithEvent) {
    console.log('orders', orders);

    const columns = useMemo(() => Object.keys(orders[0]).map(col => ({ field: col })), [orders])

    console.log('columns', columns);
    const [rowData, setRowData] = useState(orders);

    const [colDefs, setColDefs] = useState<any>(columns);

    const defaultColDef = useMemo(() => {
        return {
            flex: 1,
        };
    }, []);

    return (
        <div className='dashboard_orders-table'>
            <div
                className="ag-theme-quartz" // applying the Data Grid theme
            >
                <AgGridReact rowData={rowData} columnDefs={colDefs} defaultColDef={defaultColDef} />
            </div>
        </div>
    )
}
