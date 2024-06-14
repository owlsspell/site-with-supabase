'use client'
import supabase from "@/utils/supabase/client-supabase";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import GrayButton from "../buttons/gray-button";
import { User } from "@supabase/supabase-js";

export default function Comments({
  comments,
}: {
  comments: CommentWithAuthor[] | null;
}) {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)

  const deleteComment = async (id: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return
    await supabase.from("comments").delete().match({ id: id, user_id: user.id })
    router.refresh()
  }

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user)
  }

  useEffect(() => {
    checkUser()
  }, [])

  return <div className="event_comments event_section">
    <h2 className="event_section-header">Discussion and Reviews</h2>
    {comments?.length === 0 || comments === null ? "" : comments.map((comment) => (
      <div className="comment" key={comment.id}>
        <div className="comment_header">
          <div>{comment.author.username}</div>
          {!user ? "" :
            <GrayButton onClick={() => deleteComment(comment.id)} text="Delete" />
          }
        </div>
        <p>{comment.text}</p>
      </div>
    ))}
  </div>;
}
