import ResultsSection from '@/app/components/events/dashboard-all-events/results-section';
import SearchPanel from '@/app/components/events/dashboard-all-events/search-panel';
import { createClient } from '@/utils/supabase/server';
import dayjs from 'dayjs';

async function getUserEvents(filter: string) {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null
    let query = supabase.from("events").select('*').eq("author_id", user.id) as any
    const setDayStart = dayjs().set('hour', 0).set('minute', 0).set('second', 0)

    if (filter === 'all') { query = query }
    if (filter === 'draft') { query = query.eq('publish', false) }
    if (filter === 'past') { query = query.lt('timeStart', setDayStart) }
    if (filter === 'upcoming') { query = query.gt('timeStart', setDayStart) }

    const { data, error } = await query
    if (error) throw new Error('Could not find event')
    return data
}

export default async function AllEventsPage({ searchParams }: { searchParams: { filter: string } }) {
    const events = await getUserEvents(searchParams.filter)
    return (
        <div className='dashboard_container'>
            <div className="dashboard_workspace events_page">
                <h1 className='dashboard_workspace-title'>Events</h1>
                <SearchPanel />
                <ResultsSection events={events} />
            </div>
        </div>
    )
}
