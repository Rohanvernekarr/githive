'use client';

import { X } from 'lucide-react';
import { GitHubProject } from './SearchSection';

import Image from "next/image";

interface SearchResultsProps {
  searchQuery: string;
  isLoading: boolean;
  searchResults: GitHubProject[];
  onClose: () => void;
  onRepoClick: (repo: GitHubProject) => void;
}

export default function SearchResults({
  searchQuery,
  isLoading,
  searchResults,
  onClose,
  onRepoClick,
}: SearchResultsProps) {
  return (
    <div className="fixed inset-0 bg-black font-sans bg-opacity-80 z-50 overflow-auto scrollbar-hide">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-white">Search Results for &quot;{searchQuery}&quot;</h2>

          <button
            title="close"
            onClick={onClose}
            className="p-2 rounded-full bg-zinc-800 text-white hover:bg-zinc-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        )}

        {!isLoading && searchResults.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-400">No projects found matching your criteria</p>
          </div>
        )}

        {!isLoading && searchResults.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((project) => (
              <ProjectCard key={project.id} project={project} onRepoClick={onRepoClick} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectCard({ project, onRepoClick }: { project: GitHubProject; onRepoClick: (repo: GitHubProject) => void; }) {
  const handleRepoClick = () => {
    const visitedRepos = JSON.parse(localStorage.getItem('visitedRepos') || '[]');
    const newRepo = {
      id: project.id,
      name: project.name,
      description: project.description || "No description available",
      url: project.html_url,
      owner: project.owner.login,
      ownerAvatar: project.owner.avatar_url,
      stars: project.stargazers_count,
      language: project.language,
      topics: project.topics || [],
      visitedAt: new Date().toISOString()
    };
    localStorage.setItem("visitedRepos" , JSON.stringify([...visitedRepos, newRepo]));
    onRepoClick(project);
  };

  return (
    <div key={project.id} className="group">
    <div className="bg-zinc-900 rounded-lg overflow-hidden hover:shadow-lg hover:shadow-purple-500/20 transition duration-300">
      <div className="p-6">
        <div className="flex items-start gap-3 mb-3">
          <Image src={project.owner.avatar_url}  width="100" 
                  height="100"  alt={project.owner.login} className="w-8 h-8 rounded-full" />
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-semibold text-white group-hover:text-purple-300 transition duration-300 truncate">
              {project.name}
            </h3>
            <p className="text-sm text-gray-400">by {project.owner.login}</p>
          </div>
        </div>
        <p className="text-gray-300 mb-4 line-clamp-2 h-12">{project.description || "No description available"}</p>
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1">
            <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <span className="text-gray-300">{project.stargazers_count.toLocaleString()}</span>
          </div>
          {project.language && (
            <div className="text-sm px-3 py-1 bg-zinc-800 rounded-full text-gray-300">{project.language}</div>
          )}
          {project.topics && project.topics.slice(0, 1).map(topic => (
                      <span key={topic} className="text-sm bg-purple-900/30 group-hover:bg-purple-900/50 px-3 py-1 
                      rounded-full transition duration-300">
                        {topic}
                      </span>
                    ))}
        </div>
        <a
          href={project.html_url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleRepoClick}
          className="block w-full text-center py-2 mt-2 bg-zinc-800 hover:bg-purple-500/30 text-white rounded-md transition"
        >
          View Project
        </a>
      </div>
      </div>
    </div>
  );
}
