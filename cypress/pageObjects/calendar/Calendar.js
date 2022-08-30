const { CALENDAR } = require('./elements');

class Calendar {
    selectADate(date) {
        var today = new Date()

        // If the date returns a date that has another year than current, first change the year before selecting month and date
        if (today.getFullYear() < date.getFullYear()) {
            cy.get(CALENDAR.YEAR_DROPDOWN).select(date.getFullYear().toString())        // Had to cast to String because the selec method could not find year
        }
        cy.get(CALENDAR.MONTH_DROPDOWN).select(date.getMonth())
        cy.get(CALENDAR.SINGLE_DAY_CURRENT_MONTH).contains(date.getDate()).click()
    }

    selectFirstFreeTimeSlot() {
        cy.get(CALENDAR.TIME_SLOTS).find('li').first().click()
    }

    // Returns a random date between start and end dates
    randomDate(start, end) {
        return new Date(Math.floor(Math.random() * (end.getTime() - start.getTime() + 1) + start.getTime()))
    }
}
export default Calendar