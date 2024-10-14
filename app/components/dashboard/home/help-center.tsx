import Link from 'next/link'
import React from 'react'

export default function HelpCenter() {
    const sections = [
        { id: 1, title: 'Creating an event', link: "/manage/events/create", icon: <svg id="calendar-add_svg__eds-icon--calendar-add_svg" x="0" y="0" viewBox="0 0 24 24"><path id="calendar-add_svg__eds-icon--calendar-add_base" fill-rule="evenodd" clip-rule="evenodd" d="M21 21H3V9h18v12zM3 8V5h4v1h1V5h8v1h1V5h4v3H3zm14-4V2h-1v2H8V2H7v2H2v18h20V4h-5z"></path><path id="calendar-add_svg__eds-icon--calendar-add_plus" fill-rule="evenodd" clip-rule="evenodd" d="M12.5 14.5V12h-1v2.5H9v1h2.5V18h1v-2.5H15v-1z"></path></svg> },
        { id: 2, title: 'Your account', link: "/organizations/home", icon: <svg id="user_svg__eds-icon--list-view_svg" x="0" y="0" viewBox="0 0 24 24"><path id="user_svg__eds-icon--user_base" fill-rule="evenodd" clip-rule="evenodd" d="M5.2 19.1c1-2.8 3.7-4.7 6.7-4.7s5.7 1.9 6.7 4.7c-4.1 2.5-9.3 2.5-13.4 0zm16.1-1.9c-.5.5-1.1 1-1.7 1.5a8.15 8.15 0 00-7.6-5.2c-3.3 0-6.3 2.1-7.6 5.1-.6-.4-1.1-.9-1.6-1.4l-.8.7C4.8 20.6 8.4 22 12 22s7.2-1.4 10-4.1l-.7-.7z"></path><path id="user_svg__eds-icon--user_head" fill-rule="evenodd" clip-rule="evenodd" d="M12 2C9.2 2 7 4.2 7 7s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 9c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"></path></svg> }
    ]
    return (
        <div className='dashboard_home-container'>
            <h3>How can we help?</h3>
            <div className="help_center-container">
                {sections.map(section => (
                    <Link href={section.link} key={section.id} className="help_center-item">
                        <div className='help_center-icon-container' >{section.icon}</div>
                        <h4>{section.title}</h4>
                    </Link>
                ))}
            </div>
        </div>
    )
}
