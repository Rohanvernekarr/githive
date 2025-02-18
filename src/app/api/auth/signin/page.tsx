
'use client'

import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'


export default function SignIn() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  const error = searchParams.get('error')

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-zinc-800 to-zinc-950">
      <div className="max-w-md  space-y-8 p-8 bg-zinc-900 rounded-lg shadow-md">
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
            className="group w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-50 transition"
          >
            <span className="flex items-center">
              <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              Sign in with GitHub
            </span>
          </button>

          <button
            onClick={() => signIn('google', { callbackUrl })}
            className="group w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-50 transition"
          >
            <span className="flex items-center">
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" fill="#FFC107" />
                <path d="M7.004,14.93l2.938-2.355c-0.834-1.232-2.24-1.994-3.834-1.994c-2.654,0-4.826,2.172-4.826,4.826c0,2.654,2.172,4.826,4.826,4.826c2.126,0,3.926-1.39,4.555-3.311h-1.66c-0.49,0.948-1.467,1.601-2.605,1.601c-1.597,0-2.896-1.3-2.896-2.896c0-1.597,1.3-2.896,2.896-2.896C5.567,12.73,6.436,13.69,7.004,14.93z" fill="#FF3D00" />
                <path d="M16.809,9.193l-0.847,3.587h-3.008l0.847-3.587H16.809 M17.215,7.193h-5.024l-1.743,7.587h5.024L17.215,7.193L17.215,7.193z" fill="#4CAF50" />
                <path d="M12.191,17.361h-2.069l0.738-3.13h2.069L12.191,17.361z" fill="#1976D2" />
              </svg>
              Sign in with Google
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}