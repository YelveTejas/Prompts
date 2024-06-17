import React from "react";
import Promtcard from "./Promtcard";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name}</span>
      </h1>
      <p className="desc text-left max-w-md">{desc}</p>
      <section className="mt-16 w-full flex flex-wrap gap-5 justify-center ">
        {data &&
          data.map((post) => (
            <Promtcard
              key={post._id}
              post={post}
              handleEdit={() => handleEdit && handleEdit(post)}
              handleDelete={() => handleDelete && handleDelete(post)}
            />
          ))}
      </section>
    </section>
  );
};

export default Profile;
