'use client'
import clientSupabase from "@/utils/supabase/client-supabase";
import { useRouter } from "next/navigation";
import React from "react";

export default function Comments({
  comments,
}: {
  comments: CommentWithAuthor[] | null;
}) {
  const supabase = clientSupabase()
  const router = useRouter()

  const deleteComment = async (id: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return
    await supabase.from("comments").delete().match({ id: id, user_id: user.id })
    router.refresh()
  }
  return <>
    {comments?.length === 0 || comments === null ? "" : comments.map((comment) => (
      <>
        <div key={comment.id}>
          <div>{comment.author.username}</div>
          <p>{comment.text}</p>
          <button onClick={() => deleteComment(comment.id)}>Delete</button>

        </div>
        <br />
      </>
    ))}
  </>;
}
