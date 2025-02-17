'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()
  
  return (
    <nav className="bg-gradient-to-r from-gray-700 to-gray-900 shadow-sm ">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-white">GitHive</span>
            </Link>
            
            <div className="ml-10 flex items-center space-x-4">
              <Link 
                href="/"
                className={`${
                  pathname === '/' 
                    ? 'text-blue-300' 
                    : 'text-white hover:text-gray-300'
                } px-3 py-2 rounded-md text-sm font-medium`}
              >
                Home
              </Link>
              <Link 
                href="/about"
                className={`${
                  pathname === '/about' 
                    ? 'text-blue-300' 
                    : 'text-white hover:text-gray-300'
                } px-3 py-2 rounded-md text-sm font-medium`}
              >
                About
              </Link>
              
            </div>
          </div>
          
          <div className="flex items-center">
            <button type='button' className="bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-medium">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}