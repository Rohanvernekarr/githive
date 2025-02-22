"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Search, ExternalLink, Clock, Star, GitFork, X } from "lucide-react";
import Link from "next/link";
import { GitHubProject } from "../components/SearchSection";
import Image from "next/image";

interface SearchHistory {
  id: string;
  query: string;
  createdAt: string;
}

interface VisitedRepo {
  id: string;
  name: string;
  description: string;
  url: string;
  owner: string;
  ownerAvatar: string;
  stars: number;
  forks: number;
  language: string;
  visitedAt: string;
  avatarUrl: string;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);
  const [visitedRepos, setVisitedRepos] = useState<VisitedRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("searches");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }

    if (status === "authenticated") {
      Promise.all([fetchSearchHistory(), fetchVisitedRepos()]).finally(() => {
        setLoading(false);
      });
    }
  }, [status, router]);

  const fetchSearchHistory = async () => {
    try {
      const response = await fetch("/api/search-history");
      const data = await response.json();
      setSearchHistory(data);
    } catch (error) {
      console.error("Failed to fetch search history", error);

      // Fallback to localStorage if API fails
      const savedHistory = localStorage.getItem("githubSearchHistory");
      if (savedHistory) {
        const localData = JSON.parse(savedHistory);
        setSearchHistory(
          localData.map((query: string, index: number) => ({
            id: `local-${index}`,
            query,
            createdAt: new Date().toISOString(),
          }))
        );
      }
    }
  };

  const fetchVisitedRepos = async () => {
    try {
      const response = await fetch("/api/visited-repos");
      const data = await response.json();
      setVisitedRepos(data);
    } catch (error) {
      console.error("Failed to fetch visited repositories from API", error);

      // Fallback to localStorage if API fails
      const localVisitedRepos = localStorage.getItem("visitedRepos");
      if (localVisitedRepos) {
        const parsedRepos = JSON.parse(localVisitedRepos);
        setVisitedRepos(
          parsedRepos.map((repo: GitHubProject, index: number) => ({
            id: `local-${index}`,
            name: repo.name,
            description: repo.description,
            url: repo.html_url,
           
            
            stars: repo.stargazers_count,
            forks: 0, // Add forks if available
            language: repo.language,
           
            visitedAt: new Date().toISOString(),
          }))
        );
      }
    }
  };

  const handleSearchClick = (query: string) => {
    // Store the query and redirect to search page
    localStorage.setItem("lastSearch", query);
    router.push(`/?q=${encodeURIComponent(query)}`);
  };

  const removeVisitedRepo = (repoId: string) => {
    const updatedRepos = visitedRepos.filter((repo) => repo.id !== repoId);
    setVisitedRepos(updatedRepos);
    localStorage.setItem("visitedRepos", JSON.stringify(updatedRepos));
  };

  if (loading || status !== "authenticated") {
    return (
      <div className="bg-gradient-to-r from-zinc-800 to-zinc-950 h-dvh flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r font-sans from-zinc-800 to-zinc-950 min-h-dvh text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-10">
          <h1 className="text-4xl font-bold mb-2">Your Dashboard</h1>
          <p className="text-gray-400">Track your GitHub project discoveries </p>
        </header>

        <div className="bg-zinc-900 shadow-lg rounded-lg overflow-hidden">
          <div className="p-6 border-b border-zinc-800">
            <div className="flex items-center space-x-4">
              {session?.user?.image ? (
                <Image
                  src={session.user.image}
                  width="100" 
                  height="100" 
                  alt={session.user.name || "User"}
                  className="h-14 w-14 rounded-full border-2 border-blue-500"
                />
              ) : (
                <div className="h-14 w-14 rounded-full bg-zinc-700 flex items-center justify-center">
                  <span className="text-xl font-bold">
                    {session?.user?.name?.charAt(0) || "U"}
                  </span>
                </div>
              )}
              <div>
                <h2 className="text-2xl font-semibold">
                  {session?.user?.name || "User"}
                </h2>
                <p className="text-gray-400">{session?.user?.email}</p>
              </div>
            </div>
          </div>

          <div className="border-b border-zinc-800">
            <nav className="flex">
              <button
                onClick={() => setActiveTab("searches")}
                className={`px-6 py-4 flex items-center gap-2 transition ${
                  activeTab === "searches"
                    ? "border-b-2 border-blue-500 text-blue-400"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Search className="w-4 h-4" />
                <span>Recent Searches</span>
              </button>
              <button
                onClick={() => setActiveTab("repos")}
                className={`px-6 py-4 flex items-center gap-2 transition ${
                  activeTab === "repos"
                    ? "border-b-2 border-blue-500 text-blue-400"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <ExternalLink className="w-4 h-4" />
                <span>Visited Repositories</span>
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "searches" && (
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Your Recent Searches
                </h3>
                {searchHistory.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {searchHistory.map((search) => (
                      <div
                        key={search.id}
                        onClick={() => handleSearchClick(search.query)}
                        className="p-4 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition cursor-pointer"
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-blue-500/20 rounded-lg">
                            <Search className="w-5 h-5 text-blue-400" />
                          </div>
                          <div>
                            <p className="font-medium text-white truncate">
                              {search.query}
                            </p>
                            <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
                              <Clock className="w-3 h-3" />
                              <span>
                                {new Date(search.createdAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "short",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 bg-zinc-800/50 rounded-lg">
                    <Search className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
                    <p className="text-zinc-400">
                      You haven't made any searches yet.
                    </p>
                    <Link
                      href="/"
                      className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                    >
                      Discover Projects
                    </Link>
                  </div>
                )}
              </div>
            )}

            {activeTab === "repos" && (
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <ExternalLink className="w-5 h-5" />
                  Repositories You've Visited
                </h3>
                {visitedRepos.length > 0 ? (
                  <div className="space-y-4">
                    {visitedRepos.map((repo) => (
                      <div
                        key={repo.id}
                        className="group relative p-5 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition"
                      >
                        <button
                          onClick={() => removeVisitedRepo(repo.id)}
                          className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 transition-opacity opacity-0 group-hover:opacity-100"
                          title="Remove"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <a
                          href={repo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                        >
                          <div className="flex items-start gap-4">
                            
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-lg text-white truncate">
                                {repo.name}
                              </h4>
                              <p className="text-sm text-gray-400 line-clamp-2 mt-1">
                                {repo.description || "No description available"}
                              </p>
                              <div className="flex items-center gap-4 mt-3">
                                <div className="flex items-center gap-1 text-yellow-400">
                                  <Star className="w-4 h-4" />
                                  <span>
                                    {(repo.stars || 0).toLocaleString()}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1 text-gray-400">
                                  <GitFork className="w-4 h-4" />
                                  <span>
                                    {(repo.forks || 0).toLocaleString()}
                                  </span>
                                </div>
                                {repo.language && (
                                  <div className="px-2 py-1 rounded-full text-xs bg-zinc-700 text-gray-300">
                                    {repo.language}
                                  </div>
                                )}
                                <div className="flex items-center gap-1 ml-auto text-xs text-gray-500">
                                  <Clock className="w-3 h-3" />
                                  <span>
                                    Visited{" "}
                                    {new Date(
                                      repo.visitedAt
                                    ).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </a>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 bg-zinc-800/50 rounded-lg">
                    <ExternalLink className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
                    <p className="text-zinc-400">
                      You haven't visited any repositories yet.
                    </p>
                    <Link
                      href="/"
                      className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                    >
                      Discover Projects
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}