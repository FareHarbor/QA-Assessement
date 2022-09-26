# Best Practices
1. As per Page Object model, all the Locators should not be used directly in the test cases. It should be in the Page class. This will improve the code re-usability and maintainability.
2. Use custom attribute to find the web elements instead of using CSS, ID or ng attributes etc.. For example use like data-test = "Name". It will improve the efficiency to find the elements in a faster way because it won't be changed incase of code changes in the Development side.

# Improvements

1. Added cypress-mochaawesome reporter. Also added configurations in the cypress.config.js for better reporting.
2. Added commands for scripts execution and open the cypress test runner
3. Reused example.json for the test data of declined payments card details
4. Index.js is removed since not used cypress-xpath in the project
5. Util.js should be outside of POM under Utility directory.
6. Deleted the test execution videos

# Test Execution

To execute the test cases please use the following command,

        npm run e2e

If you run this command you will get the report opened by default.