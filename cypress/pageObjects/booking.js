import { faker } from '@faker-js/faker';

  /**
   * Add of missing semicolons to code.
   */

class bookings {

    fillContactInformation() {

        //Name
        cy.get('#id_name').type(faker.name.fullName());

        //Telephone
        //cy.get('').select('[data-country-code='+faker.address.countryCode().toLowerCase()+'"]')
        cy.get('.flag-container').click();
        cy.get('.country-list').contains(faker.address.country()).click();
        cy.get('.bookform-contact-phone').type(faker.phone.phoneNumber('999-###-###'));
       
        //Email
        cy.get('#id_email').type(faker.internet.exampleEmail());

    }
    fillPaymentCC() {
        //Always use the same positive card
        cy.get('#id_card_number').type('4242424242424242');
        //Select Next Year, Select second month of next year
        cy.get('#id_card_expiry_month').select(12);     // Update of month. There is no month 15
        cy.get('#id_card_expiry_year').select(2);

        cy.get('#id_cardholders_name').type(faker.name.fullName());
        cy.get('.card-cvc').type(faker.finance.creditCardCVV());
        cy.get('#id_country_code').select(Math.floor(Math.random() * 150));
    }
 }

 export default bookings;