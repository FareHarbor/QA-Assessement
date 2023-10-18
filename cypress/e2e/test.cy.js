
  import Calendar from '../pageObjects/calendar.js'
  import Utils from '../pageObjects/utils.js'
  import Bookings from '../pageObjects/booking.js'

  describe('FareHarbor - Book Online | Adults', function () {
    const calendar = new Calendar()
    const utils = new Utils()
    const bookings = new Bookings()
    before(function () {
      cy.visit('https://demo.fareharbor.com/embeds/book/bigappletours/items/?full-items=yes')
      cy.fixture('example').then(function(data) {
        this.data = data
      })
    })
  
    context('When page is initially opened', function () {
      it('company information is present', function () {
        cy.request('https://demo.fareharbor.com/api/v1/companies/bigappletours/').then((response) => {
          //Response body returns : Big Apple Tours and Activities
          expect(response.body.company.name).to.eq("Big Apple Tours and Activities")
          // response status received : 200
          expect(response.status).to.eq(200)
        })
      })

      it('activity overlay should be present', function () {
        //syntax correction hence removed . after should
        //Cypress by default clears the current session data before each test so disabled testIsolation in cypress config file
        cy.get('#ng-app').should('be.visible');
      })
    })    

    context('I pick an activity', function () {
      it('Im able to click the activity', function () {
        cy.get('.grid-block-width-1-3').click();
      })

      it('Im able to see the calendar', function () {
        cy.get('.test-calendar-indicator').should('be.visible');
      })
    }) 

    context('I select a day/time for my activity', function () {
      it('I pick a day', function () {
        //booking for next day is not possible as the tour slots are sold out till 21st Oct,2023
        //calendar.selectNextDay();

        //selecting 1 week from the current day to book a slot
        calendar.selectNextWeek();
      })

      it('I pick a time', function () {
        //fixed locators
        calendar.selectTime();
      })
    })

    context('I select the amount of people', function () {
      //maximum adults or persons [adult+child] that can be selected in application is 25
      it('I add 25 adults', function () {
        const numberOfPeople = this.data.maxNumberOfPeople
        utils.addPeople(numberOfPeople);
      })
    })

    context('I fill in my contact information', function () {
      it('I add my name, phone number and email', function () {
        bookings.fillContactInformation();
      })

      it('I enter my credit card details', function () {
        //providing valid card details for successful payment
        const card = this.data.successCard
        bookings.fillPaymentCC(card);
      })
    }),

    context('I pay and get confirmation', function () {
      it('I complete and pay', function () {
        //updating correct locator
        cy.get('.btn-huge').click();
      })

      it('I get my receipt', function () {
        //placing an explicit wait
        const waitTime = this.data.customWaitTime
        cy.wait(waitTime)
        cy.get('.receipt-header').should('be.visible');
      })
    })
  })