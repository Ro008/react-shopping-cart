describe('TC001: Add product to cart', () => {

    it('should open the shopping cart app', () => {
        cy.goToShoppingCartHomepage()
    })


    it('verifies that the cart is initially empty', () => {
        cy.get('.Cart__CartQuantity-sc-1h98xa9-3').should('have.text', '0')
    })


    it('should browse for a product and click the "Add to cart" button', () => {
        cy.selectRandomProduct()
    })


    it('verifies that the product is added to the cart', () => {
        cy.checkProductAddedToCart();
    });


    it('checks that the cart updates to reflect the addition, both in cart icon and quantity details', () => {
        cy.get('.Cart__CartQuantity-sc-1h98xa9-3').should('have.text', '1');
        cy.get('.CartProduct__Desc-sc-11uohgb-3')
            .contains('Quantity')
            .should('contain', '1');
    });


    it('verifies that the subtotal reflects the correct sum in dollars', () => {
        // Get the product price
        cy.get('.CartProduct__Price-sc-11uohgb-4 p').then(productPriceElement => {
            const productPrice = parseFloat(productPriceElement.text().replace('$', ''));

            // Get the subtotal value
            cy.get('.Cart__SubPriceValue-sc-1h98xa9-9').then(subtotalElement => {
                const subtotal = parseFloat(subtotalElement.text().replace('$', ''));

                // Compare the product price with the subtotal
                expect(subtotal).to.eq(productPrice);
            });
        });
    });

})
