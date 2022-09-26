import Calendar from '../pageObjects/calendar.js';
import Tours from "../pageObjects/tours";
import Bookings from '../pageObjects/booking.js';

describe('Caculate Invoice amount', () => {

    const calendar = new Calendar();
    const tours = new Tours();
    const bookings = new Bookings();

    before(() => {
        cy.visit('/embeds/book/bigappletours/items/?full-items=yes');
    });

    it('calculates the total amount of the invoice', () => {
        tours.getWalkingTour().click();
        calendar.selectToday();
        calendar.selectTime();
        bookings.addPeople(5, 0);
        bookings.invoiceCalculation(5, 0);
    });
});