
  import Calendar from '../pageObjects/calendar.js'
  import Utils from '../pageObjects/utils.js'
  import Bookings from '../pageObjects/booking.js'

  describe('FareHarbor - Book Online | Adults', function () {
    const calendar = new Calendar()
    const utils = new Utils()
    const bookings = new Bookings()
    before(function () {
      cy.visit('https://demo.fareharbor.com/embeds/book/bigappletours/items/?full-items=yes')
    })
  
    context('When page is initially opened', function () {
      it('company information is present', function () {
        cy.request('https://demo.fareharbor.com/api/v1/companies/bigappletours/').then((response) => {
          expect(response.body.company.name).to.eq("Big Apple Tours and Activities")  //Issue:: Typo in assertion text. Fix:: Corrected assetion text to "Big Apple Tours and Activities")
          expect(response.status).to.eq(200) //Issue: Check for Status code 403(Forbidden), i.e. not having required authorization.  Fix:: Changed to 200(OK) in this case.
        })
      })
      it('activity overlay should be present', function () {
        cy.get('#ng-app').should('be.visible'); //Issue:: Syntax Error, Fix: Removed extra '.' after should
      })
    }),    
    context('I pick an activity', function () {
      it('Im able to click the activity', function () {
        cy.get('.grid-block-width-1-3').click();
      })
      it('I am able to see the calendar', function () { //Minor typo
        cy.get('.test-calendar-indicator').should('be.visible');
      })
    }),    
    context('I select a day/time for my activity', function () {
      it('I pick a day', function () {
        calendar.selectNextDay();
      })
      it('I pick a time', function () {
        calendar.selectTime();
      })
    })
    context('I select the amount of people', function () {
      it('I add an adult', function () { //Fix:: Updated Description according to step performed below
        utils.addPeople(1); //Issue: Max 25 Adults allowed for walking tour. So no option with value 26.  Fix:: For positive case adding 1 person can also be sufficient.
      })
    })
    context('I fill in my contact information', function () {
      it('I add my name, phone number and email', function () {
        bookings.fillContactInformation();
      })
      it('I enter my credit card details', function () {
        bookings.fillPaymentCC();
      })
    })
    context('I pay and get confirmation', function () {
      it('I complete and pay', function () {  //Issue:: Minor Typo. Fix:: Made it 'pay' as per button text instead of 'play'
        cy.get('.btn-huge').click();   //Issue:: Missing '.' for class name selector.   Fix:: Added '.' in cy.get('.btn-huge') for Complete and Pay button
      })
      it('I get my receipt', function () {
        cy.get('.receipt-header',{ timeout: 35000 }).should('be.visible'); //Issue:: Receipt generation takes some time, more than 4s.  Fix:: Specified command level timeout.
      })
    })
  })