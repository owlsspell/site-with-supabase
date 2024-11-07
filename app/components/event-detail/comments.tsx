'use client'
import supabase from "@/utils/supabase/client-supabase";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import GrayButton from "../custom/buttons/gray-button";
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

  return <>
    {comments?.length === 0 || comments === null ? "" : comments.map((comment) => (
      <div className="comment" key={comment.id}>
        <div className="comment_header">
          <div className="comment_author">
            <img src={comment.author.avatar_url} alt="" />
            {comment.author.username}
          </div>
          {!user ? "" :
            <GrayButton onClick={() => deleteComment(comment.id)} text="Delete" />
          }
        </div>
        <p>{comment.text}</p>
      </div>
    ))}
  </>;
}
