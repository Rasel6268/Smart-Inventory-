const axios = require("axios"); // CommonJS style

// create API instance
const api = axios.create({
  baseURL: "/api",       
  withCredentials: true,
});

module.exports = api;