import CreateAccountPage from "../PageObjects/CreateAccountPage "
import HomePage from "../PageObjects/HomePage"
import ProductPage from "../PageObjects/ProductPage"
import CheckoutPage from "../PageObjects/CheckoutPage"
import PaymentPage from "../PageObjects/PaymentPage"


describe('End to end test suites', function () {
  let createAccountPage = new CreateAccountPage()
  let homePage = new HomePage()
  let productPage = new ProductPage()
  let checkoutPage = new CheckoutPage()
  let paymentPage = new PaymentPage()
  let data;

  before(function () {
    cy.fixture('example').then((fixtureData) => {
      data = fixtureData
    });
  });

  beforeEach(function () {
    const url = Cypress.env("url")
    createAccountPage.visit(url + "/customer/account/create/")
  })

  it('should create an account and complete the end-to-end flow from navigating to Jackets category to completing the checkout process', function () {
    cy.generateRandomString(10).then((randomText) => {
      const randomEmail = `${randomText}@yahoo.com`
      const randomPassword = `${randomText}1234`

      createAccountPage.fillForm(
        data.firstName,
        data.lastName,
        randomEmail,
        randomPassword,
        randomPassword
      );

      createAccountPage.submit();

      cy.url().should("include", "/customer/account/")
      cy.get('.message-success > div').should("contain", "Thank you for registering with Main Website Store.")
      cy.get("div[class='panel header'] span[class='logged-in']").should("contain", `${data.firstName} ${data.lastName}`)
    });

    homePage.mouseOverManClothings().trigger('mouseover')
    homePage.mouseOverTopClothings().trigger('mouseover');
    homePage.selectJacketsSection().click()

    cy.url().should("include", "/jackets-men.html")

    cy.addProduct()

    cy.get('.message-success > div').should('be.visible')
    cy.get('.action.showcart').should('have.length', 1)

    productPage.clickOnCard().click()

    cy.waitForElementToBeVisible('.subtotal > span ', 3000)
    productPage.clickOnCheckout().click()

    checkoutPage.fillShippingForm({
      street: data.street,
      city: data.city,
      region: data.region,
      postcode: data.postcode,
      country: data.country,
      telephone: data.telephone
    });

    checkoutPage.shippingMethods();
    checkoutPage.clickContinueShipping();
    cy.url().should("include", "checkout/#payment")
    paymentPage.checkBox();
    paymentPage.placeOrder()
    cy.url().should("include", "checkout/onepage/success/")
    cy.get(".base").should("have.text", "Thank you for your purchase!")
  });
});

describe('Create Account Page - Error Handling', function () {
  let createAccountPage = new CreateAccountPage()
  let data;
  before(function () {
    cy.fixture('example').then((fixtureData) => {
      data = fixtureData;
    });
  });

  beforeEach(function () {
    const url = Cypress.env("url");
    createAccountPage.visit(url + "/customer/account/create/")
  });

  it('should display errors for empty fields', function () {
    createAccountPage.submit();

    cy.get("#firstname-error").should('contain', 'This is a required field.')
    cy.get("#lastname-error").should('contain', 'This is a required field.')
    cy.get("#email_address-error").should('contain', 'This is a required field.')
    cy.get("#password-strength-meter-label").should('contain', 'No Password')
    cy.get("#password-error").should('contain', 'This is a required field.')
    cy.get("#password-confirmation-error").should('contain', 'This is a required field.')
  });

  it('should display error for invalid email format', function () {
    createAccountPage.fillForm(
      data.firstName,
      data.lastName,
      'invalid-email-format',
      'validPassword123',
      'validPassword123'
    );
    createAccountPage.submit()

    cy.get('#email_address-error').should('include.text', 'Please enter a valid email address')

  });

  it('should display error for mismatched password confirmation', function () {
    createAccountPage.fillForm(
      data.firstName,
      data.lastName,
      'test@example.com',
      'password123',
      'differentPassword123'
    );
    createAccountPage.submit()

    cy.get("#password-confirmation-error").should('contain', 'Please enter the same value again.')
  });

  it('should display error for password length', function () {
    createAccountPage.fillForm(
      data.firstName,
      data.lastName,
      'test@example.com',
      'short',
      'short'
    );
    createAccountPage.submit()

    cy.get("#password-error").should('include.text', 'Minimum length of this field must be equal or greater than 8 symbols')
  });

  it('should display error for weak password', function () {
    createAccountPage.fillForm(
      data.firstName,
      data.lastName,
      'test@example.com',
      '12345',
      '12345'
    );
    createAccountPage.submit()

    cy.get('#password-strength-meter-label').should('include.text', 'Weak')
  });
});

describe('Search Functionality Tests', function () {
  let homePage = new HomePage();

  beforeEach(function () {
    const url = Cypress.env("url")
    cy.visit(url);
  });

  it('should display search results for a valid product name', function () {
    homePage.searchForProduct('Jacket')

    cy.url().should('include', 'catalogsearch/result/?q=Jacket')
    cy.get('.products-grid').should('be.visible');
    cy.get('.product-item').should('have.length.greaterThan', 0)
  });

  it('should display no results for a product name that does not exist', function () {
    homePage.searchForProduct('NonexistentProduct')

    cy.url().should('include', 'catalogsearch/result/?q=NonexistentProduct');
    cy.get(".message.notice").should('contain', 'Your search returned no results.')
  });

  it('should display search suggestions while typing', function () {
    homePage.enterSearchText('Jacket');

    cy.waitForElementToBeVisible("#search_autocomplete").should('be.visible')
    cy.get("#search_autocomplete").should('have.length.greaterThan', 0)
  });

  it('should clear search input when the clear button is clicked', function () {
    homePage.searchForProduct('Jacket')
    homePage.clearSearch()

    cy.get('#search').should('have.value', '')
  });
});
