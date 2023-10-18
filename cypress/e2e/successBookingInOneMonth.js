
import Calendar from '../pageObjects/calendar.js'
import Utils from '../pageObjects/utils.js'
import Bookings from '../pageObjects/booking.js'

describe('FareHarbor - scenario to book activity 1 month from now', function () {
  const calendar = new Calendar()
  const utils = new Utils()
  const bookings = new Bookings()
  before(function () {
    cy.visit('https://demo.fareharbor.com/embeds/book/bigappletours/items/?full-items=yes')
    cy.fixture('example').then(function(data) {
        this.data = data
    })
  })

  context('I pick an activity', function () {
    it('Im able to click the activity', function () {
      cy.get('.grid-block-width-1-3').click();
    })
  })

  context('I select a day/time for my activity', function () {
    it('I pick next month', function () {
      calendar.selectNextMonth();
    })

    it('I pick a time', function () {
      calendar.selectTime();
    })
  })

  context('I select the amount of people', function () {
    it('I add 2 adults', function () {
      const numberOfPeople = this.data.lessNumberOfPeople
      utils.addPeople(numberOfPeople);
    })
  })

  context('I fill in my contact information', function () {
    it('I add my name, phone number and email', function () {
      bookings.fillContactInformation();
    })

    it('I enter my credit card details', function () {
      const card = this.data.successCard
      bookings.fillPaymentCC(card);
    })
  })

  context('I pay and get confirmation', function () {
    it('I complete and pay', function () {
      cy.get('.btn-huge').click();
    })

    it('I get my receipt', function () {
      const waitTime = this.data.customWaitTime
      cy.wait(waitTime)
      cy.get('.receipt-header').should('be.visible');
    })
  })
})