/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/demo",
        destination: "/admin",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
