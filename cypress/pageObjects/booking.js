import { faker } from '@faker-js/faker';
const { ATTENDEE, CONTACT, PAYMENT } = require('../selectors/bookingSelectors');

class bookings {

    fillContactInformation() {

        //Name
        cy.get('#id_name').type(faker.name.fullName())

        //Telephone
        //cy.get('').select('[data-country-code='+faker.address.countryCode().toLowerCase()+'"]')
        cy.get('.flag-container').click()
        cy.get('.country-list').contains(faker.address.country()).click()     //Issue : Not robust selector. Could NOT find country 'Holy See (Vatican City State)' returned by faker 
        cy.get('.bookform-contact-phone').type(faker.phone.number('999-###-###'))  // phoneNumber is depecrated. Also, to Fix above Issue provide phoneNumber with Country code e.g. +48 91 ### ## ##'
       
        //Email
        cy.get('#id_email').type(faker.internet.exampleEmail())

    }
    fillPaymentCC() {
        //Always use the same positive card
        cy.get('#id_card_number').type('4242424242424242')
        //Select Next Year, Select second month of next year
        cy.get('#id_card_expiry_month').select(2)  // Issue: For Month value is provided as 15 which is not valid.  Fix:: Provided valid value.
        cy.get('#id_card_expiry_year').select(2)   

        cy.get('#id_cardholders_name').type(faker.name.fullName())
        cy.get('.card-cvc').type(faker.finance.creditCardCVV())
        cy.get('#id_country_code').select(Math.floor(Math.random() * 150))
    }

    //Improvement: This method can Replace method in utils.js
    addPeople(adults, children) {
        cy.get(ATTENDEE.ADULTS_TO_SELECT).select(adults);
        if (children > 0) {
            cy.get(ATTENDEE.CHILDRENS_TO_SELECT).select(children);
        }
    }

    //Improvement: This method can Replace fillPaymentCC method above
    addContactDetails() {
        cy.get(CONTACT.CONTACT_NAME).type(faker.name.fullName())
        cy.get(CONTACT.CONTACT_PHONE_NUMBER).type(faker.phone.number('999-###-###'))
        cy.get(CONTACT.CONTACT_EMAIL).type(faker.internet.exampleEmail())
    }

    //Improvement: This method can Replace fillPaymentCC method above
    addPaymentDetails(cardNumber) {
        this.addCardNumber(cardNumber)
        cy.get(PAYMENT.CARD_EXPIRY_MONTH).select(2)
        cy.get(PAYMENT.CARD_EXPIRY_YEAR).select(2)
        cy.get(PAYMENT.CARD_HOLDER_NAME).type(faker.name.fullName())
        cy.get(PAYMENT.CARD_CVC).type(faker.finance.creditCardCVV())
        cy.get(PAYMENT.COUNTRY_CODE).select(Math.floor(Math.random() * 150))
    }

    addCardNumber(cardNumber) {
        if (cardNumber) {
            cy.get(PAYMENT.CARD_NUMBER).clear().type(cardNumber)
        }
        else {
            cy.get(PAYMENT.CARD_NUMBER).type('4000000000000002')
        }
    }

    clickCompleteAndPay() {
        cy.get(PAYMENT.COMPLETE_PAY_BUTTON).click()
    }

    getErrorMessage() {
        return cy.get(PAYMENT.ERROR_MESSAGE)
    }
 }
 export default bookings