import CALENDAR from '../pageObjects/calendar'
import TOURS from '../pageObjects/tours'
import BOOKING from '../pageObjects/booking'
import INVOICE from '../pageObjects/invoice'

const tourTypes = require('../fixtures/tourTypes.json')


describe('FareHarbor - TC03 Verify Future Booking', function () {
    const calendar = new CALENDAR()
    const tours = new TOURS()
    const booking = new BOOKING()
    const invoice = new INVOICE()

    var tourAttendeeAdult = 1
    var bookingDate = new Date()

    beforeEach(() => {
        cy.visit('/embeds/book/bigappletours/items/?full-items=yes')
    })


    it('Validate Booking One Month From Now', () => {
        //Select Tour for Future Month
        tours.clickOnTour(tourTypes.walkingTour)
        bookingDate.setMonth(bookingDate.getMonth() + 1)
        calendar.selectDay(bookingDate)
        calendar.selectTime()

        //Enter Attendee and Other Details
        booking.addPeople(tourAttendeeAdult)
        booking.addContactDetails()
        booking.addPaymentDetails()
        booking.clickCompleteAndPay()

        //Verify Header and Booking Date 
        invoice.getPaymentSuccess().should('be.visible')
        invoice.getBookingDateTime().should('be.visible').then(($e) => {
            var dateTimeValue = $e.text()
            expect(dateTimeValue).to.contains(bookingDate.getDate())
            expect(dateTimeValue).to.contains(bookingDate.toLocaleString('en-US', { month: 'long' }))
            expect(dateTimeValue).to.contains(bookingDate.getFullYear())
        })
    })


    it('Validate Booking One Year From Now', () => {
        //Select Tour for Future Year
        tours.clickOnTour(tourTypes.walkingTour)
        bookingDate.setFullYear(bookingDate.getFullYear() + 1)
        calendar.selectYear(bookingDate)

        //Verify No Availability Message
        calendar.getEmptyCalendar().should('be.visible').then(($e) => {
            expect($e.text()).to.contains("Sorry, there is no online availability")
        })

    })
})