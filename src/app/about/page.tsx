import React from "react";


const Page = () => {
  return (
    <div className="bg-gradient-to-r from-zinc-800 font-montserrat to-zinc-950 w-full min-h-screen flex items-center justify-center p-6">
      <div className="max-w-4xl w-full  backdrop-blur-sm rounded-lg  p-8 text-gray-300">
        <h1 className="text-4xl font-bold text-zinc-200 mb-6 text-center">
          Welcome to <span className="text-zinc-300">GitHive</span>
        </h1>

        <p className="text-lg mb-8 text-center">
          Your go-to platform for discovering the best GitHub repositories. Whether you're a developer, student, or open-source enthusiast, GitHive helps you find repositories that match your interests.
        </p>

        <div className="space-y-6">
          
          <section>
            <h2 className="text-2xl font-semibold text-zinc-200 mb-4">
              Why GitHive? 🚀
            </h2>
            <ul className="list-disc ml-4 list-inside space-y-2">
              
              <li>
                <span className="font-medium">Smart Search & Filtering:</span> Quickly find projects by language, stars, contributors, and more.
              </li>
              <li>
                <span className="font-medium">Community-Driven:</span> Engage with like-minded developers and explore trending repositories.
              </li>
            </ul>
          </section>

         
          <section>
            <h2 className="text-2xl font-semibold text-zinc-200 mb-4">
              Our Mission
            </h2>
            <p className="text-lg ml-4">
              At GitHive, we aim to bridge the gap between developers and open-source projects by providing intelligent recommendations that save time and boost productivity. Our goal is to make open-source more accessible and encourage collaboration within the tech community.
            </p>
          </section>

          {/* Get Started Section */}
          <section>
            <h2 className="text-2xl font-semibold text-zinc-200 mb-4">
              Get Started
            </h2>
            <p className="text-lg ml-4 mb-4">
              Start exploring and discovering repositories that matter to you. Sign in with GitHub or Google to personalize your experience!
            </p>
            
          </section>

          
          <section>
            <h2 className="text-2xl font-semibold text-zinc-200 mb-4">
              Contact Us
            </h2>
            <p className="text-lg flex-row">
              📩 Reach out at{" "}
              <a
                href="https://x.com/Rohanvrnkr?s=09"
                className="text-white hover:underline"
              >
                  @Rohanvrnkr
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Page;