import { faker } from '@faker-js/faker';

class bookings {

    fillContactInformation() {

        //Name
        cy.get('#id_name').type(faker.name.fullName())

        //Telephone
        //cy.get('').select('[data-country-code='+faker.address.countryCode().toLowerCase()+'"]')
        cy.get('.flag-container').click()
        cy.get('.country-list').contains(faker.address.country()).click()       // ISSUE: Flaky locator, failed to find Côte d’Ivoire because faker returns Cote d’Ivoire        
        cy.get('.bookform-contact-phone').type(faker.phone.number('999-###-###'))       //phoneNumber was deprecated, therefore changed to faker.phone.numer() | Also, the '999-###-###' overwrites the country selected in previous step
       
        //Email
        cy.get('#id_email').type(faker.internet.exampleEmail())

    }
    fillPaymentCC() {
        //Always use the same positive card
        cy.get('#id_card_number').type('4242424242424242')
        //Select Next Year, Select second month of next year
        cy.get('#id_card_expiry_month').select(2)       // FIX: argument for select was 15, which is invalid value for the month number
        cy.get('#id_card_expiry_year').select("2023")       // FIX: argument for select was 2, which is invalid value for the wanted year

        cy.get('#id_cardholders_name').type(faker.name.fullName())
        cy.get('.card-cvc').type(faker.finance.creditCardCVV())
        cy.get('#id_country_code').select(Math.floor(Math.random() * 150))
    }
 }
 export default bookings