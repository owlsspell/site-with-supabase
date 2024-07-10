'use client'
import supabase from "@/utils/supabase/client-supabase"
import { Session } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"
import GrayButton from "../buttons/gray-button"
import Link from "next/link"

export default function AuthButton({ session }: { session: Session | null }) {
    const router = useRouter()

    async function signInWithGithub() {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
            },
        })
        router.refresh()
    }
    const onLogOut = async () => {
        await supabase.auth.signOut();
        router.refresh()
    }

    return (
        <>
            {session ?
                <>
                    <Link href="/manage/events/home" className="header_user_image">
                        <img src={session?.user?.user_metadata.avatar_url} alt="" />
                    </Link>
                    <GrayButton text="Log out" onClick={onLogOut} />
                </>
                :
                <GrayButton text="Log In" onClick={signInWithGithub} />}
        </>
    )
}