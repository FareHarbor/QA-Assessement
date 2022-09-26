class calendar {

    getCalenderBoard() {
        return cy.get('.calendar-small-content');
    }

    getDay() {
        return cy.get('.calendar-small-day');
    }

    getToday() {
        return cy.get('.current-day');
    }

    getMonth() {
        return cy.get('select[ng-model = "calendarCtrl.monthDropdown"]');
    }

    getYear(){
        return cy.get('select[ng-model="calendarCtrl.yearDropdown"]');
    }

    getTime() {
        return cy.get('ul[ng-autofocus] li');
    }

    selectToday() {
        this.getToday().click();
    }

    selectNextDay() {
        //Current Day Plus 1
        this.getToday().then(($nextDay) => {
            const txt = parseInt($nextDay.text())+1;
            this.getDay().contains(txt).click();
        })
    }

    selectTime() {
        //pick first available time
        this.getCalenderBoard().should('be.visible');
        this.getTime().first().click();
    }

    selectDay(day) {
        this.getDay().contains(day).click();
    }

    selectMonth(month) {
        this.getMonth().select(month);
    }

    selectYear(year) {
        this.getYear().select(year);
    }
}

export default calendar