import Calendar from '../pageObjects/calendar.js';
import Bookings from '../pageObjects/booking.js';
import Tours from "../pageObjects/tours";

describe('Book a Tour in the next month and next year', () => {

    const calendar = new Calendar();
    const bookings = new Bookings();
    const tours = new Tours();

    beforeEach(() => {
        cy.visit('/embeds/book/bigappletours/items/?full-items=yes');
    });

    it('book a tour in the next month', () => {
        tours.getWalkingTour().click();
        calendar.selectMonth(9);
        calendar.selectDay(2);
        calendar.selectTime();
        bookings.addPeople(3, 1);
        bookings.fillContactInformation();
        bookings.fillPaymentDetails();
        bookings.getCompletePayButton().click();
    });

    it('books an tour in the next year', () => {
        cy.get('.grid-block-width-1-3').click();
        calendar.selectYear('2023');
        calendar.selectDay(9);
        calendar.selectTime();
        bookings.addPeople(2, 1);
        bookings.fillContactInformation();
        bookings.fillPaymentDetails();
        bookings.getCompletePayButton().click();
    });
});