/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/home', destination: '/', permanent: false },
      { source: '/shop', destination: '/#collection', permanent: false },
      { source: '/gallery', destination: '/#collection', permanent: false },
      { source: '/collection', destination: '/#collection', permanent: false },
      { source: '/customize', destination: '/#customize', permanent: false },
      { source: '/custom-studio', destination: '/#customize', permanent: false },
      { source: '/makers', destination: '/#makers', permanent: false },
      { source: '/about', destination: '/#about', permanent: false },
      { source: '/contact', destination: '/#contact', permanent: false },
      { source: '/events', destination: '/#collection', permanent: false },
    ]
  },
}

export default nextConfig
