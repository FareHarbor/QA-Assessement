import Calendar from '../pageObjects/calendar.js';
import Utils from '../pageObjects/utils.js';
import Bookings from '../pageObjects/booking.js';

describe('FareHarbor | Calculate Total Amount of Invoice', () => {

    const calendar = new Calendar();
    const utils = new Utils();
    const bookings = new Bookings();

    before(() => {
        cy.visit('/embeds/book/bigappletours/items/?full-items=yes');
    });

    it('calculates the total amount of the invoice', () => {
        cy.get('.grid-block-width-1-3').click();
        calendar.selectDay(20);
        calendar.selectTime();
        utils.addPeople(1, 2);
        utils.calculateInvoice(1, 2);
    });
});