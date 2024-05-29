import React from 'react'
import EventsCategories from './events-categories'
import EventCard from './event-card'

export default function EventsList() {
    return (
        <section className='events_container'>
            <hr />
            <div className='section_title'>
                Browsing events
            </div>
            <hr />
            <EventsCategories />
            <div className='events_list'>
                <EventCard />
            </div>
        </section>
    )
}
