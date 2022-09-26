const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1880,
  viewportHeight: 1080,
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    "reportDir": "cypress/report",
    "video": true,
    "charts": true,
    "code": false,
    "overwrite": false,
    "autoOpen": true,
    "reportPageTitle": "FareHarbor Automation Report",
    "reportFilename": "[datetime]-[name]-report",
    "timestamp": "longDate",
    "trashAssetsBeforeRuns": true
  },
  e2e: {
    baseUrl: "https://demo.fareharbor.com",
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});
