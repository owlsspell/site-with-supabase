import React from 'react'
import { Field } from 'react-final-form'
import Drawer from 'react-modern-drawer'
import Select from 'react-select';
import { currency as currencyConstants } from '@/lib/constants'
import GrayButton from '@/app/components/buttons/gray-button';

export default function TicketModal({ isFree = false, isOpen, toggleDrawer, saveTickets, disable }: { isFree: boolean | null, isOpen: boolean, toggleDrawer: () => void, saveTickets: () => void, disable?: boolean }): JSX.Element {
    const currency = currencyConstants.map(item => ({ value: item, label: item }))
    return (
        <>
            <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction='bottom'
                overlayOpacity={0.3}
                className='drawer_tickets'
                style={{ height: 'max-content', right: 0, left: 'auto' }}
            >
                <div className='drawer_tickets-container'>
                    {isFree ?
                        <>
                            <h3>How many tickets?</h3>
                            <Field name="ticketCount">
                                {props => (
                                    <div>
                                        <input {...props.input} type="number" min={1} />
                                    </div>
                                )}
                            </Field>
                        </>
                        :
                        <>
                            <h3>How many tickets?</h3>
                            <Field name="ticketCount">
                                {props => (
                                    <div>
                                        <input {...props.input} type="number" min={1} />
                                    </div>
                                )}
                            </Field>
                            <h3>What is the cost?</h3>
                            <div className='drawer_tickets-cost'>
                                <Field name="ticketCost" >
                                    {props => (
                                        <div>
                                            <input {...props.input} type="number" min={1} />
                                        </div>
                                    )}
                                </Field>
                                <Field name="ticketCurrency" >
                                    {({ input }) => (
                                        <Select
                                            {...input}
                                            options={currency}
                                            menuPlacement="auto"
                                            className='drawer_tickets-cost-select'
                                            defaultValue={{ label: "U.S. Dollar", value: "U.S. Dollar" }}
                                        />
                                    )}
                                </Field>
                            </div>
                        </>
                    }
                    <div>
                        <GrayButton text="Save" onClick={saveTickets} className='btn_action-gray' disable={disable} />
                    </div>
                </div>
            </Drawer>
        </>
    )
}
