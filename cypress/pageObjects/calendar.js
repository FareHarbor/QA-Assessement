class calendar {

    selectToday() {
        // cy.get('.current-day').click();
    }
    selectNextDay() {
        //Current Day Plus 1
        cy.get('.current-day').then(($nextDay) => {
            const txt = parseInt($nextDay.text())+1;
            cy.get('.calendar-small-day').contains(txt).click();
        })

    }

    selectNextMonth() {
        //Select a month from current day
        cy.get('.current-day').then(($nextMonth) => {
            const txt = parseInt($nextMonth.text())
            cy.get('a.-next svg').click()
            cy.get('.calendar-small-day').contains(txt).click();
        })

    }

    selectNextYear(nextYearValue) {
        //Select next year
        cy.get('select[ng-model="calendarCtrl.yearDropdown"]').select(nextYearValue)
    }

    selectTime() {
        //pick first available time
        cy.get('div.calendar-small-content').should('be.visible'); //fixed the locator
        cy.get('li').find('span.cal-block-content-wrap').first().click(); //fixed the locator
    }

    emptyState() {
        cy.get('.calendar-empty-message').should('be.visible')
    }
 }

 export default calendar