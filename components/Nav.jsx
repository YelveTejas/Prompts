"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getProviders, signIn, signOut, useSession } from "next-auth/react";

const Nav = () => {
  const {data: session} = useSession();

  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [providers, setProviders] = useState(null);
  //console.log(session,'session')
  useEffect(() => {
    const fetchProviders = async () => {
      const response = await getProviders();
  //    console.log(response,'response');
      setProviders(response);
    };

    fetchProviders();
  }, []); // Empty dependency array ensures this runs only once

  return (
    <nav className="flex-between w-full mb-5 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src={"assets/images/logo.svg"}
          alt="logo"
          width={30}
          height={30}
        />
        <p className="logo_text">Prompts</p>
      </Link>
      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href={"/create-prompt"} className="black_btn">
              Create Post
            </Link>
            <Link href={"/profile"} className="outline_btn">
              Profile
            </Link>
            <button type="button" onClick={signOut}>
              Sign Out
            </button>
            <Link href={"/profile"}>
              <Image
                src={`${session?.user?.image}`}
                alt="logo"
                width={37}
                height={37}
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={`${session?.user?.image}`}
              alt="logo"
              width={37}
              height={37}
              className="rounded-full"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href={"/profile"}
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Profile
                </Link>
                <Link
                  href={"/create-prompt"}
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Post
                </Link>
                <button
                  className="mt-5 w-full black_btn"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
