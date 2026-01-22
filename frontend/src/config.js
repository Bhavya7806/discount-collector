const config = {
  API_BASE_URL: process.env.NODE_ENV === 'production' 
    ? 'https://discount-collector.onrender.com' // We will get this URL later
    : 'http://localhost:8080'
};

export default config;