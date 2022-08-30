module.exports = {
    // The locators are still britle because the frontend does not have organised strategy for element search
    // Best practices suggest having i.e. data-cy="someID" so that we can save it as '[data-cy="someID"]'
    // The above explained approach decouples the selector from HTML semantics, CSS, and frontend JS
    BOOKING: {
        NUMBER_ADULTS_SELECT: ".test-select-count-adult select",
        NUMBER_CHILDER_SELECT: ".test-select-count-child select",
        NUMBER_PERSON_BIG_APPLE_PRIVATE_TOUR: ".test-select-count-action"
    },
    PAYMENT: {
        CONTACT_NAME: "#id_name",
        CONTACT_NUMBER_COUNTRY_DDW: ".flag-container",
        CONTACT_COUNTRY_FLAG_LIST: ".country-list",
        CONTACT_PHONE_NUMBER: ".bookform-contact-phone",
        CONTACT_EMAIL: "#id_email",
        PAYMENT_FORM: ".book-form-complete-columns",
        CARD_NUMBER: "#id_card_number",
        CARD_EXPIRY_MONTH: "#id_card_expiry_month",
        CARD_EXPIRY_YEAR: "#id_card_expiry_year",
        CARDHOLDER_NAME: "#id_cardholders_name",
        CARD_CVC: ".card-cvc",
        COUNTRY_CODE: "#id_country_code",
        ERROR_MESSAGE: ".form-errors .ng-binding",
        ERROR_MESSAGE_BINDING: ".ng-binding",
        PAY_BUTTON: ".btn-huge"

    },
    ENDPOINTS: {
        METHODS: {
            GET: "GET",
            POST: "POST"
        },
        AVAILABILITIES: "/api/v1/companies/bigappletours/items/58792/availabilities/**"
    }
}