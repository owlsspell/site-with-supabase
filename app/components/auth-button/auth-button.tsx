'use client'
import supabase from "@/utils/supabase/client-supabase"
import { Session } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"

export default function AuthButton({ session }: { session: Session | null }) {
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
            {session ? <button onClick={onLogOut}>Log out</button> : <button onClick={signInWithGithub}>Log in</button>}
        </>
    )
}