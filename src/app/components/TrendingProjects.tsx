

interface Project {
    id: number;
    name: string;
    description: string;
    stars: number;
    language: string;
    owner: string;
  }
  
  export default async function TrendingProjects() {
    // This will be replaced with actual GitHub API call
    const projects: Project[] = [
      {
        id: 1,
        name: "react",
        description: "A JavaScript library for building user interfaces",
        stars: 200000,
        language: "JavaScript",
        owner: "facebook"
      },
      {
        id: 2,
        name: "typescript",
        description: "TypeScript is JavaScript with syntax for types",
        stars: 150000,
        language: "TypeScript",
        owner: "microsoft"
      },
      {
        id: 3,
        name: "typescript",
        description: "TypeScript is JavaScript with syntax for types",
        stars: 150000,
        language: "TypeScript",
        owner: "microsoft"
      },
      {
        id: 4,
        name: "typescript",
        description: "TypeScript is JavaScript with syntax for types",
        stars: 150000,
        language: "TypeScript",
        owner: "microsoft"
      },
      {
        id: 5,
        name: "typescript",
        description: "TypeScript is JavaScript with syntax for types",
        stars: 150000,
        language: "TypeScript",
        owner: "microsoft"
      },
      {
        id: 6,
        name: "typescript",
        description: "TypeScript is JavaScript with syntax for types",
        stars: 150000,
        language: "TypeScript",
        owner: "microsoft"
      }
    ]
  
    return (
      <section className="py-16 bg-gradient-to-r from-gray-700 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-8">
            Trending Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div 
                key={project.id}
                className="bg-gray-900 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm bg-gray-800 px-3 py-1 rounded-full">
                      {project.language}
                    </span>
                    <span className="text-sm text-yellow-600">
                      ★ {project.stars.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }