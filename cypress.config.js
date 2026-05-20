const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "94jzek",

  e2e: {
    setupNodeEvents(on, config) {
      return config;
    },
  },
});