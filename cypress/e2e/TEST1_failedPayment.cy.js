import ToursPreview from '../pageObjects/toursPreview/ToursPreview.js'
import Calendar from '../pageObjects/calendar/Calendar.js'
import BookingAndPayment from '../pageObjects/bookingAndPayment/BookingAndPayment.js'

const tours = require('../fixtures/tours.json')
const invCards = require('../fixtures/invalidCards.json')

describe('FareHarbor - Failed payments', function () {

    const toursPreview = new ToursPreview()
    const calendar = new Calendar()
    const bookingAndPayment = new BookingAndPayment()
/*
    Shared steps:
    1. Open the application under test
*/
    beforeEach(function () {
        cy.task('log','STEP 1 - Open the application under test')
        cy.visit('/embeds/book/bigappletours/items/?full-items=yes') // Visits the default url from configuration. Since that iss the starting point for all our test cases, cy.visit() is enough
    })
/*
    Steps:
    2. Select a tour
    3. Select a random date 
    4. Select the first available time slot
    5. Select number of participants to the activity
    6. Populate contact details
    7. Populate payment info except card number
*/
    it('Validate invalid cards errors', () => {
        var randomDate = calendar.randomDate(new Date(), new Date(2023, 11, 31))
        var randomNumOfParticipants = Cypress._.random(1,2)

        cy.task('log','STEP 2 - Select a tour')
        toursPreview.selectTheTour(tours.walkingTour)

        cy.task('log','STEP 3 - Select a random date')
        calendar.selectADate(randomDate)

        cy.task('log','STEP 4 - Select the first available time slot')
        calendar.selectFirstFreeTimeSlot()

        cy.task('log','STEP 5 - Select number of participants to the activity')
        bookingAndPayment.selectNumberOfAdults(randomNumOfParticipants) // In order to simplify the test, choosing only one type of participants
        
        cy.task('log','STEP 6 - Populate contact details')
        bookingAndPayment.populateContactInformation()

        cy.task('log','STEP 7 - Populate payment info except card number')
        bookingAndPayment.populatePaymentInfo()

        invCards.invalidCards.forEach((card, index) => {
            cy.task('log', 'STEP ' + (3*index+8).toString() +' - Populate card number with card yielding error' + card.errorCode)
            bookingAndPayment.populateCardNumber(card.cardNo)

            cy.task('log', 'STEP ' + (3*index+9).toString() +' - Click Complete and Pay button')
            bookingAndPayment.clickCompleteAndPayButton()

            cy.task('log', 'STEP ' + (3*index+10).toString() +' - Validate error code exists and is as expected')
            //bookingAndPayment.getCardNumberField().should('be.visible')
            bookingAndPayment
                .getCardNumberField()
                .should('be.visible')
                .each( ($element) => {
                    expect($element.text()).to.eq(card.expectedErrorMsg)
            })
        })
    })

})