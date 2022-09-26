import Calendar from '../pageObjects/calendar.js'
import Bookings from '../pageObjects/booking.js'

describe('FareHarbor - Book Online | Adults', function () {
    const calendar = new Calendar();
    const bookings = new Bookings();

    before(function () {
        //Added baseUrl in the configuration
        cy.visit('/embeds/book/bigappletours/items/?full-items=yes');
    })

    context('When page is initially opened', function () {
        it('company information is present', function () {
            cy.request('https://demo.fareharbor.com/api/v1/companies/bigappletours/').then((response) => {
                // Text is not matched with actual one
                expect(response.body.company.name).to.eq("Big Apple Tours and Activities");
                //status code as 200 not 403
                expect(response.status).to.eq(200);
            })
        })
        it('activity overlay should be present', function () {
            //Syntax issue - need to remove this dot token
            cy.get('#ng-app').should('be.visible');
        })
    }),
        context('I pick an activity', function () {
            it('Im able to click the activity', function () {
                cy.get('.grid-block-width-1-3').click();
            })
            it('Im able to see the calendar', function () {
                cy.get('.test-calendar-indicator').should('be.visible');
            })
        }),
        context('I select a day/time for my activity', function () {
            it('I pick a day', function () {
                calendar.selectNextDay();
            })
            it('I pick a time', function () {
                calendar.selectTime();
            })
        })
    context('I select the amount of people', function () {
        it('I add 18 above adults', function () {
            // 0 to 24 value available selection not 25 so can't be selected
            bookings.addPeople(1, 0);
        })
    })
    context('I fill in my contact information', function () {
        it('I add my name, phone number and email', function () {
            bookings.fillContactInformation();
        })
        it('I enter my credit card details', function () {
            bookings.fillPaymentDetails();
        })
    })
    context('I pay and get confirmation', function () {
        it('I complete and play', function () {
            //dot missing for specify class name
            cy.get('.btn-huge').click();
        })
        it('I get my receipt', function () {
            //Added timeout for displaying the element
            cy.get('.receipt-header', {timeout: 11000}).should('be.visible');
        })
    })
})