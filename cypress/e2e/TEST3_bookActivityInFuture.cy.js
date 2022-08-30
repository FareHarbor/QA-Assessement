import ToursPreview from '../pageObjects/toursPreview/ToursPreview.js'
import Calendar from '../pageObjects/calendar/Calendar.js'
import BookingAndPayment from '../pageObjects/bookingAndPayment/BookingAndPayment.js'
import Invoice from '../pageObjects/invoice/Invoice.js'

const tours = require('../fixtures/tours.json')

describe('FareHarbor - Validate activities can be book in future', function () {
    const toursPreview = new ToursPreview()
    const calendar = new Calendar()
    const bookingAndPayment = new BookingAndPayment()
    const invoice = new Invoice()
/*
    Shared steps:
    1. Open the application under test
    2. Select the tour
*/
    beforeEach(function () {
        cy.visit('/embeds/book/bigappletours/items/?full-items=yes')
        toursPreview.selectTheTour(tours.walkingTour)
    })
/*
    Steps:
    3. Select a random date 
    4. Select the first available time slot
    5. Select number of participants
    6. Populate contact information
    7. Populate payment info
    8. Tap on "Complete and Pay" button
    9. Validate the purchase is successfull
    10. Validate the activity is booked in a month from now
*/
    it('Activity can be booked in a month from now', () => {

        var randomNumOfParticipants = Cypress._.random(1,2)
        var futureDate = new Date()

        futureDate.setMonth(futureDate.getMonth() + 1)

        calendar.selectADate(futureDate)
        calendar.selectFirstFreeTimeSlot()
        bookingAndPayment.selectNumberOfAdults(randomNumOfParticipants)
        bookingAndPayment.populateContactInformation()
        bookingAndPayment.populatePaymentInfo()
        bookingAndPayment.clickCompleteAndPayButton()

        invoice.getTicketRow().should('be.visible')

        // Expected format: <day>, <month> <xth> <year> @ <dateFrom> - <dateTo>
        invoice.getBookingDateAndTime().then(($element) => {
            var bookingDateTime = $element.text()

            expect(bookingDateTime).to.contains(futureDate.toLocaleString('en-US', {weekday: 'long'}))
            expect(bookingDateTime).to.contains(futureDate.toLocaleString('en-US', {month: 'long'}))
            expect(bookingDateTime).to.contains(futureDate.getDate())
            expect(bookingDateTime).to.contains(futureDate.getFullYear())
        })
    })
/*
    Steps:
    3. Select a random date 
    4. Select the first available time slot
    5. Select number of participants
    6. Populate contact information
    7. Populate payment info
    8. Tap on "Complete and Pay" button
    9. Validate the purchase is successfull
    10. Validate the activity is booked in a year from now
*/
    it('Activity can be booked in a year from now', () => {

        var randomNumOfParticipants = Cypress._.random(0,1)
        var futureDate = new Date()

        futureDate.setFullYear(futureDate.getFullYear() + 1)

        calendar.selectADate(futureDate)
        calendar.selectFirstFreeTimeSlot()
        bookingAndPayment.selectNumberOfAdults(randomNumOfParticipants)
        bookingAndPayment.populateContactInformation()
        bookingAndPayment.populatePaymentInfo()
        bookingAndPayment.clickCompleteAndPayButton()

        invoice.getTicketRow().should('be.visible')

        // Expected format: <day>, <month> <xth> <year> @ <dateFrom> - <dateTo>
        invoice.getBookingDateAndTime().then(($element) => {
            var bookingDateTime = $element.text()

            expect(bookingDateTime).to.contains(futureDate.toLocaleString('en-US', {weekday: 'long'}))
            expect(bookingDateTime).to.contains(futureDate.toLocaleString('en-US', {month: 'long'}))
            expect(bookingDateTime).to.contains(futureDate.getDate())
            expect(bookingDateTime).to.contains(futureDate.getFullYear())
        })
    })
})