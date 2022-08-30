module.exports = {
    // The locators are still britle because the frontend does not have organised strategy for element search
    // Best practices suggest having i.e. data-cy="someID" so that we can save it as '[data-cy="someID"]'
    // The above explained approach decouples the selector from HTML semantics, CSS, and frontend JS
    CALENDAR: {
        CURRENT_DATE: ".current-day",
        CURRENT_MONTH: ".month-current",
        OTHER_MONTH: ".month-other",
        SINGLE_DAY: ".calendar-small-day",
        SINGLE_DAY_CURRENT_MONTH: ".calendar-small-day.month-current",
        SINGLE_DAY_OTHER_MONTH: ".calendar-small-day.month-other",
        MONTH_DROPDOWN: ".cal-nav-select--month > select",
        YEAR_DROPDOWN: ".cal-nav-select--year > select",
        YEAR_HEADER: ".cal-nav-select--year",
        TIME_SLOTS: ".calendar-small-content"
    },
    TIMESLOTS_INTEGRATED: {

    },
    TIMESLOTS_SEPARATE: {

    }
}