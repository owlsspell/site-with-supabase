import ResultsSection from '@/app/components/events/dashboard-all-events/results-section';
import SearchPanel from '@/app/components/events/dashboard-all-events/search-panel';
import { createClient } from '@/utils/supabase/server';

async function getUserEvents() {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null
    const { data, error } = await supabase.from("events").select('*').eq("author_id", user.id)
    if (error) throw new Error('Could not find event')
    return data
}

export default async function AllEventsPage() {
    const events = await getUserEvents()
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
