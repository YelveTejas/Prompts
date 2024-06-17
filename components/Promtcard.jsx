"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const Promtcard = ({ key, post, handleClick, handleDelete, handleEdit }) => {
  const pathName = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [copied, setCopied] = React.useState("");
  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  };
  return (
    <div className="border-rounded p-2 w-full md:w-[330px] border-2 border-orange.500 border-rounded">
      <div className="flex justify-between items-center gap-5 ">
        <div className="flex-1 flex justify-start items-center gap-3">
          <Image
            src={post.creator.image}
            width={30}
            height={30}
            alt="profile"
            className="object-contain rounded-full"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi text-lg font-semibold text-gray-900">
              {post.creator.username}
            </h3>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            width={12}
            height={12}
            alt="copy"
          />
        </div>
      </div>
      <p className="my-4 font font-satoshi text-md text-gray-700">
        {post.prompt}
      </p>
      <p
        className="font-inter text-md blue_gradient"
        
      >
        #{post.tag}
      </p>
      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default Promtcard;
