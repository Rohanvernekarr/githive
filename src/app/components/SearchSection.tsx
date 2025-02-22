'use client';

import { useState, useEffect } from 'react';
import { Search, History, X } from 'lucide-react';
import { FaFilter } from 'react-icons/fa';
import SearchResults from './SearchResults';
import { useSession } from 'next-auth/react';
import Filters from './Filters';




export type GitHubProject = {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  topics: string[];
  updated_at: string;
  owner: {
    login: string;
    avatar_url: string;
  };
};

export default function SearchSection() {
  const { data: session, status } = useSession();

  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [minStars, setMinStars] = useState<number | undefined>();
  const [sortBy, setSortBy] = useState('stars');
  const [searchResults, setSearchResults] = useState<GitHubProject[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);

  // Check for URL query params on initial load
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const queryParam = urlParams.get('q');

    if (queryParam) {
      setSearchQuery(queryParam);
      handleSearch({ preventDefault: () => {} } as React.FormEvent);
    }

    // Load search history from localStorage
    const savedHistory = localStorage.getItem('githubSearchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save search to history (both localStorage and API if logged in)
  const saveSearchToHistory = async (query: string) => {
    if (!query.trim()) return;

    // Update local state and localStorage
    const updatedHistory = [
      query,
      ...searchHistory.filter((item) => item !== query).slice(0, 9),
    ];

    setSearchHistory(updatedHistory);
    localStorage.setItem('githubSearchHistory', JSON.stringify(updatedHistory));

    // If user is logged in, also save to API
    if (status === 'authenticated' && session?.user) {
      try {
        await fetch('/api/search-history', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query }),
        });
      } catch (error) {
        console.error('Failed to save search to server:', error);
      }
    }
  };

  // Save visited repositories to localStorage
  const saveVisitedRepoToLocalStorage = (repo: GitHubProject) => {
    const visitedRepos = JSON.parse(localStorage.getItem('visitedRepos') || '[]');

    // Check if the repo is already in the list to avoid duplicates
    const isRepoAlreadyVisited = visitedRepos.some(
      (visitedRepo: GitHubProject) => visitedRepo.id === repo.id
    );

    if (!isRepoAlreadyVisited) {
      
      visitedRepos.push(repo);

      
      localStorage.setItem('visitedRepos', JSON.stringify(visitedRepos));
    }
  };

  // Track repo visit
  const trackRepoVisit = async (repo: GitHubProject) => {
    
    saveVisitedRepoToLocalStorage(repo);

    // If user is logged in, save visited repo to API
    if (status === 'authenticated' && session?.user) {
      try {
        await fetch('/api/visited-repos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: repo.name,
            description: repo.description,
            url: repo.html_url,
            owner: repo.owner.login,
            ownerAvatar: repo.owner.avatar_url,
            stars: repo.stargazers_count,
            forks: 0, // Add this data if available
            language: repo.language,
          }),
        });
      } catch (error) {
        console.error('Failed to track repo visit:', error);
      }
    }
  };

  // Handle GitHub search
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setShowSearchOverlay(true);

    try {
      // Build the GitHub search query
      let queryParams = `q=${encodeURIComponent(searchQuery)}`;

      // Add language filter if any are active
      const languages = activeFilters.filter((filter) =>
        ['JavaScript', 'TypeScript', 'Python', 'Java'].includes(filter)
      );

      if (languages.length > 0) {
        languages.forEach((lang) => {
          queryParams += `+language:${lang}`;
        });
      }

      // Add stars filter if specified
      if (minStars && minStars > 0) {
        queryParams += `+stars:>=${minStars}`;
      }

      // Add sort parameter
      queryParams += `&sort=${sortBy === 'updated' ? 'updated' : sortBy === 'forks' ? 'forks' : 'stars'}`;
      queryParams += `&order=desc`;

      // Make the API call
      const response = await fetch(`https://api.github.com/search/repositories?${queryParams}`);

      if (!response.ok) {
        throw new Error('GitHub API request failed');
      }

      const data = await response.json();
      setSearchResults(data.items || []);

      // Save search to history
      saveSearchToHistory(searchQuery);

      // Update URL with search query without page reload
      const url = new URL(window.location.href);
      url.searchParams.set('q', searchQuery);
      window.history.pushState({}, '', url);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Apply filters
  const applyFilters = () => {
    handleSearch({ preventDefault: () => {} } as React.FormEvent);
  };

  // Close search overlay
  const closeSearchOverlay = () => {
    setShowSearchOverlay(false);
  };

  // Delete search history item
  const deleteSearchHistoryItem = (index: number) => {
    const updatedHistory = searchHistory.filter((_, i) => i !== index);
    setSearchHistory(updatedHistory);
    localStorage.setItem('githubSearchHistory', JSON.stringify(updatedHistory));
  };

  return (
    <>
      <section className="bg-gradient-to-r from-zinc-800 font-sans to-zinc-950 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white font-sans text-center mb-8">
            Discover Amazing <span className="text-gray-300">GitHub Projects</span>
          </h1>
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="flex shadow-lg">
              {/* Search Input */}
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for projects..."
                className="flex-1 h-16 text-black text-xl p-4 sm:p-6 bg-slate-200 rounded-l-lg focus:outline-none focus:border-white"
              />

              {/* Filter Button */}
              <section className="bg-slate-200 p-2 sm:p-4 transition border-n flex items-center justify-center w-12 sm:w-16">
                <FaFilter
                  title="filter"
                  onClick={() => setShowFilters(!showFilters)}
                  className="text-lg sm:text-xl cursor-pointer text-zinc-400 w-5 h-5 sm:w-6 sm:h-6"
                />
              </section>

              {/* Search Button */}
              <button
                title="search"
                type="submit"
                className="bg-zinc-800 px-6 sm:px-8 py-4 rounded-r-lg hover:bg-zinc-900 transition flex items-center justify-center"
              >
                <Search className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </button>
            </div>
          </form>

          {/* Filter Section */}
          {showFilters && (
            <Filters
              activeFilters={activeFilters}
              setActiveFilters={setActiveFilters}
              minStars={minStars}
              setMinStars={setMinStars}
              sortBy={sortBy}
              setSortBy={setSortBy}
              applyFilters={applyFilters}
              onClose={() => setShowFilters(false)}
            />
          )}

          {/* Search History */}
          {searchHistory.length > 0 && !showSearchOverlay && (
            <div className="mt-8">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-gray-300">
                  <History className="w-4 h-4" />
                  <h3 className="text-md font-medium">Recent Searches</h3>
                </div>
                <button
                  onClick={() => {
                    setSearchHistory([]);
                    localStorage.removeItem('githubSearchHistory');
                  }}
                  className="text-sm text-gray-400 hover:text-gray-500 transition"
                >
                  Clear All
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {searchHistory.map((query, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-3 py-1 bg-zinc-800 text-gray-300 text-sm rounded-full hover:bg-zinc-700 transition group"
                  >
                    <button
                      onClick={() => {
                        setSearchQuery(query);
                        handleSearch({ preventDefault: () => {} } as React.FormEvent);
                      }}
                      className="hover:text-white truncate"
                    >
                      {query}
                    </button>
                    <button
                      onClick={() => deleteSearchHistoryItem(index)}
                      className="text-gray-300 hover:text-gray-400 transition-opacity opacity-0 group-hover:opacity-100 duration-200"
                      title="Delete"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Search Results Component */}
      {showSearchOverlay && (
        <SearchResults
          searchQuery={searchQuery}
          isLoading={isLoading}
          searchResults={searchResults}
          onClose={closeSearchOverlay}
          onRepoClick={trackRepoVisit}
        />
      )}
    </>
  );
}