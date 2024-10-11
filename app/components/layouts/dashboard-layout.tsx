import React from 'react'

export default function DashboardLayout({ children, title }: { children: React.ReactNode, title: string }) {
    return (
        <div className='dashboard_container'>
            <div className="dashboard_workspace events_page">
                <h1 className='dashboard_workspace-title'>{title}</h1>
                {children}
            </div>
        </div>
    )
}
