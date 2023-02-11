const { TOURS } = require('../selectors/toursSelectors');

class Tours {
    clickOnTour(tourName) {
        cy.get(TOURS.TOUR_TYPE).contains(tourName).click()
    }
}
export default Tours