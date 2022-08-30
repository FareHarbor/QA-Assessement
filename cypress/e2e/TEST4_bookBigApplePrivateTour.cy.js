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
*/
    beforeEach(function () {
        cy.visit('/embeds/book/bigappletours/items/?full-items=yes')

    })
/*
    Steps:
    2. Select Big Apple's Private Tour
    3. Select a random date until 31st Dec 2023
    4. Select the first available time slot on selected date
    5. Select group that corresponds to the number of participants
    6. Populate contact information
    7. Populate payment info
    8. Tap on "Complete and Pay" button
    9. Validate the purchase is successfull
    10. Validate the invoice prices correspond to the amount of participants
*/
    it('Book Big Apple\'s Private tour with 4 people', () => {

        const numberOfPeople = 4
        var randomDate = calendar.randomDate(new Date(), new Date(2023, 11, 31))

        toursPreview.selectTheTour(tours.bigApplesPrivateTour)

        calendar.selectADate(randomDate)
        calendar.selectFirstFreeTimeSlot()

        bookingAndPayment.selectNumberOfParticipantsBigApplePrivateTour(numberOfPeople)
        bookingAndPayment.populateContactInformation()
        bookingAndPayment.populatePaymentInfo()
        bookingAndPayment.clickCompleteAndPayButton()

        invoice.getTicketRow().should('be.visible')
/*
        The invoice.getInvoiceAmountsVisible() returns all invoice table rows which we validate with following structure in mind:
        - ticket
        .
        .  
        .
        - ticket
        - total price for tickets
        - taxes and fees
        - total amount paid
*/
        var totalPrice = .0
        var taxesAndFee = .0
        var regex = /[$,]/gm
        invoice.getInvoiceAmountsVisible().each(($element, index) => {
            if (index < numberOfPeople) {
                totalPrice = totalPrice + parseFloat($element.text().replace(regex, ""))
            }
            else if (index == numberOfPeople) {
                expect(parseFloat($element.text().replace(regex, "")).toFixed(2)).to.eq(totalPrice.toFixed(2))
            }
            else if(index == numberOfPeople + 1) {
                taxesAndFee = totalPrice*0.16
                expect(parseFloat($element.text().replace(regex, "")).toFixed(2)).to.eq(taxesAndFee.toFixed(2))
            }
            else {
                expect(parseFloat($element.text().replace(regex, "")).toFixed(2)).to.eq((totalPrice + taxesAndFee).toFixed(2))
            }
        })
    })
})