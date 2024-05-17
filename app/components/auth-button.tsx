'use client'
import { createBrowserClient } from "@supabase/ssr"
import { useRouter } from "next/navigation"

export default function AuthButton() {
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    const router = useRouter()
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
        router.refresh()
    }

    return (
        <>
            <button onClick={signInWithGithub}>Log in</button>
            <button onClick={onLogOut}>Log out</button>
        </>
    )
}