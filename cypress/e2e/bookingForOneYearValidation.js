
import Calendar from '../pageObjects/calendar.js'

describe('FareHarbor - Scenario to book activity 1 year from now', function () {
  const calendar = new Calendar()
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

  context('I select a day & time for my activity', function () {
    it('I pick next year', function () {
      const nextYearValue = this.data.nextYear
      calendar.selectNextYear(nextYearValue);
    })

    it('Calender unavailable', function () {
      calendar.emptyState();
    })
  })
})