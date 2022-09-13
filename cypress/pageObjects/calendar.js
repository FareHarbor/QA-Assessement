  /**
   * Add of missing semicolons to code.
   */

class calendar {

    selectToday() {
        // cy.get('.current-day').click();
    }

    /**
     * This method is not going to work properly when the day is 31/30, or 28/29 when it's February. 
     * On the other hand, it doesn't work for the nextday. If I'm on the day 7th, it doesn't 
     * select the day 8th. I needed to add 3 or more to the calculation to perform the 
     * click of the element.
     */
    selectNextDay() {
        //Current Day Plus 1
        cy.get('.current-day').then(($nextDay) => {
            const txt = parseInt($nextDay.text()) + 5;
            
            cy.get('.calendar-small-day').contains(txt).click();
        });
    }

    selectTime() {
        //pick first available time
        cy.get('.calendar-small-content').should('be.visible');
        cy.get('ul[ng-autofocus] li[class="ng-scope"]').first().click();        // Update of locator
    }

    /**
     * My code begins here
     */
    selectDay(day) {
        cy.get('.calendar-small-day').contains(day).click();
    }

    selectMonth(month) {
        cy.get('select[ng-model = "calendarCtrl.monthDropdown"]').select(month);
    }

    selectYear(year) {
        cy.get('select[ng-model="calendarCtrl.yearDropdown"]').select(year);
    }
 }

 export default calendar;