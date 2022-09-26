import Calendar from '../pageObjects/calendar.js';
import Bookings from '../pageObjects/booking.js';
import Tours from "../pageObjects/tours";

describe('Book a big apple tour', () => {

    const tours = new Tours()
    const calendar = new Calendar();
    const bookings = new Bookings();

    before(() => {
        cy.visit('/embeds/book/bigappletours/items/?full-items=yes');
    });

    it('books a apple Tour', () => {
        tours.getBigAppleTour().click();
        calendar.selectMonth(9);
        calendar.selectDay(12);
        calendar.selectTime();
        bookings.addPeopleForBigAppleTour('4');
        bookings.fillContactInformation();
        bookings.fillPaymentDetails();
        bookings.getCompletePayButton().click();
    });
});