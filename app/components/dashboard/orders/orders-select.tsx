'use client'
import CustomSelect from '../../custom/select/custom-select'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function OrdersSelect() {
    const options = ["All", "Past 3 months", "Past 6 months", "Past 12 months"].map(option => ({ value: option === "All" ? 'all' : option.split(" ")[1], label: option }));
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams.toString());

    async function handleChange(value: { value: string }) {
        if (value.value === "all") {
            params.delete('filter');
        }
        else {
            params.set("filter", value.value)
        }
        return router.push(`${pathname}?${params.toString()}`)
    }

    const getSelectedValue = () => {
        if (params.get("filter") === "all" || !params.get("filter")) {
            return { label: "All", value: "all" }
        }
        else {
            return options.find((option) => option.value === params.get("filter"))
        }
    }

    return (
        <label>
            <span>Date range</span>
            <CustomSelect options={options} className="dashboard_orders-selectDate" selectedValue={getSelectedValue()} handleChange={handleChange} />
        </label>
    )
}