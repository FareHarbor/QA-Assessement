class calendar {

    selectToday() {
        //return cy.get('.current-day').click();
    }
    selectNextDay() {
        //Current Day Plus 1
        cy.get('.current-day').then(($nextDay) => {
            const txt = parseInt($nextDay.text())+1;        // ISSUE: Test is flaky because there is a limited amount of free time slots the next day and also if tests are runned on 31st the increment will return 32
            cy.get('.calendar-small-day').contains(txt).click();
        })

    }
    selectTime() {
        //pick first available time
        cy.get('.calendar-small-content').should('be.visible');
        cy.get('.calendar-small-content').find('li').first().click();       // FIX: cy.get('.calendar-small-content').find('li') returns list of free time slots where we click on the first one
    }
 }

 export default calendar