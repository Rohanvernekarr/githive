'use client'

import { useState } from 'react'
import { Search, X } from 'lucide-react' // Import X icon for the exit button

export default function SearchSection() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false) // State to manage filter visibility
  const [activeFilters, setActiveFilters] = useState<string[]>([]) // State to track active filters

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // GitHub API search logic
    console.log('Searching:', searchQuery)
    setShowFilters(true) // Show filters when search is clicked
  }

  // Function to toggle filter selection
  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter) // Remove filter if already active
        : [...prev, filter] // Add filter if not active
    )
  }

  return (
    <section className="bg-gradient-to-r from-gray-700 to-gray-900 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Discover Amazing GitHub Projects
        </h1>
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
          <div className="flex shadow-lg">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for projects..."
              className="flex-1 text-black p-6 py-4 rounded-l-lg focus:outline-none"
            />
            <button
              title="button"
              type="submit"
              className="bg-gray-600 px-8 py-4 rounded-r-lg hover:bg-gray-500 transition"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </form>

        {/* Filter Section */}
        {showFilters && (
          <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-lg relative">
            {/* Exit Button */}
            <button
              title="exit"
              onClick={() => setShowFilters(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-semibold text-white mb-4">Filters</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Language Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-300">Language</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {['JavaScript', 'TypeScript', 'Python', 'Java'].map((lang) => (
                    <button
                      key={lang}
                      title={lang}
                      onClick={() => toggleFilter(lang)}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                        activeFilters.includes(lang)
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stars Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-300">Stars</label>
                <input
                  type="number"
                  placeholder="Min stars"
                  className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Sort By Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-300">Sort By</label>
                <select
                  title="search"
                  className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="stars">Stars</option>
                  <option value="forks">Forks</option>
                  <option value="updated">Last Updated</option>
                </select>
              </div>
            </div>

            {/* Apply Filters Button */}
            <div className="mt-6">
              <button
                type="button"
                className="w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}