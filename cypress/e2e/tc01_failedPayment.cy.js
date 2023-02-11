import CALENDAR from '../pageObjects/calendar'
import TOURS from '../pageObjects/tours'
import BOOKING from '../pageObjects/booking'

const tourTypes = require('../fixtures/tourTypes.json')
const cardDetails = require('../fixtures/cardDetails.json')


describe('FareHarbor - TC01 Verify Failed Payment', function () {
    const calendar = new CALENDAR()
    const tours = new TOURS()
    const booking = new BOOKING()
   
    beforeEach(() => {
        cy.visit('/embeds/book/bigappletours/items/?full-items=yes')   
    })

    it('Validate different Failed Payment card errors', () => {
        var tourAttendee = 1
        var bookingDate = calendar.getRandomDate(new Date(), new Date(2023, 12, 15))

        //Select Tour for Future Date
        tours.clickOnTour(tourTypes.walkingTour)

        calendar.selectDay(bookingDate)
        calendar.selectTime()

        //Enter Attendee and Other Details
        booking.addPeople(tourAttendee)
        booking.addContactDetails()
        booking.addPaymentDetails()

        //Verify Error for different Failure scenarios
        cardDetails.declinedPayment.forEach((data) => {
            booking.addCardNumber(data.cardNumber)
            booking.clickCompleteAndPay()
            booking.getErrorMessage().should('be.visible').each(($e) => {
                    expect($e.text().trim()).to.eq(data.errorMessage)
                })
        })

    })
})