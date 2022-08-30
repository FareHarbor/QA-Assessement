module.exports = {
    // The locators are still britle because the frontend does not have organised strategy for element search
    // Best practices suggest having i.e. data-cy="someID" so that we can save it as '[data-cy="someID"]'
    // The above explained approach decouples the selector from HTML semantics, CSS, and frontend JS
    TOURSPREVIEW: {
        TOUR_TILES: ".item-grid-block-inner"
    }
}