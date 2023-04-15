const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "7b3n2b",
  env: {
    realscenario: true
  },
  e2e: {
    baseUrl: "https://wines-app.onrender.com/",
    apiUrl: "https://wines-api.onrender.com/api/",
  },
});
