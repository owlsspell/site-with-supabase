import React from 'react'
import EventsCategories from './events-categories'
import EventsList from './event-list';

export default function EventsListServer() {
    return (
        <section className='events_container'>
            <hr />
            <div className='section_title'>
                Browsing events
            </div>
            <hr />
            <EventsCategories />
            <EventsList />
        </section>
    )
}
