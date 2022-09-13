import { faker } from '@faker-js/faker';

  /**
   * Add of missing semicolons to code.
   */

class bookings {
    fillContactInformation() {
        cy.get('#id_name').type(faker.name.fullName());
        cy.get('.flag-container').click();
        // I hardcoded the value because for some reason with United States doesn't work
        cy.get('.country-list').contains('Greece').click();
        // replace phoneNumber() to number() because is deprecated
        cy.get('.bookform-contact-phone').type(faker.phone.number('999-###-###'));
        cy.get('#id_email').type(faker.internet.exampleEmail());

    }

    /**
     * Update of method to set invalid credit card numbers
     */
    fillPaymentCC(creditCardNumber) {
        if(creditCardNumber) {
            // setting an invalid credit card number
            cy.get('#id_card_number').clear().type(creditCardNumber);
        } else {
            // if there is no value passed to the method, it will set a
            // a valid credit card number
            cy.get('#id_card_number').type('4242424242424242');    
        }
        
        // Update of month. There is no month 15
        cy.get('#id_card_expiry_month').select('12 - December');
        cy.get('#id_card_expiry_year').select(2);
        cy.get('#id_cardholders_name').type(faker.name.fullName());
        cy.get('.card-cvc').type(faker.finance.creditCardCVV());
        cy.get('#id_country_code').select(Math.floor(Math.random() * 150));
    }
 }

 export default bookings;