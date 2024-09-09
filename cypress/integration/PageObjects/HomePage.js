class HomePage {

    mouseOverManClothings() {
        return cy.get('#ui-id-5');
    }

    mouseOverTopClothings() {
        return cy.get("#ui-id-17 > span:contains('Tops')");
    }

    selectJacketsSection() {
        return cy.get("#ui-id-19 > span:contains('Jackets')")
    }

    searchInput() {
        return cy.get('#search')
    }

    searchButton() {
        return cy.get(".action.search")
    }

    searchForProduct(productName) {
        this.clearSearch()
        this.searchInput().type(productName)
        this.searchButton().click()
    }

    enterSearchText(text) {
        this.clearSearch()
        this.searchInput().type(text)
    }

    clearSearch() {
        this.searchInput().invoke('val', '').trigger('input')
    }
}

export default HomePage;
