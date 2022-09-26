class tours {

    getWalkingTour() {
        return cy.get('.grid-block-width-1-3');
    }

    getBigAppleTour() {
        return cy.get('.grid-block-width-1-2').eq(0);
    }

    getSightSeeingBusTour() {
        return cy.get('.grid-block-width-2-3');
    }
}

export default tours