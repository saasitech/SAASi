/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/demo",
        destination: "/edit",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
