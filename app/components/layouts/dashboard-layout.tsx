import React from 'react'

export default function DashboardLayout({ children, title, subtitle }: { children: React.ReactNode, title: string, subtitle?: string }) {
    return (
        <div className='dashboard_container'>
            <div className="dashboard_workspace events_page">
                <div className="dashboard_workspace-subtitle">{subtitle}</div>
                <h1 className='dashboard_workspace-title'>{title}</h1>
                {children}
            </div>
        </div>
    )
}
