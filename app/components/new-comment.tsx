import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import React from 'react'

export default function NewComment() {
    const addComment = async (formData: FormData) => {
        'use server'
        const comment = String(formData.get('comment'))
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            await supabase.from('comments').insert({ text: comment, user_id: user.id })
            revalidatePath("/")
        }
    }
    return (
        <form action={addComment}>
            <input type="text" name="comment" />
        </form>
    )
}
