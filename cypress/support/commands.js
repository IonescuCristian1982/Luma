// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
//Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//  

Cypress.Commands.add('addProduct', () => {
  cy.get('.product-item-info').first().click()
    cy.get("div[class='swatch-attribute size'] div:first-child").click()
    cy.get("div[class='swatch-attribute color'] div:first-child").click()
    cy.get('#product-addtocart-button').click()
})


Cypress.Commands.add('waitForElementToBeVisible', (selector, timeout = 10000) => {
  cy.get(selector, { timeout }).should('be.visible');
});

Cypress.Commands.add('login', (username, password) => {
  cy.get('#email').type(username), {force: true};
  cy.get('#pass').type(password);
  cy.get('#send2').click();
});

Cypress.Commands.add('generateRandomString', (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
});

 







