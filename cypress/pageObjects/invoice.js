const { INVOICE } = require('../selectors/invoiceSelectors');

class invoice {

    getPaymentSuccess(){
        return cy.get(INVOICE.PAYMENT_SUCCESS)
    }

    getPaymentHeaderPrice() {
        return cy.get(INVOICE.PAYMENT_HEADER_PRICE)
    }

    getInvoiceTableRow() {
        return cy.get(INVOICE.TABLE_ROW)
    }

    getInvoiceRowAmounts() {
        return cy.get(INVOICE.TABLE_ROW_AMOUNTS)
    }    

    getSubtotalAmount() {
        return cy.get(INVOICE.INVOICE_SUBTOTAL)
    }

    getTaxNFeeAmount(){
        return cy.get(INVOICE.INVOICE_TAX_FEE)
    }

    getTotalAmount(){
        return cy.get(INVOICE.INVOICE_TOTAL)
    }

    getPaidAmount(){
        return cy.get(INVOICE.INVOICE_PAID)
    }

    getBookingDateTime(){
        return cy.get(INVOICE.BOOKING_DATE_TIME)

    }
   
}
export default invoice