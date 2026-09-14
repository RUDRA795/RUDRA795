import { useState, useEffect } from 'react';
import type { GitHubStats } from '../types';

export function useGitHubData(username: string = 'RUDRA795') {
  const [stats, setStats] = useState<GitHubStats>({
    publicRepos: 18,
    followers: 8,
    following: 12,
    topLanguages: [
      { name: "Python", percentage: 38, color: "#3572A5" },
      { name: "TypeScript", percentage: 26, color: "#3178C6" },
      { name: "Kotlin", percentage: 16, color: "#A97BFF" },
      { name: "JavaScript", percentage: 12, color: "#F7DF1E" },
      { name: "C / Other", percentage: 8, color: "#555555" }
    ],
    pinnedRepos: [
      {
        name: "OptiCure-AI",
        description: "Intelligent healthcare scheduling & multistage graph optimization.",
        stars: 14,
        forks: 3,
        language: "Kotlin",
        url: "https://github.com/RUDRA795/OptiCure-AI"
      },
      {
        name: "NagariX",
        description: "AI Urban command and civic telemetry platform for Nagpur.",
        stars: 19,
        forks: 5,
        language: "TypeScript",
        url: "https://github.com/RUDRA795/NagariX"
      },
      {
        name: "AquaSentinel",
        description: "Side-scan sonar & subsea debris detection system.",
        stars: 11,
        forks: 2,
        language: "Python",
        url: "https://github.com/RUDRA795/AquaSentinel"
      },
      {
        name: "Nereus-AI",
        description: "Conversational ARGO oceanic telemetry explorer.",
        stars: 9,
        forks: 1,
        language: "Python",
        url: "https://github.com/RUDRA795/Nereus-AI"
      }
    ]
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [isLive, setIsLive] = useState<boolean>(false);

  useEffect(() => {
    async function fetchGitHub() {
      try {
        const userRes = await fetch(`https://api.github.com/users/${username}`);
        if (!userRes.ok) throw new Error("GitHub API offline");
        const userData = await userRes.json();

        const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
        const reposData = reposRes.ok ? await reposRes.json() : [];

        setStats(prev => ({
          ...prev,
          publicRepos: userData.public_repos || prev.publicRepos,
          followers: userData.followers || prev.followers,
          following: userData.following || prev.following,
          pinnedRepos: Array.isArray(reposData) && reposData.length > 0 
            ? reposData.slice(0, 4).map((r: { name: string; description: string; stargazers_count: number; forks_count: number; language: string; html_url: string }) => ({
                name: r.name,
                description: r.description || "Experimental engineering repository.",
                stars: r.stargazers_count || 0,
                forks: r.forks_count || 0,
                language: r.language || "TypeScript",
                url: r.html_url
              }))
            : prev.pinnedRepos
        }));
        setIsLive(true);
      } catch {
        setIsLive(false);
      } finally {
        setLoading(false);
      }
    }

    fetchGitHub();
  }, [username]);

  return { stats, loading, isLive };
}
