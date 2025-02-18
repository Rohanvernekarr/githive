// app/dashboard/page.tsx
'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Search {
  id: string
  query: string
  createdAt: string
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [searches, setSearches] = useState<Search[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }

    if (status === 'authenticated') {
      fetchSearchHistory()
    }
  }, [status, router])

  const fetchSearchHistory = async () => {
    try {
      const response = await fetch('/api/search-history')
      const data = await response.json()
      setSearches(data)
    } catch (error) {
      console.error('Failed to fetch search history', error)
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="h-64 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    )
  }

  return (
    <div className='bg-gradient-to-r from-gray-800 to-gray-900 h-dvh'>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="bg-gray-900 shadow rounded-lg p-6">
        <div className="flex items-center space-x-4">
          {session?.user?.image && (
            <img
              src={session.user.image}
              alt={session.user.name || 'User'}
              className="h-12 w-12 rounded-full"
            />
          )}
          <div>
            <h2 className="text-xl font-semibold">
              {session?.user?.name || 'User'}
            </h2>
            <p className="text-gray-600">{session?.user?.email}</p>
          </div>
        </div>
        
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Your Recent Searches</h3>
          {searches.length > 0 ? (
            <ul className="space-y-2">
              {searches.map((search) => (
                <li key={search.id} className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-blue-600">{search.query}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(search.createdAt).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">You haven't made any searches yet.</p>
          )}
        </div>
      </div>
    </div>
    </div>
  )
}