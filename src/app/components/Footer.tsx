import React from 'react'

import { FaXTwitter } from "react-icons/fa6";

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-zinc-800 to-zinc-950 text-zinc-300 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center ">
          

          <div className='flex flex-col'>
            <p className="text-sm">&copy; {new Date().getFullYear()} GitHive. All rights reserved.

            </p>
            <p className='flex text-zinc-400 justify-center text-sm gap-2'>  Made by{" "}
               <Link href="https://x.com/Rohanvrnkr?s=09" className="text-sm gap-1 items-center flex flex-row hover:text-gray-200">
              <FaXTwitter className='text-sm rounded-md  ' textAnchor='Rohan'/> @Rohanvrnkr
               </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
