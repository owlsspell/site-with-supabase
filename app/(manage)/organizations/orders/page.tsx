import SearchInput from '@/app/components/custom/inputs/search-input'
import OrdersSelect from '@/app/components/dashboard/orders/orders-select';
import OrdersTable from '@/app/components/dashboard/orders/orders-table';
import DashboardLayout from '@/app/components/layouts/dashboard-layout'
import { createClient } from '@/utils/supabase/server';
import dayjs from 'dayjs';
import React from 'react'
import timezone from 'dayjs/plugin/timezone'
import advancedFormat from 'dayjs/plugin/advancedFormat'
dayjs.extend(advancedFormat)
dayjs.extend(timezone)

const transformArray = (array: OrderWithEvent[]) => array.map(item => {
    const { event, ...rest } = item;
    return { ...rest, ...event };
});

async function getOrders(filter: string) {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null
    let query = supabase.from("tickets").select('*, event: events(name,price,currency)').eq("user_id", user.id)

    const setDayStart = dayjs().set('hour', 0).set('minute', 0).set('second', 0)
    if (filter) {
        filter === 'all' ?
            query = query
            :
            query = query.gte('created_at', setDayStart.subtract(Number(filter), 'month'))
    }

    const { data, error } = await query;
    if (error) throw new Error('Could not find event')
    return transformArray(data)
}

export default async function OrdersPage({ searchParams }: { searchParams: { filter: string, search: string } }) {
    const orders = await getOrders(searchParams.filter)

    return (
        <DashboardLayout title="Orders">
            <div className="dashboard_orders-search">
                <SearchInput placeholder="Search order number, email or name" className="orders_page" />
                <OrdersSelect />
            </div>
            <OrdersTable orders={orders} searchParams={searchParams} />
        </DashboardLayout>
    )
}
