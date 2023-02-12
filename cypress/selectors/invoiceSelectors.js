module.exports = {
    INVOICE: {
        PAYMENT_SUCCESS:"span[ng-else='postBookingPaymentSuccess']",
        PAYMENT_HEADER_PRICE: ".text-huge",
        TABLE_ROW: ".invoice-table--row > .itable-amount",
        TABLE_ROW_AMOUNTS:".notranslate.amount.amount-visible",
        INVOICE_SUBTOTAL:"td[class='ng-scope'] span[class='notranslate amount amount-visible']",
        INVOICE_TAX_FEE:".amount-visible[ng-amount='costs.totalCost.tax + fee']",
        INVOICE_TOTAL:".amount-visible[ng-amount='costs.totalCost.total + fee']",
        INVOICE_PAID: ".amount-visible[ng-amount='booking.receiptCollectedByCharter.gross + booking.receipt.bookingFee']",
        BOOKING_DATE_TIME:".receipt-ava.ng-binding"
    }
}