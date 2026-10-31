import OrdersLine from '@/app/components/dashboard/reporting/orders-line'
import PricePie from '@/app/components/dashboard/reporting/price-pie'
import DashboardLayout from '@/app/components/layouts/dashboard-layout'
import { createClient } from '@/utils/supabase/server'
import React from 'react'

async function getOrders() {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null
    const { data, error } = await supabase.rpc('sum_tickets_by_date', { user_id: user.id });
    if (error) throw new Error(error.message)
    return data
}

export default async function Reporting() {
    const orders = await getOrders()
    return (
        <DashboardLayout title="Reporting">
            <>
                {orders && Array.isArray(orders) && <OrdersLine orders={orders} />}
                <PricePie />
            </>
        </DashboardLayout>
    )
}
