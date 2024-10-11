'use client'
import { useEffect, useState } from 'react';
import Select from 'react-select';
import OrangeButton from '../../buttons/orange-button';
import { clearEventData } from '@/lib/features/createEventSlice';
import { useAppDispatch } from '@/lib/hooks';
import { useRouter } from 'next/navigation';

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
                <div className='events_page-search' >
                    <input type="text" placeholder='Search events' className="events_page-search-input" />
                    <i className="ri-search-line events_page-search-icon"></i>
                </div>
                <Select
                    className="events_page-select"
                    defaultValue={selectedOption}
                    onChange={setSelectedOption}
                    options={options}
                    styles={customSlyles}
                />
            </div>
            <OrangeButton text='Create Event' href="/manage/events/create" onClick={() => dispatch(clearEventData())} className="events_page-btn" />
        </div>
    )
}
