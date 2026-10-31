import React from 'react'
import AuthButton from './auth-button'
import { createClient } from '@/utils/supabase/server'

export default async function AuthButtonServer() {
    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()
    return (
        <AuthButton session={session} />
    )
}
