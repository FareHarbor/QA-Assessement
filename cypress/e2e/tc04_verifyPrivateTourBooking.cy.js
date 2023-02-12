import CALENDAR from '../pageObjects/calendar'
import TOURS from '../pageObjects/tours'
import BOOKING from '../pageObjects/booking'
import INVOICE from '../pageObjects/invoice'

const tourTypes = require('../fixtures/tourTypes.json')

describe('FareHarbor - TC04 Verify Invoice Total', function () {
    const calendar = new CALENDAR()
    const tours = new TOURS()
    const booking = new BOOKING()
    const invoice = new INVOICE()

    beforeEach(() => {
        cy.visit('/embeds/book/bigappletours/items/?full-items=yes')
    })

    it('Validate Big Apple Private Tour Booking', () => {
        var tourAttendee = 4
        var bookingDate = calendar.getRandomDate(new Date(), new Date(2023, 10, 31))

        //Select Tour for Random Future Date
        tours.clickOnTour(tourTypes.bigApplesPrivateTour)

        calendar.selectDay(bookingDate)
        calendar.selectTime()

        //Enter Attendee and Other Details
        booking.addPeopleForBigApple(tourAttendee)
        booking.selectCateringOption("Vegan")
        booking.addContactDetails()
        booking.addPaymentDetails()
        booking.clickCompleteAndPay()

        //Verify Success message, Payment Header and Invoice Table Row for each Participant
        invoice.getPaymentSuccess().should('be.visible')
        invoice.getPaymentHeaderPrice().should('be.visible')
        invoice.getInvoiceTableRow().should('have.length', tourAttendee)

        //Verify Subtotal,Tax, Total and Paid Amount
        var subTotal = 0.00
        var taxesNFee = 0.00
        var total = 0.00
        invoice.getInvoiceRowAmounts().should('be.visible').each(($e, ind) => {
            if (ind < tourAttendee) 
                subTotal = subTotal + parseFloat($e.text().replace(/[$,]/g, ""))
            else if (ind == tourAttendee) 
                taxesNFee = subTotal * 0.16
            else 
                total = taxesNFee + subTotal
        }).then(() => {
            invoice.getSubtotalAmount().then(($value) => { expect($value.text().replace(/[$,]/g, "")).to.eq(subTotal.toFixed(2)) })
            invoice.getTaxNFeeAmount().then(($value) => { expect($value.text().replace(/[$,]/g, "")).to.eq(taxesNFee.toFixed(2)) })
            invoice.getTotalAmount().then(($value) => { expect($value.text().replace(/[$,]/g, "")).to.eq(total.toFixed(2)) })
            invoice.getPaidAmount().then(($value) => { expect($value.text().replace(/[$,]/g, "")).to.eq(total.toFixed(2)) })
        })
    })
})