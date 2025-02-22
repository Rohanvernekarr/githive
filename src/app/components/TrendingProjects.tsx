'use client';
import { useEffect, useState } from 'react';
import Image from "next/image";

interface Project {
  id: number;
  name: string;
  description: string;
  stars: number;
  language: string;
  owner: string;
  url: string;
  avatarUrl: string;
  openIssues: string;
  topics: string[];
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  owner: {
    login: string;
    avatar_url: string;
  };
  html_url: string;
  open_issues_count: number;
  topics: string[];
}

export default function TrendingProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrendingProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          'https://api.github.com/search/repositories?q=stars:>10000&sort=stars&order=desc&per_page=9'
        );
        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }
        const data = await response.json();
        const formattedProjects: Project[] = data.items.map((repo: GitHubRepo) => ({
          id: repo.id,
          name: repo.name,
          description: repo.description || "No description available",
          stars: repo.stargazers_count,
          language: repo.language || "readmd",
          owner: repo.owner.login,
          openIssues: repo.open_issues_count,
          url: repo.html_url,
          avatarUrl: repo.owner.avatar_url,
          topics: repo.topics || [],
        }));
        setProjects(formattedProjects);
      } catch (error) {
        setError('Failed to load trending projects. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchTrendingProjects();
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return Math.floor(num / 1000) + "k";
    return num.toString();
  };

  return (
    <section className="py-6 bg-gradient-to-r font-montserrat from-zinc-800 to-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-sans font-bold text-white mb-8">
          Highest Stars..
        </h2>
        {loading && (
          <div className="text-center py-10">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white"></div>
            <p className="mt-4 text-white">Loading trending projects...</p>
          </div>
        )}
        {error && (
          <div className="bg-red-900/30 border border-red-700 text-white p-4 rounded mb-6">
            {error}
          </div>
        )}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="group">
                <div className="bg-zinc-900 rounded-lg shadow-md overflow-hidden transform transition duration-300 ease-in-out group-hover:shadow-xl group-hover:shadow-purple-500/20 group-hover:bg-zinc-900">
                  <div className="p-6 flex flex-col transition-all duration-300 h-full">
                    <div className="flex items-center mb-3">
                      <Image 
                        src={project.avatarUrl} 
                        width={100} 
                        height={100} 
                        alt={`${project.owner}'s avatar`}
                        className="w-10 h-10 rounded-full mr-3 border-2 border-zinc-700"
                      />
                      <h3 className="text-xl font-semibold ml-1 group-hover:text-purple-300 transition duration-300">
                        {project.name}
                      </h3>
                    </div>
                    <div className="flex items-center mb-3 flex-wrap gap-2">
                      {project.language && (
                        <span className="text-sm bg-zinc-700 group-hover:bg-zinc-600 px-3 py-1 rounded-full transition duration-300">
                          {project.language}
                        </span>
                      )}
                      {project.topics && project.topics.slice(0, 2).map(topic => (
                        <span key={topic} className="text-sm bg-purple-900/30 group-hover:bg-purple-900/50 px-3 py-1 rounded-full transition duration-300">
                          {topic}
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-400 mb-4 line-clamp-2 flex-grow">
                      {project.description}
                    </p>
                    <div className="flex justify-between mt-auto">
                      <span className="text-sm bg-green-800/50 px-3 py-1 rounded-full transition duration-300">
                        Issues: {project.openIssues}
                      </span>
                      <div className="flex items-center">
                        <span className="text-base text-yellow-500 group-hover:text-yellow-400 transition duration-300 flex items-center">
                          <svg className="w-4 h-4 mr-1 group-hover:animate-pulse" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                          {formatNumber(project.stars)}
                        </span>
                      </div>
                    </div>
                    <a 
                      href={project.url}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex w-full justify-center py-2 border border-zinc-700 
                      rounded-md 
                        text-sm text-white bg-zinc-800/50 hover:bg-purple-500/30 
                        transition-all duration-300
                        md:opacity-0 md:group-hover:opacity-100 md:h-0 md:group-hover:h-10 
                        md:overflow-hidden md:group-hover:overflow-visible
                        md:my-0 md:group-hover:my-2"
                    >
                      View Repository
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}