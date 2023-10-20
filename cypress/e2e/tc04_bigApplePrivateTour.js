
import Calendar from '../pageObjects/calendar.js'
import Utils from '../pageObjects/utils.js'
import Bookings from '../pageObjects/booking.js'

describe('FareHarbor - Big Apple\'s Private Tour for 4 people and filling up the details', function () {
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
    for eg: In tourActivities.js class of pageObjects folder, we create getBigApplePrivateTours() method and return this : cy.get('.item-grid li:nth-child(3)')
    pageObjects >>>folder
      tourActivities.js >> class
        getBigApplePrivateTours(){  >>>>> method
          return cy.get('.item-grid li:nth-child(3)')
        }

    In test class:  
    import TourActivities from "../pageObjects/tourActivities.js" >>>> before the describe block
    const tourActivities = new TourActivities() >>> in the describe block 
    tourActivities.getBigApplePrivateTours().click() >>> in the it block ;  [this approach would be better than cy.get('.item-grid li:nth-child(3)').click();]
*/

  //Perform the necessary operations to book Big Apples Private tour with details filled for 4 people
  it('Verify if Big Apple\'s Private tour is booked for 4 people with details',function(){
    const numberOfPeople = this.data.bookingPeopleForBigApplesPrivateTour
    const card = this.data.successCard
    const waitTime = this.data.customWaitTime
    cy.get('.item-grid li:nth-child(3)').click();
    calendar.selectNextMonth();
    calendar.selectTime();
    utils.addFourToSixPeople(numberOfPeople);
    utils.fillCateringOptions()
    utils.fillAdditionalInformation()
    bookings.fillContactInformation();
    bookings.fillPaymentCC(card);
    cy.get('.btn-huge').click();
    cy.wait(waitTime)
    cy.get('.receipt-header').should('be.visible');
  })
})