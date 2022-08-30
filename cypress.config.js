const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1880,
  viewportHeight: 1080,

  e2e: {
    baseUrl: "https://demo.fareharbor.com",
    defaultCommandTimeout: 30000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        log (message) {
          console.log(message)
          return null
        }
      })
    },
  },
  
});
