import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import React from 'react'
import GrayButton from '../buttons/gray-button'

export default function NewComment({ eventId }: { eventId: string }) {
    const addComment = async (formData: FormData) => {
        'use server'
        const comment = String(formData.get('comment'))
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            await supabase.from('comments').insert({ text: comment, user_id: user.id, event_id: eventId })
            revalidatePath("/event/[id]")
        }
    }

    return (
        <form action={addComment} className='newcomment' >
            <textarea name="comment" />
            <GrayButton type="button" text="Add comment" />
        </form>
    )
}
