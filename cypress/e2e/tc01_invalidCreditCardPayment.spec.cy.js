import Calendar from '../pageObjects/calendar.js';
import Utils from '../pageObjects/utils.js';
import Bookings from '../pageObjects/booking.js';

describe('FareHarbor| Invalid Credit Card Payment', () => {

    const calendar = new Calendar();
    const utils = new Utils();
    const bookings = new Bookings();

    before(() => {
        cy.visit('/embeds/book/bigappletours/items/?full-items=yes');
    });

    it('attempts to book a tour with an invalid credit card number', () => {
        /**
         * performing basic operations to book a tour
         */
        cy.get('.grid-block-width-1-3').click();
        calendar.selectDay(20);
        calendar.selectTime();
        utils.addPeople(25);
        bookings.fillContactInformation();

        cy.fixture('invalidCreditCards')
            .then((invalidCC) => {
                invalidCC.forEach((item) => {
                    // passing the invalid credit card numbers to the method
                    bookings.fillPaymentCC(item.number);

                    cy.get('.btn-huge').click();
                    cy.get('div[class="form-errors"] ul li[ng-repeat*="error"]', { timeout: 10000 })
                        .contains(item.message)
                });
            });
    });
});