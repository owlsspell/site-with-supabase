import SearchInput from '@/app/components/custom/inputs/search-input'
import CustomSelect from '@/app/components/custom/select/custom-select';
import DashboardLayout from '@/app/components/layouts/dashboard-layout'
import React from 'react'

export default function Orders() {
    const options = ["Past 3 months", "Past 6 months", "Past 12 months"].map(option => ({ value: option.split(" ")[0].toLowerCase(), label: option }));

    return (
        <DashboardLayout title="Orders">
            <div className="dashboard_orders-search">
                <SearchInput placeholder="Search order number, email or name" className="orders_page" />
                <label>
                    <span>Date range</span>
                    <CustomSelect options={options} className="dashboard_orders-selectDate" defaultValue={{ label: "Past 3 months", value: "Past 3 months" }} />
                </label>
            </div>
        </DashboardLayout>
    )
}
