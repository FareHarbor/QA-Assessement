const { INVOICE, TICKET } = require('./elements');

class Invoice {
    getReceiptHeader() {
        return cy.get(INVOICE.RECEIPT_HEADER)
    }

    getInvoiceAmountsVisible() {
        return cy.get(INVOICE.INVOICE_AMOUNTS_VISIBLE)
    }

    getTicketRow() {
        return cy.get(TICKET.TICKET_ROW)
    }

    getBookingDateAndTime() {
        return cy.get(TICKET.BOOKING_DATE_TIME)
    }
}
export default Invoice