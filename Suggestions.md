# Some suggestions and considerations for this project

## Risks ☠️

### Technical discoveries (bugs 🕵️ 🔎 🐞)

1. There are some elements in the UI that does not have an identifier. For example, the people selectors and the category options of the **Big Apple's Private Tour**, the cards displayed in the Home page to select a tour, the time slots, etcetera.
2. Some of the elements does not have a proper ID or Class. The ID/Class is generated by the JS transpiler.
3. If you book a tour, a real booking is made. So, if you attempt to run again the tests, the day will be not available for testing purposes.

## Project Structure 🗂

1. Since the project uses **Cypress**, my recommendation is to use app actions, instead of Page Object Model.
2. There is no usage of commands, and this is strongly recommended in **Cypress**.
3. For me, the **utils.js** file, means an auxiliary class with methods that can help me to perform some functionalities not related with the UI of the page (i. e.: to generate a random number or string, to create a method to read a CSV/JSON file, etcetera).
4. The **index.js** file calls a module (_cypress-xpath_) that is not installed in the project.
5. I noticed that the original test (test.cy.js) tries to follow a **BDD** technique. I will not recommend using BDD for automation. Using **BDD** may complicate the entire project, adding an extra layer of complexity or making the code less readable, doing the project less maintainable

## Extras 😊

* I added a HTML reporter (_cypress-mochawesome-reporter_) to the project. The report is generated when you execute the _npm run test_ command.
* In the **package.json** I added the _npm run cypress:open_ command to execute Cypress using the UI.
* I added a **tsconfig.json** (to autocomplete the Cypress methods).
* I removed the **example.json** file (it is not needed).