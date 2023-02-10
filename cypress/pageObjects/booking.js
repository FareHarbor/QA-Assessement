import { faker } from '@faker-js/faker';

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
 }
 export default bookings