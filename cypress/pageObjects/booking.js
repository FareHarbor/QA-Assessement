import { faker } from '@faker-js/faker';

class bookings {

    fillContactInformation() {

        //Name
        cy.get('#id_name').type(faker.name.fullName())

        //Telephone
        //cy.get('').select('[data-country-code='+faker.address.countryCode().toLowerCase()+'"]')
        cy.get('.flag-container').click()
        cy.get('.country-list').contains('France').click()    //Hardcoding this value as it fails for some cases
        //using faker.phone.number as faker.phone.phoneNumber is deprecated    
        cy.get('.bookform-contact-phone').type(faker.phone.number('999-###-###'))
       
        //Email
        cy.get('#id_email').type(faker.internet.exampleEmail())

    }
    fillPaymentCC(cardData) {
       //Using different data combinations to test success & failure
        cy.get('#id_card_number').type(cardData)
        //Select Next Year, Select second month of next year
        cy.get('#id_card_expiry_month').select(2) //updated the second month for next year. We have only 12 months in a year so the value passed > 15 is incorrect
        cy.get('#id_card_expiry_year').select("2024") //updated next year
        cy.get('#id_cardholders_name').type(faker.name.fullName())
        cy.get('.card-cvc').type(faker.finance.creditCardCVV())
        cy.get('#id_country_code').select(Math.floor(Math.random() * 150))
    }
 }
 export default bookings