module.exports = {
    // The locators are still britle because the frontend does not have organised strategy for element search
    // Best practices suggest having i.e. data-cy="someID" so that we can save it as '[data-cy="someID"]'
    // The above explained approach decouples the selector from HTML semantics, CSS, and frontend JS
    INVOICE: {
        RECEIPT_OVERVIEW_PRICE: ".text-huge",
        RECEIPT_OVERVIEW: ".receipt-overview",
        RECEIPT_BREAKDOWN: ".booking-receipt-customers",
        RECEIPT_HEADER: ".receipt-header",
        INVOICE_TABLE: ".invoice-table",
        INVOICE_TABLE_AMOUNTS: ".invoice-table .itable-amount",
        INVOICE_AMOUNTS_VISIBLE: ".amount-visible"
    },
    TICKET: {
        TICKET_ROW: ".receipt-ticket-row",
        BOOKING_DATE_TIME: ".receipt-ticket-row .receipt-ava"
    }
}