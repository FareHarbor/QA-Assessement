// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Cypress.Commands.add('removeCommasFromNumber', (str) => { 
//     var format = /,/
//     if(format.test(str)){
//         str = str.replace(/,/, '')
//     }
//     return str;
// })

// Cypress.Commands.add('splitAndTrimString', (str,index) => { 
//         const amount = str.text()
//         var res = amount.split("$")
//         res = res[index].trim()
// })