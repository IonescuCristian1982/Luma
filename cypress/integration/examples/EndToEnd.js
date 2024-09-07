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

  before(function () {
    cy.fixture('example').then((data) => {
      this.data = data;
    });
  });

  before(() => {
    const url = Cypress.env("url")
    createAccountPage.visit(url + "/customer/account/create/")
  })

  it('should create an account and complete the end-to-end flow from navigating to Jackets category to completing the checkout process', function () {
    cy.generateRandomString(10).then((randomText) => {
      const randomEmail = `${randomText}@yahoo.com`
      const randomPassword = `${randomText}1234`

      createAccountPage.fillForm(
        this.data.firstName,
        this.data.lastName,
        randomEmail,
        randomPassword,
        randomPassword
      );

      createAccountPage.submit();

      cy.url().should("include", "/customer/account/")
      cy.get('.message-success > div').should("contain", "Thank you for registering with Main Website Store.")
      cy.get("div[class='panel header'] span[class='logged-in']").should("contain", `${this.data.firstName} ${this.data.lastName}`)
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
      //street: '123 Elm Street',
      street: this.data.street,
      city: this.data.city,
      region: this.data.region,
      postcode: this.data.postcode,
      country: this.data.country,
      telephone: this.data.telephone
    });

    checkoutPage.shippingMethods();
    checkoutPage.clickContinueShipping();
    cy.url().should("include", "checkout/#payment")
    paymentPage.checkBox();
    paymentPage.placeOrder()
    cy.url().should("include", "checkout/onepage/success/")
    cy.get(".base").should("have.text", "Thank you for your purchase!")
  });
})



