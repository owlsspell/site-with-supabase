'use client'
import supabase from "@/utils/supabase/client-supabase"
import { Session } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"
import GrayButton from "../buttons/gray-button"

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
    const onLogOut = async () => {
        await supabase.auth.signOut();
        router.refresh()
    }

    return (
        <>
            {session ?
                <>
                    <div className="header_user_image">
                        <img src={session?.user?.user_metadata.avatar_url} alt="" />
                    </div>
                    <GrayButton text="Log out" onClick={onLogOut} />
                </>
                :
                <GrayButton text="Log In" onClick={signInWithGithub} />}
        </>
    )
}