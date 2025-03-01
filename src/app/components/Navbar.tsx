"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import IMAGE from '../assets/Githivelogo.png'

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {

    setIsDropdownOpen(!isDropdownOpen);
    
  };

  return (
    <nav className="bg-gradient-to-r p-2.5 from-zinc-800 to-zinc-950 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo & Links */}
          <div className="flex ">
            <Link href="/" className="flex items-center">
            <div >
      <Image src={IMAGE} alt="GitHive Logo" width={150} height={150} className="glow-effect  drop-shadow-lg" />
    </div>
            </Link>

            <div className="ml-10 flex items-center space-x-4">
              <Link
                href="/"
                className={`${
                  pathname === "/"
                    ? "text-blue-300"
                    : "text-gray-200 hover:text-gray-300"
                } px-3 py-2 font-sans  rounded-md text-base font-medium`}
              >
                Home
              </Link>

              {session && (
                <Link
                  href="/dashboard"
                  className={`${
                    pathname === "/dashboard"
                      ? "text-blue-300"
                      : "text-gray-200 hover:text-gray-300"
                  } px-3 py-2 rounded-md font-sans text-base font-medium`}
                >
                  Dashboard
                </Link>
              )}
              <Link
                href="/about"
                className={`${
                  pathname === "/about"
                    ? "text-blue-300"
                    : "text-gray-200 hover:text-gray-300"
                } px-3 py-2 rounded-md font-sans text-base font-medium hidden md:block`}
              >
                About
              </Link>
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-2">
            {loading ? (
              <div className="h-8 w-8 bg-gray-600 rounded-full animate-pulse"></div>
            ) : session ? (
              <div className="flex items-center gap-3">
                {session.user?.image && (
                  <div className="relative">
                    <Image
                      src={session.user.image}
                      alt={session.user.name || "User"}
                      width={32}
                      height={32}
                      className="rounded-full cursor-pointer"
                      onClick={toggleDropdown}
                    />
                    {isDropdownOpen && (
                      <div className="absolute right-0 lg:left-0 mt-3 w-24 lg:w-28 rounded-md shadow-lg  bg-zinc-900 ring-1  ">
                        <div className="py-1">
                          <button
                            onClick={() => signOut()}
                            className=" w-full px-4 font-sans block py-2 text-sm text-white hover:bg-zinc-950"
                          >
                            Sign Out
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                <span
                  className="text-sm text-gray-300 hidden sm:hidden md:inline cursor-pointer"
                  onClick={toggleDropdown}
                >
                  {session.user?.name || session.user?.email}
                </span>
               
                <button
                  onClick={() => signOut()}
                  className="bg-gray-600 text-white font-sans px-4 py-2 hidden rounded-md text-sm font-medium hover:bg-gray-700 transition md:hidden"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => signIn()}
                  className="bg-zinc-900 ring-1 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-zinc-950 transition"
                >
                  Sign In
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
