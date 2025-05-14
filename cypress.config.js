
const { defineConfig } = require("Cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    //specPattern: "cypress/e2e/**/*.{js,jsx,ts,txs,feature}", {cy,spec}.{js,ts},
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,txs,feature}",
    watchForFileChanges: false,
    chromeWebSecurity: false,
    blockHosts: ["https://events.backtrace.io"]
    
  },
});