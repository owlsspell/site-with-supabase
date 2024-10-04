import React, { useEffect } from 'react'
import { ReactComponent as Arrow_down } from "@/images/icons/arrow-down.svg"
import TicketModal from './ticket-modal';
import { useField, useForm } from 'react-final-form';
import GrayButton from '@/app/components/buttons/gray-button';
import OrangeButton from '@/app/components/buttons/orange-button';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { toogleStepsStatus } from '@/lib/features/drawerStepsSlice';
import supabase from '@/utils/supabase/client-supabase';
import { handleError } from '@/lib/functions';
import Swal from 'sweetalert2';
import { setEventTicketsInfo } from '@/lib/features/createEventSlice';
import TicketsInfo from '../../sections/view-section/tickets';

export const ticketTypes = [
    { name: "Paid", description: "Create a ticket that people have to pay for.", icon: <svg width="63" height="63" viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="63" height="63" rx="8" fill="#3659E3" fillOpacity="0.08"></rect><path fillRule="evenodd" clipRule="evenodd" d="M34.65 14.175C34.65 14.175 34.65 19.6875 29.925 19.6875C25.2 19.6875 25.2 14.175 25.2 14.175H17.325V45.675H25.2C25.1747 44.4468 25.6384 43.259 26.4891 42.3728C27.3399 41.4866 28.5078 40.9748 29.736 40.95H29.925C31.1532 40.9247 32.341 41.3884 33.2272 42.2391C34.1134 43.0899 34.6252 44.2578 34.65 45.486V45.675H42.525V14.175H34.65ZM44.1 17.325V47.25H37.8V48.825H45.675V17.325H44.1ZM26.9325 47.2503C27.4409 45.3611 28.7707 43.8 30.555 42.9978C31.1169 43.233 31.6062 43.6135 31.9725 44.1003C29.8673 44.7219 28.4037 46.6309 28.35 48.8253H20.475V47.2503H26.9325ZM25.2 30.7125V29.1375H22.05V30.7125H25.2ZM28.35 30.7125V29.1375H31.5V30.7125H28.35ZM37.8 29.1375H34.65V30.7125H37.8V29.1375ZM36.225 44.1H40.95V15.75H36.225C35.595 18.4275 33.8625 21.2625 29.925 21.2625C25.9875 21.2625 24.255 18.4275 23.625 15.75H18.9V44.1H23.625C24.1956 41.1381 26.9218 39.0935 29.925 39.375C32.9282 39.0935 35.6543 41.1381 36.225 44.1Z" fill="#6898F7"></path></svg> },
    { name: "Free", description: "Create a ticket that no one has to pay for", icon: <svg width="63" height="63" viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="63" height="63" rx="6.38" fill="#F2E7FE" fillOpacity="0.8"></rect><path fillRule="evenodd" clipRule="evenodd" d="M36.0746 26.775H39.5489C39.4388 24.066 36.3104 21.5775 33.0248 20.7743V17.325H29.8807V20.727C29.0476 20.916 28.1672 21.1995 27.4598 21.5775L29.7707 23.8928C30.4152 23.625 31.2013 23.4675 32.1445 23.4675C34.9428 23.4675 35.9803 24.8063 36.0746 26.775ZM18.8764 20.9947L24.2842 26.4127C24.2842 29.6887 26.7366 31.4685 30.4309 32.571L35.9488 38.0992C35.4143 38.8552 34.2982 39.5325 32.1445 39.5325C28.906 39.5325 27.6327 38.0835 27.4598 36.225H24.0012C24.1899 39.6742 26.8624 41.6115 29.8807 42.2572V45.675H33.0248V42.2887C34.534 42.0052 37.3637 41.4225 38.3541 40.5247L41.844 44.0212L44.0763 41.7847L21.1087 18.7582L18.8764 20.9947Z" fill="#9374E7"></path></svg> }
]
export default function CreateTickets({ goToNextStep }: { goToNextStep: (step: number) => void }) {
    const dispatch = useAppDispatch()
    const eventId = useAppSelector((state) => state.createdEventInfo.eventInfo.id)
    const ticketsInfo = useAppSelector((state) => state.createdEventInfo.ticketsInfo)
    const [isOpen, setIsOpen] = React.useState(false)
    const [isTicket, toogleTickets] = React.useState(false)
    const isFree = useField("isFree");
    const ticketCost = useField("ticketCost");
    const ticketCount = useField("ticketCount");
    const ticketCurrency = useField("ticketCurrency");
    const { change } = useForm();
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }
    const handleDrawer = (name: string) => {
        setIsOpen((prevState) => !prevState)
        if (name.toLowerCase() === 'free') return change("isFree", true)
        change("isFree", false)
    }
    const saveTicketsToBase = async () => {
        if (isFree.input.value) {
            const { error } = await supabase.from('events').update({ price: 'Free', ticketsTotal: ticketsInfo?.ticketCount, ticketsLeft: ticketsInfo?.ticketCount }).eq("id", eventId)
            if (error) handleError()
        }
        else {
            const { error } = await supabase.from('events').update({ price: ticketsInfo?.ticketCost, currency: ticketsInfo?.ticketCurrency, ticketsTotal: ticketsInfo?.ticketCount, ticketsLeft: ticketsInfo?.ticketCount }).eq("id", eventId)
            if (error) handleError()
        }
    }
    const handleClick = () => {
        saveTicketsToBase()
        Swal.fire({
            icon: "success",
            timer: 1500,
            title: "You have created tickets!",
            text: "Let's publish it!",
        }).then(() => goToNextStep(2))
        dispatch(toogleStepsStatus({ tickets: true }))
    }
    const saveTickets = () => {
        toogleTickets(true);
        dispatch(setEventTicketsInfo({
            ticketCost: ticketCost.input.value,
            ticketCount: ticketCount.input.value,
            ticketCurrency: ticketCurrency.input.value.value,
            isFree: isFree.input.value
        }))
        toggleDrawer()
    }
    const clearTickets = () => toogleTickets(false)
    const isDisable = !(isFree.input.value ? ticketCount.input.value.length > 0 : (ticketCount.input.value.length > 0 && ticketCost.input.value.length > 0))

    useEffect(() => {
        if (!!ticketsInfo) toogleTickets(!!ticketsInfo.ticketCost)
    }, [ticketsInfo])
    return (
        <div className='editor_title' >
            <h1>Create tickets</h1>
            <p>Choose a ticket type or build a section with multiple ticket types.</p>
            {(isTicket && !isDisable) || (isTicket && !!ticketsInfo) ?
                <div className="ticket_list">
                    <TicketsInfo isFree={isFree.input.value || ticketsInfo?.isFree} ticketCount={ticketCount.input.value || ticketsInfo?.ticketCount} ticketCost={ticketCost.input.value || ticketsInfo?.ticketCost} ticketCurrency={ticketCurrency.input.value.value || ticketsInfo?.ticketCurrency} handleDrawer={handleDrawer} />
                    <div className='ticket_list-buttons-container'>
                        <GrayButton text="Change tickets" onClick={clearTickets} className='btn_action-gray' />
                        <OrangeButton text="Go next" onClick={handleClick} />
                    </div>
                </div >
                : <div className="ticket_list">
                    {ticketTypes.map(({ name, description, icon }) =>
                        <div className="ticket_item" key={name} onClick={() => handleDrawer(name)}>
                            {icon}
                            <div>
                                <h3>{name}</h3>
                                <p>{description}</p>
                            </div>
                            <Arrow_down className="ticket_arrow" />
                        </div>
                    )}
                </div>
            }
            <TicketModal isFree={isFree.input.value} isOpen={isOpen} toggleDrawer={toggleDrawer} saveTickets={saveTickets} disable={isDisable} />
        </div >
    )
}
