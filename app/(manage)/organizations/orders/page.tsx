import SearchInput from '@/app/components/custom/inputs/search-input'
import CustomSelect from '@/app/components/custom/select/custom-select';
import OrdersTable from '@/app/components/dashboard/orders/orders-table';
import DashboardLayout from '@/app/components/layouts/dashboard-layout'
import { createClient } from '@/utils/supabase/server';
import React from 'react'

const transformArray = (array: OrderWithEvent[]) => array.map(item => {
    const { event, ...rest } = item;
    return { ...rest, ...event };
});

async function getOrders() {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null
    const { data, error } = await supabase.from("tickets").select('*, event: events(name,price,currency)').eq("user_id", user.id)
    if (error) throw new Error('Could not find event')
    return transformArray(data)
}

export default async function OrdersPage() {
    const options = ["Past 3 months", "Past 6 months", "Past 12 months"].map(option => ({ value: option.split(" ")[0].toLowerCase(), label: option }));
    const orders = await getOrders()
    return (
        <DashboardLayout title="Orders">
            <div className="dashboard_orders-search">
                <SearchInput placeholder="Search order number, email or name" className="orders_page" />
                <label>
                    <span>Date range</span>
                    <CustomSelect options={options} className="dashboard_orders-selectDate" defaultValue={{ label: "Past 3 months", value: "Past 3 months" }} />
                </label>
            </div>
            <OrdersTable orders={orders} />
        </DashboardLayout>
    )
}
