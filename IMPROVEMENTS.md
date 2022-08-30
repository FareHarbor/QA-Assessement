# Improvement suggestions on implementation of cypress/e2e/test.cy.js and the corelated files:
- cypress/pageObjects/booking.js
- cypress/pageObjects/calendar.js
- cypress/pageObjects/utils.js

## POM pattern

The pattern itself implements a high level of organisation and apstraction which is particularly useful when developing a testing framework with OOP in mind.

This implementation lacks both organisation and absctraction which can be seen in following points:
- The locators are hardcoded on all places accross the whole implementation, which, of course, impacts highly the readability and the meintenance effort in case of some changes on frontend. Best practice in Cypress is to seperate them in another file
- utils.js file is on page object level. Cypress folder structure gives plenty of options for modelling custom behavior like support and plugin folders.
- Structure in the test file should be more readable. That can be achieved by different organisations of test steps where instead of every step being a separate test(it() block of code) the steps are put into one test
- Rule of thumb should be that one test validates one thing in a specific scenario. Out test.cy.js tests multiple things along the test case execution which can lead to an issue where multiple tests could fail that do not even test that component
- Do not write code just because of code. Every line should have it's own purpose and be there for a reason and tester should have in mind what is being performed in the app i.e. unnecessary cy.request being called in test.cy.js or setting the country in booking.js on line 13 when it gets overwritten in line 14

## DRY
Regarding *DRY* principles, there has not been much written in order to comment what improvements could have been made, but here are some remarks:
- Better organisation of selectors can improve visibility and therefore usage of selectors
- chaining methods i.e. calendar.js line 16 and 17 could have been one line
- Make the methods modular i.e. fillpaymentCC() could have been implemented so that it supports other card numbers as well

## General remarks
The test itself can be improved a lot in terms of how the test data is being handled. In the whole solution we have hardcoded data and Cypress offers features like fixtures in order to make the framework and testing data driven

The test itself should not depend on be dependent of states of elements that are not the main goal of testing of the test, for example, if we run the test.cy.js test few times so that all of the tours are sold out that day, the test will fail and it will not even test the main goal

Best practices for writing test cases is to write them in an so called 'imperative mood' i.e. "Click the Login button", "Select options xyz", which in test.cy.js is not the case

