import { BOOKING, ENDPOINTS, PAYMENT } from "./elements"
import { faker } from '@faker-js/faker';

class BookingAndPayment {
    selectNumberOfAdults(adults) {
        cy.get(BOOKING.NUMBER_ADULTS_SELECT).select(adults)
    }

    selectNumberOfChilder(children) {
        cy.get(BOOKING.NUMBER_CHILDER_SELECT).select(children)
    }

    selectNumberOfParticipantsBigApplePrivateTour(numberOfParticipants) {
        cy.waitForDataToLoad(ENDPOINTS.METHODS.GET, ENDPOINTS.AVAILABILITIES)

        cy.get(BOOKING.NUMBER_PERSON_BIG_APPLE_PRIVATE_TOUR).within(() => {
            cy.get('option').each(($element) => {

                if($element.text() == numberOfParticipants) {
                    cy.wrap($element).parent().select(numberOfParticipants.toString())
                }
            }) 
        })    
    }

    populateContactInformation() {
        cy.get(PAYMENT.CONTACT_NAME).type(faker.name.fullName())
        cy.get(PAYMENT.CONTACT_PHONE_NUMBER).type(faker.phone.number('999-###-###'))    // number 999-###-### automatically selects USA
        cy.get(PAYMENT.CONTACT_EMAIL).type(faker.internet.exampleEmail())
    }

    populateCardNumber(cardNumber) {
        cy.get(PAYMENT.CARD_NUMBER).clear().type(cardNumber)
    }

    populatePaymentInfo(cardNumber) {  
        var validCard =
        {
            cardNumber:"4242424242424242",
            expiryDateMonth: "2",
            expiryDateYear: "2023"
        }
        if (cardNumber != undefined) {
            cy.get(PAYMENT.CARD_NUMBER).type(cardNumber)
        }
        else {
            cy.get(PAYMENT.CARD_NUMBER).type(validCard.cardNumber)
        }

        cy.get(PAYMENT.CARD_EXPIRY_MONTH).select(validCard.expiryDateMonth)
        cy.get(PAYMENT.CARD_EXPIRY_YEAR).select(validCard.expiryDateYear)
        cy.get(PAYMENT.CARDHOLDER_NAME).type(faker.name.fullName())
        cy.get(PAYMENT.CARD_CVC).type(faker.finance.creditCardCVV())
        cy.get(PAYMENT.COUNTRY_CODE).select(Math.floor(Math.random() * 150))
    }

    clickCompleteAndPayButton() {
        cy.get(PAYMENT.PAY_BUTTON).click()
    }

    getCardNumberField() {
        return cy.get(PAYMENT.ERROR_MESSAGE)
    }
}
export default BookingAndPayment