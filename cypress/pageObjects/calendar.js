const { CALENDAR } = require('../selectors/calendarSelectors');
class calendar {

    selectToday() {
        //return cy.get('.current-day').click();
    }
    selectNextDay() {
        //Current Day Plus 1
        cy.get('.current-day').then(($nextDay) => {
            const txt = parseInt($nextDay.text()) + 1;  //This might cause Issue when it is month end. e.g. 31st
            cy.get('.calendar-small-day').contains(txt).click();
        })

    }
    selectTime() {
        //pick first available time
        cy.get('.calendar-small-content').should('be.visible');
        cy.get('.calendar-small-content li').first().click(); //Issue: Wrong selector which gets all Links element.  Fix:: Updated selector to get Links under calendar
    }

    // Returns a random date between start and end dates
    getRandomDate(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }

    //Select Given Date, Month and Year
    selectDay(date) {
        var currentDate = new Date()
        if (currentDate.getFullYear() < date.getFullYear()) {
            cy.get(CALENDAR.YEAR_DROPDOWN).select(date.getFullYear().toString())
        }
        cy.get(CALENDAR.MONTH_DROPDOWN).select(date.getMonth())
        cy.get(CALENDAR.DAY_CURRENT_MONTH).contains(date.getDate()).click()
    }

}
export default calendar