#Suggestions and Improvements

# POM
1. POM design pattern isn't implemented and framework lacks it. 
- For better maintainability , resusability and keeping the code clean it is always advisable to keep the locators in page class methods for every screen else it will be very difficult to maintain when there are any UI changes in the future.
- Locators must never be hardcoded in the test execution script and should be kept separated [For each of the new test case created in repo, the suggestion for not hardcoding locators is provided as comments along with example]. 
2. Hard coding of data parameters / values must be avoided in the tests. Instead use fixtures folder with example.json provided by cypress to pass the data attributes for testing.
3. Usually utils/utility test file for various other testing frameworks gives an impression to have common methods inside it [like scrollUp, scrollDown, scrollToElement,getPageTitle, waitForVisibilityAndClick, etcetera]. However in this setup, utils isn't used for the purpose it is usually intended for [did not want to disrupt it so kept it as it is and utilised it the same without changing the framework structure]. 
4. Utils/utility test file should generally be kept outside of page object folder.
5. Under support folder, the index.js file can be deleted as cypress-xpath is not used anywhere [did not want to disrupt, so kept it without changing the framework structure].
6. Tests should be run independently from one another and succeed but that is not the case here for test.cy.js.

# DRY
- Some methods can be improvised and used for a generic purpose instead of creating redundcy for it [eg: fillPaymentCC()]. By passing the card details as parameter/argument inside fillPaymentCC() we can use it for both success and failure cases.
- Separating hardcoded locators/selectors into corresponding page class methods rather tha in actual tests can also help in avoiding redundancy [while they are called from one page class method into multiple test files wherever necessary]

# General
- When we try to automate any application, we need to have ample data for debuggin/testing our script or preferably have any means/tool that can discard the data used so as to use it multiple times. The entries chosen once during execution become invalidated on the next run as the data is consumed. Mechanism to reuse the data would be helpful.
- BDD approach is good to have as the simple gherkin language syntax keywords [like Given, When, Then, Scenario, Background, etcetera] to test requirements will be understandble by all when scripted and presented. However it may add a little bit of additional task / complexity pairing it with cypress. 
- Test execution report generation is suggested.
- Pipeline jobs and integration with CI / CD will be beneficial.

# Test Execution
1. Added commands in package.json to open cypress
use > npm openCypress
2. Added command to view all the test file execution on a UI [for chrome browser]
use > npm viewTestOnChromeBrowser
[Please note data for nextDay, nextMonth etc are already consumed/exhausted and are unavailable for booking hence the results will be failed after execution]
3. To execute all test files present in e2e folder
use > npm test
[Please note data for nextDay, nextMonth etc are already consumed/exhausted and are unavailable for booking hence the results will be failed after execution]
4. Test execution videos for each test file are available as part of videos folder. 
