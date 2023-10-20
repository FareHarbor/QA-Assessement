
import Calendar from '../pageObjects/calendar.js'
import Utils from '../pageObjects/utils.js'
import Bookings from '../pageObjects/booking.js'

describe('FareHarbor - Invoice Total Amount Validation', function () {
  const calendar = new Calendar()
  const utils = new Utils()
  const bookings = new Bookings()
  before(function () {
    cy.visit('/embeds/book/bigappletours/items/?full-items=yes')
    cy.fixture('example').then(function(data) {
        this.data = data
    })
  })

  /*  Suggestion: 
    Instead of hardcording the locators in *it block* of cy.get() command, the approach is to call pageObjectClassname.methodName() for all cases
    for eg: In tourActivities.js class of pageObjects folder, we create getWalkingTours() method and return this : cy.get('.grid-block-width-1-3')
    pageObjects >>>folder
      tourActivities.js >> class
        getWalkingTours(){  >>>>> method
          return cy.get('.grid-block-width-1-3')
        }

    In test class:  
    import TourActivities from "../pageObjects/tourActivities.js" >>>> before the describe block
    const tourActivities = new TourActivities() >>> in the describe block 
    tourActivities.getWalkingTours().click() >>> in the it block ;  [this approach would be better than cy.get('.grid-block-width-1-3').click();]
  */

  //Perform the necessary operations to book a tour and validate the total amount incurred
  it('Validating total amount for services purchased',function(){
    const numberOfPeople = this.data.peopleForTotalAmountValidation
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
    utils.validateTotalAmountMoneyCalculation()   
  })
})