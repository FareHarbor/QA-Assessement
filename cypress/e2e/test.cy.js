
  import Calendar from '../pageObjects/calendar.js'
  import Utils from '../pageObjects/utils.js'
  import Bookings from '../pageObjects/booking.js'

  /**
   * Add of missing semicolons to code.
   * Add of spaces to make more readavble the code.
   */

  describe('FareHarbor - Book Online | Adults', function () {
    const calendar = new Calendar();
    const utils = new Utils();
    const bookings = new Bookings();

    before(function () {
      cy.visit('https://demo.fareharbor.com/embeds/book/bigappletours/items/?full-items=yes');
    });
  
    context('When page is initially opened', function () {
      it('company information is present', function () {
        cy.request('https://demo.fareharbor.com/api/v1/companies/bigappletours/').then((response) => {
          expect(response.body.company.name).to.eq("Big Apple Tours and Activities");
          expect(response.status).to.eq(200);   // update of status to 200. 403 is for forbidden
        });
      });

      it('activity overlay should be present', function () {
        cy.get('#ng-app').should('be.visible');   // remove of extra dot
      });
    });

    context('I pick an activity', function () {
      it('Im able to click the activity', function () {
        cy.get('.grid-block-width-1-3').click();
      });

      it('Im able to see the calendar', function () {
        cy.get('.test-calendar-indicator').should('be.visible');
      });
    });  

    context('I select a day/time for my activity', function () {
      it('I pick a day', function () {
        calendar.selectNextDay();
      });

      it('I pick a time', function () {
        calendar.selectTime();
      });
    });

    context('I select the amount of people', function () {
      it('I add 26 adults', function () {
        utils.addPeople(25);    // The maximum of people to add is 25
      });
    });

    context('I fill in my contact information', function () {
      it('I add my name, phone number and email', function () {
        bookings.fillContactInformation();
      });

      it('I enter my credit card details', function () {
        bookings.fillPaymentCC();
      });
    });

    context('I pay and get confirmation', function () {
      it('I complete and pay', function () {
        cy.get('.btn-huge').click();    // Add of missing dot to class
      });

      it('I get my receipt', function () {
        cy.wait(10000);     // Add of wait to wait for the element until is rendered when the transaction was performed successfully
        cy.get('.receipt-header').should('be.visible');
      });
    });

  });