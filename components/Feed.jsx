"use client";
import React, { useEffect, useRef, useState } from "react";
import Promtcard from "./Promtcard";
const PromptCardList = ({ data, handleClick }) => {
  return (
    <div className="mt-16 w-full flex flex-wrap gap-5 justify-center ">
      {data &&
        data.map((post) => (
          <Promtcard key={post._id} post={post} handleClick={handleClick} />
        ))}
    </div>
  );
};
const Feed = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const searchTimeoutRef = useRef(null);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
      setFilteredPosts(data); // Initialize filteredPosts with all posts
    } catch (error) {
      console.log(error, "error");
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => {
      if (value) {
        const regex = new RegExp(value, "i");
        setFilteredPosts(posts.filter(
          (item) => regex.test(item.creator.username) || regex.test(item.prompt)
        ));
      } else {
        setFilteredPosts(posts); 
      }
    }, 500);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section className="w-full">
      <form className="w-full md:w-[50%] relative flex-center mt-10 mx-auto">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          required
          placeholder="Search..."
          className="search_input peer"
        />
      </form>
      <PromptCardList data={filteredPosts} handleClick={() => {}} />
    </section>
  );
};

export default Feed;
