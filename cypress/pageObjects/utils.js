  /**
   * Add of missing semicolons to code.
   * The name Utils, for me, means an auxiliary class with methods that can help me
   * to perform some activity not related with the UI of the page (i. e.: to generate
   * a random number, to create a method to read a CSV/JSON file, etcetera). The following
   * method could be added in the booking class.
   */

class utils {

    addPeople(adults,children) {
        cy.get('.test-select-count-adult select').select(adults);

        if(children > 0)
        {
            cy.get('.test-select-count-child select').select(children);
        }
    }
}

export default utils;