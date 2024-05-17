/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  rewrites: async () => [
    {
      source: "/public/documentation.html",
      destination: "/pages/api/documentation.js",
    },
  ],
  
}



module.exports = nextConfig
