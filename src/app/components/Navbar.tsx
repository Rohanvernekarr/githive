'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signIn, signOut } from 'next-auth/react'
import Image from 'next/image'

export default function Navbar() {
  const pathname = usePathname()
  const { data: session, status } = useSession()
  const loading = status === 'loading'

  return (
    <nav className="bg-gradient-to-r from-gray-800 to-gray-900 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo & Links */}
          <div className="flex">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-white">
                Git<span className="text-gray-400 font-bold">Hive</span>
              </span>
            </Link>

            <div className="ml-10 flex items-center space-x-4">
              <Link
                href="/"
                className={`${
                  pathname === '/' ? 'text-blue-300' : 'text-white hover:text-gray-300'
                } px-3 py-2 rounded-md text-sm font-medium`}
              >
                Home
              </Link>
              <Link
                href="/about"
                className={`${
                  pathname === '/about' ? 'text-blue-300' : 'text-white hover:text-gray-300'
                } px-3 py-2 rounded-md text-sm font-medium`}
              >
                About
              </Link>
              {session && (
                <Link
                  href="/dashboard"
                  className={`${
                    pathname === '/dashboard' ? 'text-blue-300' : 'text-white hover:text-gray-300'
                  } px-3 py-2 rounded-md text-sm font-medium`}
                >
                  Dashboard
                </Link>
              )}
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-2">
            {loading ? (
              <div className="h-8 w-8 bg-gray-600 rounded-full animate-pulse"></div>
            ) : session ? (
              <div className="flex items-center gap-3">
                {session.user?.image && (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || 'User'}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                )}
                <span className="text-sm text-gray-300 hidden md:inline">
                  {session.user?.name || session.user?.email}
                </span>
                <button
                  onClick={() => signOut()}
                  className="bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => signIn()}
                  className="bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition"
                >
                  Sign In
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
