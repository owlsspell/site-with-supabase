'use client'
import { useEffect, useId, useState } from 'react';
import OrangeButton from '../../custom/buttons/orange-button';
import { clearEventData } from '@/lib/features/createEventSlice';
import { useAppDispatch } from '@/lib/hooks';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import SearchInput from '../../custom/inputs/search-input';
const Select = dynamic(() => import('react-select'))

export default function SearchPanel() {
    const [selectedOption, setSelectedOption] = useState<{ value: string; label: string; } | null>({ value: "all", label: "All events" });
    const options = ["Upcoming events", "Draft", "Past events", "All events"].map(option => ({ value: option.split(" ")[0].toLowerCase(), label: option }));
    const dispatch = useAppDispatch()
    const router = useRouter()

    const customSlyles = {
        control: (provided: any) => ({
            ...provided,
            background: '#3659e3',
            borderRadius: "20px",
        }),
        singleValue: (provided: any) => ({
            ...provided,
            color: "#FFFFFF",
        }),
    }

    useEffect(() => { if (!!selectedOption) router.push(`?filter=${selectedOption.value}`) }, [selectedOption])
    return (
        <div className='events_page-search-panel'>
            <div className='events_page-filters'>
                <SearchInput placeholder='Search events' />
                <Select
                    id={useId()}
                    className="events_page-select"
                    defaultValue={selectedOption}
                    onChange={(newValue) => setSelectedOption(newValue as { value: string; label: string; } | null)}
                    options={options}
                    styles={customSlyles}
                />
            </div>
            <OrangeButton text='Create Event' href="/manage/events/create" onClick={() => dispatch(clearEventData())} className="events_page-btn" />
        </div>
    )
}