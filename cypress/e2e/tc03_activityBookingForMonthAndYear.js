
import Calendar from '../pageObjects/calendar.js'
import Utils from '../pageObjects/utils.js'
import Bookings from '../pageObjects/booking.js'

describe('FareHarbor - scenario to book activity 1 month from now and 1 year from now', function () {
  const calendar = new Calendar()
  const utils = new Utils()
  const bookings = new Bookings()
  beforeEach(function () {
    cy.visit('/embeds/book/bigappletours/items/?full-items=yes')
    cy.fixture('example').then(function(data) {
        this.data = data
    })
  })

  /*  Suggestion: 
    Instead of hardcording the locators in *it block* of cy.get() command, the approach is to call pageObjectClassname.methodName() for all cases
    for eg: In tourActivities.js class of pageObjects folder, we create getBigApplePrivateTours() method and return this : cy.get('.item-grid li:nth-child(3)')
    pageObjects >>>folder
      tourActivities.js >> class
        getBigApplePrivateTours(){  >>>>> method
          return cy.get('.item-grid li:nth-child(3)')
        }

    In test class:  
    import TourActivities from "../pageObjects/tourActivitie.js" >>>> before the describe block
    const tourActivities = new TourActivities() >>> in the describe block 
    tourActivities.getBigApplePrivateTours().click() >>> in the it block ;  [this approach would be better than cy.get('.item-grid li:nth-child(3)').click();]
*/

  //Perform the necessary operations to book a tour in the next month from the current date
  it('booking tour in next month from present date',function(){
    const numberOfPeople = this.data.lessNumberOfPeople
    const card = this.data.successCard
    const waitTime = this.data.customWaitTime
    cy.get('.grid-block-width-1-3').click();
    calendar.selectNextMonth();
    calendar.selectTime();
    utils.addPeople(numberOfPeople);
    bookings.fillContactInformation();
    bookings.fillPaymentCC(card);
    cy.get('.btn-huge').click();
    cy.wait(waitTime)
    cy.get('.receipt-header').should('be.visible');
  })

  //Verify if user is stopped from booking tour in the next year
  it('booking tour in next year from present date',function(){
    const nextYearValue = this.data.nextYear
    cy.get('.grid-block-width-1-3').click();
    calendar.selectNextYear(nextYearValue); 
    calendar.emptyState();
  }) 
})