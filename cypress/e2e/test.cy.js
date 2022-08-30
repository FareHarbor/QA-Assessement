
  import Calendar from '../pageObjects/calendar.js'
  import Utils from '../pageObjects/utils.js'
  import Bookings from '../pageObjects/booking.js'

  describe('FareHarbor - Book Online | Adults', function () {
    const calendar = new Calendar()
    const utils = new Utils()
    const bookings = new Bookings()
    before(function () {
      cy.visit('/embeds/book/bigappletours/items/?full-items=yes') //Changed configuration, thus changing the cy.visit() parameter
    })
  
    context('When page is initially opened', function () {
      it('company information is present', function () {
        cy.request('https://demo.fareharbor.com/api/v1/companies/bigappletours/').then((response) => { // I assume the intention was to intercept a request and not make a new one which is the case here
          expect(response.body.company.name).to.eq("Big Apple Tours and Activities")    // FIX: There was a typo in our test, the endpoint returns "Big Apple Tours and Activities", while we checked for "Big Apple Tours and Activitys"
          expect(response.status).to.eq(200)    // FIX: 403 is error code Forbidden which means that server understands request, but is missing necessary authorisation. 200 is OK and expected in this case
        })
      })
      it('activity overlay should be present', function () {
        cy.get('#ng-app').should('be.visible');   // FIX: Chaining is performed with .<action>(), here it said .should.() -> Removed extra dot
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
      it('I add 1 adult', function () {
        utils.addPeople(1);    // FIX: The maximum number of people that can be booked for the Walking tour changes from slot to slot. The goal of test is to test happy path and not edge cases, therefore 1 for number of adults
      })
    })
    context('I fill in my contact information', function () {
      it('I add my name, phone number and email', function () {
        bookings.fillContactInformation();
      })
      it('I enter my credit card details', function () {
        bookings.fillPaymentCC();
      })
    })
    context('I pay and get confirmation', function () {
      it('I complete and pay', function () {    // FIX: Typo fixed, was written "play" instead of "pay"
        cy.get('.btn-huge').click();    // FIX: Locator for an element which we search by class value needs syntax cy.get('.<className>')
      })
      it('I get my receipt', function () {
        cy.get('.receipt-header', { timeout: 30000 }).should('be.visible');   // FIX: Locator tries to find the element while the payment is still being processed. Adding custom timeout of 30 seconds
      })
    })
  })