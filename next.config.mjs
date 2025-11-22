import withPWAInit from "@ducanh2912/next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",        // <-- REQUIRED for GitHub Pages
  images: {
    unoptimized: true,     // <-- REQUIRED for export
  },
  basePath: "/<your-repo-name>", // OPTIONAL but needed if site is not root
  assetPrefix: "/<your-repo-name>/",
};

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

export default withPWA(nextConfig);
