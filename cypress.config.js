const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1880,
  viewportHeight: 1080,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    testIsolation : false,
    specPattern: 'cypress/e2e/*.js',
    trashAssetsBeforeRuns : false,
    video: true
  },
  
});
