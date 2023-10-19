class utils {

    addPeople(adults,children) {
        cy.get('.test-select-count-adult select').select(adults);
        if(children>0)
        {
        cy.get('.test-select-count-child select').select(children);
        }
    }

    addFourToSixPeople(numberOfPeople){
        cy.wait(3000)
        cy.get('.test-select-count-four-to-six-people select.test-select-count-action').select(numberOfPeople)
    }

    fillCateringOptions(){
        cy.get('.test-customer-card-four-to-six-people').each((e1)=> {
        const optionToChooseText = e1.find('.select2-selection__placeholder').text()
            if(optionToChooseText === 'Choose an option'){
                cy.wrap(e1).find('.select2-selection__arrow').click()
                cy.get('.select2-results__option--highlighted').click() 
            }  
        })
    }

    fillAdditionalInformation(){
        cy.get('.test-custom-field-allergies').click({force: true})
        cy.get('.test-custom-field-detailed-allergies').type("Please exclude peanuts, mushrooms and milk")
        cy.get('.book-form-booking-fields').find('.select2-selection__arrow').click()
        cy.get('.select2-search__field').type("Goo")
        cy.get('.select2-results__option span').each((e2)=> {
            if(e2.text()==='Google'){
                cy.wrap(e2).click()
            }
        })
        cy.get('.test-custom-field-comments').type('Hoping for a fantastic service')
    }

    validateTotalAmountMoneyCalculation(){
        var sum = 0
        var taxesAndfees = 0
        var sumWithTaxes = 0
        //Getting individual price per adult and calculating the total sum
        cy.get('.itable-amount span span').each((e3)=>{
            const amount = e3.text()
            var res = amount.split("$")
            res = res[1].trim()
            sum = Number(sum)+Number(res)
        }).then (function()
        {
            cy.log(sum) //provides the total of all persons involved in the booking purchased
            taxesAndfees = sum*0.16  //provides the overall taxes incurred [10% taxes and 6% fees]
            cy.log(taxesAndfees)
            sumWithTaxes = (sum + taxesAndfees).toFixed(2) //summing up taxes and total costs of persons in booking
            cy.log(sumWithTaxes)
        })
        cy.get('tr.text-larger b.amount-visible').then(function(totalAmount){
            const amount = totalAmount.text()
            var res = amount.split("$")
            res = res[1].trim()
            var result = res.replace(/,/,'')
            var totalServiceAmountInludingTaxesFees = Number(result).toFixed(2)
            cy.log(totalServiceAmountInludingTaxesFees)
            expect(totalServiceAmountInludingTaxesFees).to.equal(sumWithTaxes)
        })
    }
}
 export default utils