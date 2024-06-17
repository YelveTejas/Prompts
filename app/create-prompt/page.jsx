"use client";
import React, { useState } from "react";
import Form from "@/components/Form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const CratePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setSubmiting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const createpromt = async (e) => {
    e.preventDefault();
    setSubmiting(true);
    //call create prompt
    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
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
      console.log(error);
    } finally {
      setSubmiting(false);
    }
  };
  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submiting={submitting}
      setSubmiting={setSubmiting}
      handleSubmit={createpromt}
    ></Form>
  );
};

export default CratePrompt;
