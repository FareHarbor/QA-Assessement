import Calendar from '../pageObjects/calendar.js';
import Utils from '../pageObjects/utils.js';
import Bookings from '../pageObjects/booking.js';

describe('FareHarbor| Book a Tour in the future', () => {

    const calendar = new Calendar();
    const utils = new Utils();
    const bookings = new Bookings();

    beforeEach(() => {
        cy.visit('/embeds/book/bigappletours/items/?full-items=yes');
    });

    /**
     * I prefer not to perform the payment action
     * since it will do a real booking and if you run
     * again this test, the day is not going to be
     * available to book
     */ 
    it('books an tour in the next year', () => {
        cy.get('.grid-block-width-1-3').click();
        calendar.selectYear('2023');
        calendar.selectDay(20);
        calendar.selectTime();
        utils.addPeople(1, 2);
        bookings.fillContactInformation();
        bookings.fillPaymentCC();

        // cy.get('.btn-huge').click();
        // cy.get('.receipt-header').should('be.visible');
    });

    it('books an tour in the next month', () => {
        cy.get('.grid-block-width-1-3').click();
        calendar.selectMonth('October');
        calendar.selectDay(20);
        calendar.selectTime();
        utils.addPeople(1, 2);
        bookings.fillContactInformation();
        bookings.fillPaymentCC();
        
        // cy.get('.btn-huge').click();
        // cy.get('.receipt-header').should('be.visible');
    });
});