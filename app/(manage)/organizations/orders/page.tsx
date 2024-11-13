import SearchInput from '@/app/components/custom/inputs/search-input'
import OrdersSelect from '@/app/components/dashboard/orders/orders-select';
// import OrdersTable from '@/app/components/dashboard/orders/orders-table';
const OrdersTable = dynamic(() => import('@/app/components/dashboard/orders/orders-table'))
import DashboardLayout from '@/app/components/layouts/dashboard-layout'
import { createClient } from '@/utils/supabase/server';
import dayjs from 'dayjs';
import React from 'react'
import timezone from 'dayjs/plugin/timezone'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import OrdersTabs from '@/app/components/dashboard/orders/orders-tabs';
import dynamic from 'next/dynamic';
dayjs.extend(advancedFormat)
dayjs.extend(timezone)

type SearchParams = { filter: string, search: string, table: string }

const transformArray = (array: OrderWithEvent[]) => array.map(item => {
    const { event, ...rest } = item;
    return { ...rest, ...event };
});

async function getOrders(searchParams: SearchParams) {
    const { filter, table } = searchParams;
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null
    let queryForMyTickets = supabase.from("tickets").select('*, event: events(name,price,currency)').eq("user_id", user.id)
    let queryForMyEvents = supabase.from("events").select('*, tickets(ticket_count)').eq("author_id", user.id).eq("publish", true)
    let query = table === 'tickets' || !table ? queryForMyTickets : queryForMyEvents

    const setDayStart = dayjs().set('hour', 0).set('minute', 0).set('second', 0)
    if (filter) {
        filter === 'all' || !filter ?
            query = query
            :
            query = query.gte('created_at', setDayStart.subtract(Number(filter), 'month'))
    }

    const getTikets = async () => {
        const { data, error } = await query;
        if (error) throw new Error('Could not find event')
        return transformArray(data)
    }
    const getOrders = async () => {
        const { data, error } = await query;
        if (error) throw new Error('Could not find event')
        return data
    }

    switch (table) {
        case 'tickets':
            return await getTikets()
        case 'orders':
            return await getOrders()
        default: return getTikets()
    }
}
export default async function OrdersPage({ searchParams }: { searchParams: SearchParams }) {
    const orders = await getOrders(searchParams)

    return (
        <DashboardLayout title="Orders">
            <OrdersTabs active={searchParams.table} />
            <div className="dashboard_orders-search">
                <SearchInput placeholder="Search order number, email or name" className="orders_page" />
                <OrdersSelect />
            </div>
            <OrdersTable orders={orders} searchParams={searchParams} />
        </DashboardLayout>
    )
}
