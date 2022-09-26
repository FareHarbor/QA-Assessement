import Calendar from "../pageObjects/calendar";
import Tours from "../pageObjects/tours";
import Bookings from "../pageObjects/booking";

describe('Book ticket with declined payments method', function () {
    const calendar = new Calendar();
    const bookings = new Bookings();
    const tours = new Tours();

    before(function () {
        cy.visit('/embeds/book/bigappletours/items/?full-items=yes');
    })

    it('Book a tour using credit card when payment is declined', function () {
        tours.getWalkingTour().click();
        calendar.selectNextDay();
        calendar.selectTime();
        bookings.addPeople(2, 1);
        bookings.fillContactInformation();

        cy.fixture('declinedCreditCards')
            .then((declineCard) => {
                declineCard.forEach((item) => {
                    bookings.fillPaymentDetails(item.cardNumber);
                    bookings.getCompletePayButton().click();
                    bookings.getPaymentErrorMessage().contains(item.errorMessage);
                });
            });
    })
})