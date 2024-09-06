import React from 'react'
import { Field } from 'react-final-form'
import Drawer from 'react-modern-drawer'

export default function TicketModal({ type, isOpen, toggleDrawer }: { type: string | null, isOpen: boolean, toggleDrawer: () => void }): JSX.Element {
    return (
        <>
            <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction='bottom'
                overlayOpacity={0.3}
                className='drawer_tickets'
                style={{ height: 'max-content', minHeight: 500, bottom: 100, right: 0, left: 'auto' }}
            >
                {type === 'free' ?
                    <>Free</>
                    :
                    <>
                        <h3>How many tickets?</h3>
                        <Field name="ticketCount" component="input" type="range" />
                        <Field name="ticketCount" component="input" type="number" />
                    </>
                }
            </Drawer>
        </>
    )
}
