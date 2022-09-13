  /**
   * Add of missing semicolons to code.
   * The name Utils, for me, means an auxiliary class with methods that can help me
   * to perform some activity not related with the UI of the page (i. e.: to generate
   * a random number, to create a method to read a CSV/JSON file, etcetera). The following
   * method could be added in the booking class.
   */

class utils {

    addPeople(adults, children) {
        cy.get('.test-select-count-adult select').select(adults);

        if(children > 0)
        {
            cy.get('.test-select-count-child select').select(children);
        }
    }

    /**
     * My code begins here
     */
    bigAppleTourSelection(people) {
        cy.get('.test-select-count-action').eq(1).select(people);
    }

    calculateInvoice(adults, children) {
        var subtotal, taxes, fees, total;
        var adultCost = "", childCost = "", grandTotal = "";

        cy.get('div[class *= "test-customer-type-rate-cost-adult"] span[class *= "price-wrap"]').invoke('text').then((value) => {
            adultCost = value.replace('$', '');
            cy.wrap(adultCost).as('adultCost');
        });

        cy.get('div[class *= "test-customer-type-rate-cost-child"] span[class *= "price-wrap"]').invoke('text').then((value) => {
            childCost = value.replace('$', '');
            cy.wrap(childCost).as('childCost')
        }); 

        if(children < 0) {
            cy.get('@adultCost').then(adultCost => {
                subtotal = (adults * parseFloat(adultCost));
                taxes = (adults * 3.50);
                fees = (adults * 2.10);
                total = subtotal + taxes + fees;

                cy.get('span[class *= "test-total-indicator"]').invoke('text').then((value) => {
                    grandTotal = value.replace('$', '');
                    expect(grandTotal).to.eq(total);
                });
            });
        } else {
            cy.get('@adultCost').then(adultCost => {
                cy.get('@childCost').then(childCost => {
                    subtotal = (adults * parseFloat(adultCost)) + (children * parseFloat(childCost));
                    taxes = (adults * 3.50) + (children * 2);
                    fees = (adults * 2.10) + (children * 1.20);
                    total = subtotal + taxes + fees;

                    cy.get('span[class *= "test-total-indicator"]').invoke('text').then((value) => {
                        grandTotal = value.replace('$', '');
                        expect(parseFloat(grandTotal)).to.eq(total);
                    });
                });
            });
        }
    }
}

export default utils;