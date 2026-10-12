/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: `npm run build` writes a plain website to /out
  // that any host can serve (Vercel, Netlify, GitHub Pages, Firebase…).
  output: "export",
  images: { unoptimized: true },
  // GitHub Pages project sites live under /<repo-name>. Set
  // NEXT_PUBLIC_BASE_PATH=/<repo-name> when building for that case.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  reactStrictMode: true,
};

export default nextConfig;
