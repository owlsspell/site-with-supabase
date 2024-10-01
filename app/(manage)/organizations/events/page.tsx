import ResultsSection from '@/app/components/events/dashboard-all-events/results-section';
import SearchPanel from '@/app/components/events/dashboard-all-events/search-panel';

export default async function AllEventsPage() {

    return (
        <div className='dashboard_container'>
            <div className="dashboard_workspace events_page">
                <h1 className='dashboard_workspace-title'>Events</h1>
                <SearchPanel />
                <ResultsSection />
            </div>
        </div>
    )
}
