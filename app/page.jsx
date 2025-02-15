import Feed from "@/components/Feed";
import React from "react";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col ">
      <h1 className="head_text text-center">
        Discover and Share
        </h1>
        <h2 className="blue_gradient text-center md:text-6xl text-5xl font-bold">AI-Powered Prompts</h2>
      
      <p className="desc text-center">
        Promptopia is an open-source AI prompting tool for modern world to
        discover, create and share creative prompts
      </p>
      <Feed />
    </section>
  );
};

export default Home;
