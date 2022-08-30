const { TOURSPREVIEW } = require('./elements');

class ToursPreview {
    selectTheTour(tourName) {
        cy.get(TOURSPREVIEW.TOUR_TILES).contains(tourName).click()
    }
}
export default ToursPreview