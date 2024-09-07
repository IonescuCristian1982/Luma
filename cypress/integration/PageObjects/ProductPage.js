class ProductPage {

    clickOnCard(){
        return cy.get('.action.showcart')
    }

    clickOnCheckout(){
        return cy.get('#top-cart-btn-checkout')
    }
}

export default ProductPage

 