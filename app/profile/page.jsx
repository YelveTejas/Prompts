"use client";
import Profile from "@/components/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Profilepage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );
    if (hasConfirmed) {
      try {
       await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });
     //   const filteredPosts = posts.filter((p) => p._id !== post._id);
      //  setPosts(filteredPosts);
        router.push("/");
      } catch (error) {
        console.log(error,'error');
      }
    }
  };

  useEffect(() => {
    const fetchposts = async () => {
     // console.log(session?.user.id);
      try {
        const response = await fetch(`/api/users/${session?.user.id}/posts`);
        const data = await response.json();
        console.log(data, "prmpts");
        setPosts(data);
      } catch (error) {
        console.log(error, "error");
      }
    };

    if (session?.user.id) fetchposts();
  }, []);
  return (
    <Profile
      name="Hello Bachhi"
      desc="Wlcome to your personal profile"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default Profilepage;
