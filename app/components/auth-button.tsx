'use client'
import { createBrowserClient } from "@supabase/ssr"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function AuthButton() {
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    const router = useRouter()
    const [session, setSession] = useState(null)
    useEffect(() => {
        async function getSession() {
            const { data } = await supabase.auth.getSession()
            setSession(data.session)
        }
        getSession()
    }, [])

    async function signInWithGithub() {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: 'http://localhost:3000/auth/callback',
            },
        })
    }
    const onLogIn = () => { }
    const onLogOut = async () => {
        await supabase.auth.signOut();
        setSession(null)
        router.refresh()
    }

    return (
        <>
            {session ? <button onClick={onLogOut}>Log out</button> : <button onClick={signInWithGithub}>Log in</button>}
        </>
    )
}