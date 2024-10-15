import React from 'react'
import OrangeButton from '../../buttons/orange-button'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export default function UserSettings({ user }: { user: UserProfile }) {
    const updateUserData = async (formData: FormData) => {
        'use server'
        const name = String(formData.get('name'))
        const username = String(formData.get('username'))
        const supabase = createClient()
        await supabase.from('profiles').update({ name, username }).eq("id", user.id)
        revalidatePath("/organizations/settings")
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
            </form>
        </div>
    )
}
