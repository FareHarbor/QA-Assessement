class calendar {

    selectToday() {
        //return cy.get('.current-day').click();
    }
    selectNextDay() {
        //Current Day Plus 1
        cy.get('.current-day').then(($nextDay) => {
            const txt = parseInt($nextDay.text())+1;
            cy.get('.calendar-small-day').contains(txt).click();
        })

    }
    selectTime() {
        //pick first available time
        cy.get('.calendar-small-content').should('be.visible');
        cy.get('.calendar-small-content li').first().click(); //Issue: Wrong selector which gets all Links element.  Fix:: Updated selector to get Links under calendar
    }
 }

 export default calendar