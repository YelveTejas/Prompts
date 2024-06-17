"use client";
import React, { useEffect, useState } from "react";
import Form from "@/components/Form";
import { useSession } from "next-auth/react";
import { useRouter,useSearchParams } from "next/navigation";

const UpdatePrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const [submitting, setSubmiting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });


  useEffect(() => {
      const getPromptDetails = async () => {
        console.log(promptId,'promptId')
          const response = await fetch(`/api/prompt/${promptId}`);
          const data = await response.json();
      //    console.log(data,'data')
          setPost({
              prompt: data.prompt,
              tag: data.tag
          })
         

      }
      if(promptId) getPromptDetails()
  },[promptId])
  const PromptUpdate = async (e) => {
    e.preventDefault();
    setSubmiting(true);
    //call create prompt
    if(!promptId) return alert("Prompt Id not found");
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error,'error');
    } finally {
      setSubmiting(false);
    }
  };
  return (
    <Form
      type="Update"
      post={post}
      setPost={setPost}
      submiting={submitting}
      setSubmiting={setSubmiting}
      handleSubmit={PromptUpdate}
    ></Form>
  );
};

export default UpdatePrompt;
