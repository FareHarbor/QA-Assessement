import Calendar from '../pageObjects/calendar.js';
import Utils from '../pageObjects/utils.js';
import Bookings from '../pageObjects/booking.js';

describe('', () => {

    const calendar = new Calendar();
    const utils = new Utils();
    const bookings = new Bookings();

    before(() => {
        cy.visit('/embeds/book/bigappletours/items/?full-items=yes');
    });
    
    /**
     * I prefer not to perform the payment action
     * since it will do a real booking and if you run
     * again this test, the day is not going to be
     * available to book
     */ 
    it('books a Big Apple\'s Private Tour', () => {
        cy.get('span[class *= "test-block-big-apples"]').click();
        calendar.selectDay(20);
        calendar.selectTime();
        utils.bigAppleTourSelection('4');
        bookings.fillContactInformation();
        bookings.fillPaymentCC();

        // cy.get('.btn-huge').click();
        // cy.get('.receipt-header').should('be.visible');
    });
});