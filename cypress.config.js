const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    realscenario: true
  },
  e2e: {
    baseUrl: "https://wines-app.onrender.com/",
    apiUrl: "https://wines-api.onrender.com/",
  },
});
