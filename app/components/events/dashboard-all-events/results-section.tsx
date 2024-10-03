import React from 'react'
import EventCard from '../event-card';
import Link from 'next/link';

export default function ResultsSection({ events }: { events: EventType[] | null }) {
    return (
        <div>
            {!events || events.length === 0 ?
                <div className='events_page-no-results'>
                    <div className="events_page-no-results-icon">
                        <svg viewBox="0 0 144 144" width={120}><g fill="none" fillRule="evenodd"><g><path fill="none" d="M0 0h144v144H0z"></path><g><path fill="#FFF" d="M25.5 112.5h93v-66h-93zM25.5 46.5h93v-15h-93z"></path><path stroke="#3A3A3A" stroke-width="3" d="M25.5 112.5h93v-66h-93z"></path><path fill="#D2D6DF" d="M55.5 66h9v-9h-9zM67.5 66h9v-9h-9zM79.5 66h9v-9h-9zM91.5 66h9v-9h-9zM103.5 66h9v-9h-9zM31.5 78h9v-9h-9zM43.5 78h9v-9h-9zM55.5 78h9v-9h-9zM67.5 78h9v-9h-9zM79.5 78h9v-9h-9zM91.5 78h9v-9h-9zM103.5 78h9v-9h-9zM31.5 90h9v-9h-9zM43.5 90h9v-9h-9zM55.5 90h9v-9h-9z"></path><path fill="#F6682F" d="M67.5 90h9v-9h-9zM79.5 90h9v-9h-9zM91.5 90h9v-9h-9zM103.5 90h9v-9h-9zM31.5 102h9v-9h-9zM43.5 102h9v-9h-9zM55.5 102h9v-9h-9zM67.5 102h9v-9h-9zM79.5 102h9v-9h-9z"></path><path stroke="#3A3A3A" strokeWidth="3" d="M25.5 42V31.5h93V42"></path><path d="M34.5 37.5h75M49.5 61.5h-3M37.5 61.5h-3M109.5 97.5h-3M97.5 97.5h-3" stroke="#3A3A3A" strokeWidth="3" strokeLinejoin="round"></path></g></g></g></svg>
                    </div>
                    No events to show
                </div>
                :
                <div className="events_container">
                    <div className='events_list'>
                        {events.map(event =>
                            <div key={event.id} className='event_container-buttons'>
                                <EventCard event={event} />
                                <Link className="event_button-edit" href="/manage/events/create?page=general">Edit</Link>
                            </div>
                        )}
                    </div>
                </div>
            }
        </div>
    )
}
