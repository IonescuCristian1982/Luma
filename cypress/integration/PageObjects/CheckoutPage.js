class CheckoutPage {
    fillShippingForm({ street, city, region, postcode, country, telephone }) {
        cy.get("div[name='shippingAddress.street.0'] div[class='control']").type(street)
        cy.get("div[name='shippingAddress.city'] div[class='control']").type(city)
        cy.get("select[name='region_id']").select(region)
        cy.get("div[name='shippingAddress.postcode'] div[class='control']").type(postcode)
        cy.get("select[name='country_id']").select(country)
        cy.get("div[name='shippingAddress.telephone'] div[class='control _with-tooltip']").type(telephone)
    }

    shippingMethods(){
        return cy.get("input[value='flatrate_flatrate']").click()
    }

    clickContinueShipping() {
        cy.get('.button.action.continue.primary').click()
    }
}

export default CheckoutPage
