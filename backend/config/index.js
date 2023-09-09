const FE_URL = process.env.FE_URL
const BE_URL = process.env.BE_URL
const config = {
  migrate: false,
  port: process.env.PORT || 3000,

  client_url: FE_URL,
  webclient_url: FE_URL,
  api_url: BE_URL,
};

module.exports = config;
