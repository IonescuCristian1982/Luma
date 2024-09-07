class PaymentPage {
    
    checkBox() {
       return cy.get("#billing-address-same-as-shipping-checkmo").click() 
    }

    placeOrder() {
        return cy.get("button[title='Place Order']").click() 
     }
}

export default PaymentPage