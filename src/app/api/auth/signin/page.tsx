'use client'

import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { FaGoogle } from "react-icons/fa"
import { useState } from 'react' 

export default function SignIn() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  const error = searchParams.get('error')

  
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-zinc-800 to-zinc-950">
      <div className="max-w-md space-y-8 p-8 bg-zinc-900 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-200">
            Sign in to GitHive
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Discover and track amazing GitHub projects
          </p>
        </div>

        {error && (
          <div className="bg-gray-50 border border-gray-200 text-red-700 px-4 py-3 rounded mb-4">
            {error === 'CredentialsSignin' ? 'Invalid credentials' : error}
          </div>
        )}

        <div className="mt-8 space-y-4">
          <button
            onClick={() => signIn('github', { callbackUrl })}
            className="group w-full flex justify-center py-3 px-4 border border-gray-300 
            rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-50 transition"
          >
            <span className="flex items-center">
              <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0
                 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 
                 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 
                 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 
                 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 
                 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 
                 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              Sign in with GitHub
            </span>
          </button>

          <button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium
             text-gray-700 bg-gray-200 hover:bg-gray-50 transition relative cursor-not-allowed"
          >
            <span className="flex gap-1.5 items-center">
              <FaGoogle className="text-xl" />
              Sign in with Google
            </span>
          
            
            
            {isHovered && (
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm px-2 py-1 
              rounded-md whitespace-nowrap">
                Under Development
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}