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

//Wait for all Netowrk Request to complete
Cypress.Commands.add("waitForResources", function (resources = []) {
	const globalTimeout = 20000
	const resourceCheckInterval = 2000
	const idleTimesInit = 3
	let idleTimes = idleTimesInit
	let resourcesLengthPrevious
	let timeout

	return new Cypress.Promise((resolve, reject) => {
		const checkIfResourcesLoaded = () => {
			const resourcesLoaded = cy.state("window")
				.performance.getEntriesByType("resource")
				.filter(r => !["script", "xmlhttprequest"].includes(r.initiatorType))

			const allFilesFound = resources.every(
				resource => {
					const found = resourcesLoaded.filter(
						resourceLoaded => {
							return resourceLoaded.name.includes(resource.name)
						},
					)
					if (found.length === 0) {
						return false
					}
					return !resource.number || found.length >= resource.number
				},
			)

			if (allFilesFound) {
				if (resourcesLoaded.length === resourcesLengthPrevious) {
					idleTimes--
				}
				else {
					idleTimes = idleTimesInit
					resourcesLengthPrevious = resourcesLoaded.length
				}
			}
			if (!idleTimes) {
				resolve()
				return
			}

			timeout = setTimeout(checkIfResourcesLoaded, resourceCheckInterval)
		}

		checkIfResourcesLoaded()
		setTimeout(() => {
			reject()
			clearTimeout(timeout)
		}, globalTimeout)
	})
})


Cypress.Commands.add('waitForAPIRequest',()=>{
    cy.intercept('GET', '/api/v1/companies/bigappletours/items/58792/availabilities/**').as('apiRequest');
    cy.wait('@apiRequest') 
})
