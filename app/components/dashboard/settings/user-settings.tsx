import React from 'react'
import OrangeButton from '../../custom/buttons/orange-button'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath, revalidateTag } from 'next/cache'
import ModalMessage from '../../modal/modal-message';
import { redirect } from 'next/navigation';

export default function UserSettings({ user, searchParams }: { user: UserProfile, searchParams: Record<string, string> | null | undefined; }) {
    const show = searchParams?.status;

    const updateUserData = async (formData: FormData) => {
        'use server'
        const name = String(formData.get('name'))
        const username = String(formData.get('username'))
        const supabase = createClient()
        const { error } = await supabase.from('profiles').update({ name, username }).eq("id", user.id)
        if (error) redirect('settings?status=error')
        redirect('settings?status=success')
    }

    return (
        <div className='settings_section'>
            <form action={updateUserData} >
                <h3>Contact Information</h3>
                <label>
                    <span>Full Name</span>
                    <input type='text' name="name" defaultValue={user.name} />
                </label>
                <label>
                    <span>Username</span>
                    <input type='text' name="username" defaultValue={user.username ?? ''} />
                </label>
                <OrangeButton type="button" text="Save" className='settings_section-btn' />
                {show && <ModalMessage />}
            </form>
        </div>
    )
}
