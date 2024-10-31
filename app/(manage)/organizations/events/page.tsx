import ResultsSection from '@/app/components/dashboard/dashboard-all-events/results-section';
import SearchPanel from '@/app/components/dashboard/dashboard-all-events/search-panel';
import DashboardLayout from '@/app/components/layouts/dashboard-layout';
import { createClient } from '@/utils/supabase/server';
import dayjs from 'dayjs';

async function getUserEvents(searchParams: { filter: string, search: string }) {
    const { filter, search } = searchParams
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null
    let query = supabase.from("events").select('*').eq("author_id", user.id) as any
    const setDayStart = dayjs().set('hour', 0).set('minute', 0).set('second', 0)

    if (filter === 'all') { query = query }
    if (filter === 'draft') { query = query.eq('publish', false) }
    if (filter === 'past') { query = query.lt('timeStart', setDayStart) }
    if (filter === 'upcoming') { query = query.gt('timeStart', setDayStart) }

    if (search) {
        query = query.ilike('name', `%${search}%`)
    }

    const { data, error } = await query
    if (error) throw new Error('Could not find event')
    return data
}

export default async function AllEventsPage({ searchParams }: { searchParams: { filter: string, search: string } }) {
    const events = await getUserEvents(searchParams)
    return (
        <DashboardLayout title="Events">
            <SearchPanel />
            <ResultsSection events={events} />
        </DashboardLayout>
    )
}
