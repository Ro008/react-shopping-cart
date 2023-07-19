describe('TC002: Remove product from cart', () => {

    it('should open the shopping cart app', () => {
        cy.goToShoppingCartHomepage()
        // we need at least one product in the cart
        cy.selectRandomProduct()
    })


    it('verifies that the cart is not empty', () => {
        cy.get('.Cart__CartQuantity-sc-1h98xa9-3').should(($productsInCart) => {
            const numberOfProductsInCart = parseInt($productsInCart.text());
            expect(numberOfProductsInCart).to.be.greaterThan(0);
        });
    });


    it('should identify a product in the cart', () => {
        cy.get('.CartProduct__Container-sc-11uohgb-0').should('exist')
    });


    it('should click the "Remove" button associated with the product', () => {
        cy.get('.CartProduct__Container-sc-11uohgb-0').find('.CartProduct__DeleteButton-sc-11uohgb-5').click()
    });


    it('verifies that the product is removed from the cart', () => {
        cy.get('.CartProduct__Container-sc-11uohgb-0').should('not.exist')
    })


    it('checks that the counter updates to reflect the removal, both in cart icon and in subtotal section', () => {
        cy.get('.Cart__CartQuantity-sc-1h98xa9-3').should('have.text', '0');
        cy.get('.Cart__SubPriceValue-sc-1h98xa9-9').should('have.text', '$ 0.00');
    });

})
