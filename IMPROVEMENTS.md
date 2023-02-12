# Improvement suggestions:

## Use of POM: 
- Current test.cy.js seems to be lacking implementaiton of POM design pattern, which if done currectly, can result in more maintainable code and reduce duplication
- As per Test isolation rule, Tests should always be able to be run independently from one another and still pass. This seems to be missing.
- Single test should perform single validation, so other failing test does not given wrong impression for passing case. In test.cy.js, there are multiple validation or validation is missing from many tests (i.e. it() block) 
- As per POM design pattern, for abstraction, it is good practice to keep actual implementaiion details (e.g. page element selectors/methods) in separate file, which is not the case here
- Util.js is not needed in this case, the method addPeople can be moved in bookings.js. 
- One can use other provision to implement common commands/methods
- Selectors should not be hardcoded, this can result in higher maintainance if there is any changes in future in UI 
- Seems calling cy.request is not required!
- Readibility of code written can be improved


## Use of DRY:
- Make use of different Cypress provisions to incorporate DRY principles. Separate out Selectors/Methods from actual Test
- However, avoid hasty abstractions(AHA!), and prefer duplication over the wrong abstraction
- For example, if fillpaymentCC() have been implemented in a way that Card Number is NOT hardcoded
- One can also add custom commands to “cy” object for intellisense. That way one can keep the code clean, and write it faster. e.g. See command added for apiRequest.


## Other Improvements/Suggestions:
- Work with developer to add data-* attributes to make it easier to target elements. Using css attribute is very volatile. The data-* attribute will not change from CSS style or JS behavioral changes
- Set global baseURL in configuration
- Make use of fixtures to store and load data rather than hardcoding values
- Do NOT couple multiple test tohether. Tests should always be able to be run independently from one another and still pass
- Execution Report Generation and result archieving
- Integation with CI/CD e.g. Github Actions