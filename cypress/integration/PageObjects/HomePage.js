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
}

export default HomePage;

 