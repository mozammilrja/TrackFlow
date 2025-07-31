"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { Sun, Moon } from "lucide-react";

export default function HomePage() {
  const { user, isLoaded } = useUser();
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();

  // Auto-redirect to /dashboard after login
  useEffect(() => {
    if (isLoaded && user) {
      router.push("/dashboard");
    }
  }, [user, isLoaded, router]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-4 py-10 flex flex-col gap-6">
        {/* Header */}
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">TrackFlow</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
              aria-label="Toggle Theme">
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            {user ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <div className="flex gap-2">
                <SignInButton>
                  <button className="text-sm px-4 py-2 rounded-md bg-blue-600 text-white">
                    Login
                  </button>
                </SignInButton>
                <SignUpButton>
                  <button className="text-sm px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 border">
                    Sign Up
                  </button>
                </SignUpButton>
              </div>
            )}
          </div>
        </header>

        {/* Hero Section */}
        <section className="text-center mt-10">
          <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl">
            Manage Projects. Track Issues. Empower Teams.
          </h2>
          <p className="mt-4 text-base text-gray-600 dark:text-gray-300">
            A modern JIRA-like project management tool built for agile
            workflows.
          </p>
          {!user && (
            <div className="mt-6">
              <SignUpButton>
                <button className="px-6 py-3 rounded-md bg-blue-600 text-white text-sm">
                  Get Started Free
                </button>
              </SignUpButton>
            </div>
          )}
        </section>

        {/* Features Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
          {[
            {
              title: "Agile Boards",
              desc: "Plan sprints, track progress, and manage tasks visually.",
            },
            {
              title: "Team Collaboration",
              desc: "Comment, assign, and discuss within tasks.",
            },
            {
              title: "Issue Tracking",
              desc: "Keep bugs and enhancements organized.",
            },
            {
              title: "Analytics",
              desc: "Visualize productivity across your team.",
            },
          ].map(({ title, desc }) => (
            <div
              key={title}
              className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 shadow-sm">
              <h3 className="font-semibold text-lg">{title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {desc}
              </p>
            </div>
          ))}
        </section>

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} TrackFlow. All rights reserved.
        </footer>
      </div>
    </main>
  );
}
