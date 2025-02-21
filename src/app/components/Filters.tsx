'use client';

import { X } from 'lucide-react';
import { useState } from 'react';

interface FiltersProps {
  activeFilters: string[];
  setActiveFilters: React.Dispatch<React.SetStateAction<string[]>>;
  minStars: number | undefined;
  setMinStars: (stars: number | undefined) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  applyFilters: () => void;
  onClose: () => void;
}

export default function Filters({
  activeFilters,
  setActiveFilters,
  minStars,
  setMinStars,
  sortBy,
  setSortBy,
  applyFilters,
  onClose,
}: FiltersProps) {
  const [customTag, setCustomTag] = useState(''); // State for custom tag input

  // Toggle filter selection
  const toggleFilter = (filter: string) => {
    setActiveFilters((prev: string[]) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter) // Remove the filter if it's already active
        : [...prev, filter] // Add the filter if it's not active
    );
  };

  // Add custom tag to active filters
  const addCustomTag = () => {
    if (customTag.trim() && !activeFilters.includes(customTag.trim())) {
      setActiveFilters((prev) => [...prev, customTag.trim()]);
      setCustomTag(''); // Clear the input field
    }
  };

  // Handle Enter key press in the input field
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addCustomTag();
    }
  };

  return (
    <div className="mt-8 bg-zinc-900 font-sans p-6 rounded-lg shadow-lg relative z-10">
      {/* Exit Button */}
      <button
        title="exit"
        onClick={onClose}
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
            {['JavaScript', 'TypeScript', 'Python', 'Java', 'Rust'].map((lang) => (
              <button
                key={lang}
                title={lang}
                onClick={() => toggleFilter(lang)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                  activeFilters.includes(lang)
                    ? 'bg-blue-500 text-white'
                    : 'bg-zinc-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Tags Input */}
        <div>
          <label className="block text-sm font-medium text-gray-300">Custom Language</label>
          <div className="flex gap-2 mt-2">
            <input
              type="text"
              placeholder="Add a language"
              value={customTag}
              onChange={(e) => setCustomTag(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 px-3 py-2 bg-zinc-700 border border-zinc-900 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={addCustomTag}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              Add
            </button>
          </div>
          {/* Display custom tags */}
          <div className="flex flex-wrap gap-2 mt-2">
            {activeFilters
              .filter((filter) => !['JavaScript', 'TypeScript', 'Python', 'Java', 'Rust'].includes(filter))
              .map((filter) => (
                <button
                  key={filter}
                  title={filter}
                  onClick={() => toggleFilter(filter)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                    activeFilters.includes(filter)
                      ? 'bg-blue-500 text-white'
                      : 'bg-zinc-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {filter}
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
            value={minStars || ''}
            onChange={(e) => setMinStars(e.target.value ? parseInt(e.target.value) : undefined)}
            className="mt-1 block w-full px-3 py-2 bg-zinc-700 border border-zinc-900 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Sort By Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-300">Sort By</label>
          <select
            title="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-zinc-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          onClick={applyFilters}
          className="w-full px-4 py-2 bg-zinc-700 text-white rounded-md hover:bg-zinc-800 transition"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}