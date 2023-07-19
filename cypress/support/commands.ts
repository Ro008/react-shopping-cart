/// <reference types="cypress" />
// ***********************************************

let selectedProductDetails: { name: any; };

Cypress.Commands.add('goToShoppingCartHomepage' as any, () => {
    cy.visit('http://localhost:3000/')
})


Cypress.Commands.add('selectRandomProduct' as any, () => {
    cy.get('.Product__Container-sc-124al1g-2')
        .find('button')
        .then(buttons => {
            const randomIndex = Cypress._.random(0, buttons.length - 1);
            const selectedButtonNumber = randomIndex + 1; // Add 1 to display human-readable number
            cy.log(`Product number ${selectedButtonNumber} of the list`);

            // Click the "Add to cart" button
            cy.wrap(buttons[randomIndex]).click();

            // Get the product details
            cy.wrap(buttons[randomIndex])
                .closest('.Product__Container-sc-124al1g-2')
                .then(product => {
                    selectedProductDetails = {
                        name: product.find('.Product__Title-sc-124al1g-4').text()
                    };
                });
        });
});


Cypress.Commands.add('checkProductAddedToCart' as any, () => {
    const selectedProductName = selectedProductDetails.name;
    cy.log(`product selected: ${selectedProductName}`)
    cy.get('.CartProduct__Title-sc-11uohgb-2').should('contain', selectedProductName);
})



