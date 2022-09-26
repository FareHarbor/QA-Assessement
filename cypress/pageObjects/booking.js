import {faker} from '@faker-js/faker';

class bookings {

    /* Contact information */
    getFullName() {
        return cy.get('#id_name');
    }

    getCountryPhoneCode() {
        return cy.get('.flag-container');
    }

    getCountryList() {
        return cy.get("li[data-country-code=" + faker.address.countryCode().toLowerCase() + "]");
    }

    getPhoneNumber() {
        return cy.get('.bookform-contact-phone');
    }

    getEmail() {
        return cy.get('#id_email');
    }

    /* Credit Card Details */
    getCardNumber() {
        return cy.get('#id_card_number');
    }

    getExpiryMonth() {
        return cy.get('#id_card_expiry_month');
    }

    getExpiryYear() {
        return cy.get('#id_card_expiry_year');
    }

    getCardHolderName() {
        return cy.get('#id_cardholders_name');
    }

    getCardCVCNumber() {
        return cy.get('.card-cvc');
    }

    getCountryCode() {
        return cy.get('#id_country_code');
    }

    getZipCode() {
        return cy.get('#id_postal_code');
    }

    getCompletePayButton() {
        return cy.get('.btn-huge');
    }

    getAdultDropDown() {
        return cy.get('.test-select-count-adult select');
    }

    getChildDropDown() {
        return cy.get('.test-select-count-child select');
    }

    getPaymentErrorMessage() {
        return cy.get('div[class="form-errors"] ul li[ng-repeat*="error"]', {timeout: 8000});
    }

    getTotalAmount() {
        return cy.get('span[class *= "test-total-indicator"]');
    }

    getSubTotalAmount() {
        return cy.get('.test-subtotal-indicator');
    }

    getTaxTotalAmount() {
        return cy.get('.test-taxes-and-fees-indicator');
    }

    getFeeTotalAmount() {
        return cy.get('.subtotal-value').eq(2);
    }

    fillContactInformation() {
        this.getFullName().type(faker.name.fullName());
        this.getCountryPhoneCode().click();
        this.getCountryList().click();
        //phoneNumber is deprecated changed to number
        this.getPhoneNumber().type(faker.phone.number('999-###-###'));
        this.getEmail().type(faker.internet.exampleEmail());
    }

    fillPaymentDetails(cardNumber) {
        if (cardNumber) {
            this.getCardNumber().clear().type(cardNumber);
        } else {
            this.getCardNumber().type('4242424242424242');
        }
        this.getExpiryMonth().select('2');
        this.getExpiryYear().select(2);
        this.getCardHolderName().type(faker.name.fullName());
        this.getCardCVCNumber().type(faker.finance.creditCardCVV());

        let countryCode = faker.address.countryCode().toUpperCase();
        //Zip code is needed for the specific country. For example i added USA if needed will add accordingly 
        if (countryCode === 'US') {
            this.getZipCode().type(faker.address.zipCode());
        } else {
            this.getCountryCode().select(countryCode);
        }
    }

    addPeople(adults, children) {
        this.getAdultDropDown().select(adults);
        if (children > 0) {
            this.getChildDropDown().select(children);
        }
    }

    addPeopleForBigAppleTour(people) {
        cy.get('.test-select-count-action').eq(1).select(people);
    }

    invoiceCalculation(adults, children) {
        let subtotal, taxes, fees, total;

        if (children > 0) {
            this.getSubTotalAmount().invoke('text').then((value) => {
                value = value.replace('$', '');
                subtotal = (adults * 35) + (children * 20);
                expect(parseFloat(value)).to.eq(subtotal);
            })

            this.getTaxTotalAmount().invoke('text').then((value) => {
                value = value.replace('$', '');
                taxes = (adults * 3.50) + (children * 2);
                expect(parseFloat(value)).to.eq(taxes);
            })

            this.getFeeTotalAmount().invoke('text').then((value) => {
                value = value.replace('$', '');
                fees = (adults * 2.10) + (children * 1.20);
                expect(parseFloat(value)).to.eq(fees);
            })

            this.getTotalAmount().invoke('text').then((value) => {
                value = value.replace('$', '');
                subtotal = (adults * 35) + (children * 20);
                taxes = (adults * 3.50) + (children * 2);
                fees = (adults * 2.10) + (children * 1.20);
                total = subtotal + taxes + fees;
                expect(parseFloat(value)).to.eq(total);
            })
        } else {
            this.getSubTotalAmount().invoke('text').then((value) => {
                value = value.replace('$', '');
                subtotal = (adults * 35);
                expect(parseFloat(value)).to.eq(subtotal);
            })

            this.getTaxTotalAmount().invoke('text').then((value) => {
                value = value.replace('$', '');
                taxes = adults * 3.50;
                expect(parseFloat(value)).to.eq(taxes);
            })

            this.getFeeTotalAmount().invoke('text').then((value) => {
                value = value.replace('$', '');
                fees = adults * 2.10;
                expect(parseFloat(value)).to.eq(fees);
            })

            this.getTotalAmount().invoke('text').then((value) => {
                value = value.replace('$', '');
                subtotal = (adults * 35);
                taxes = adults * 3.50;
                fees = adults * 2.10;
                total = subtotal + taxes + fees;
                expect(parseFloat(value)).to.eq(total);
            })
        }
    }
}

export default bookings

