const publicRuntimeConfig = {
  apiBaseUrl: process.env.API_BASE_URL,
  apiKey: process.env.API_KEY
}

const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig
};

module.exports = nextConfig;