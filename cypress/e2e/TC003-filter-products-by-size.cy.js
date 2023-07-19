describe('TC003: Filter products by size', () => {

    let randomSize;
    let productData;

    before(() => {
        cy.readFile('src/static/json/products.json').then((data) => {
            productData = data.data.products;
        });
    });

    it('should open the shopping cart app', () => {
        cy.goToShoppingCartHomepage();
    })

    it('verifies that products are displayed', () => {
        cy.get('.Products__Container-sc-uhudcz-0').should('be.visible');
    })


    it('should identify the size filter options', () => {
        cy.get('.Filter__Container-sc-bj2vay-0').should('be.visible');

        const sizesToCheck = ['S', 'M', 'L'];
        sizesToCheck.forEach((size) => {
            cy.get('.Filter__Checkbox-sc-bj2vay-1').contains(size).should('be.visible');
        });
    });


    it('should select a specific size filter (e.g., S, M, L)', () => {
        cy.get('.Filter__Checkbox-sc-bj2vay-1').then($sizes => {
            const randomIndex = Cypress._.random(0, $sizes.length - 1);
            const randomSizeElement = $sizes.eq(randomIndex);
            randomSize = randomSizeElement.text().trim();
            cy.wrap(randomSizeElement).click();
            cy.log(`Selected size: ${randomSize}`);
        });
    });


    it('verifies that only products matching the selected size filter are displayed', () => {
        const displayedProducts = [];

        cy.get('.Product__Title-sc-124al1g-4').each(productTitle => {
            const productName = productTitle.text().trim();
            displayedProducts.push(productName);
        }).then(() => {
            // Extracting all titles and sizes from the productData array from the JSON
            const productTitlesAndSizes = [];
            productData.forEach((product) => {
                const title = product.title;
                const sizes = product.availableSizes.join(', ');
                productTitlesAndSizes.push({ title, sizes });
            });

            // Logging product titles and sizes that match the displayed products
            displayedProducts.forEach((productName) => {
                const matchingProduct = productTitlesAndSizes.find((product) => product.title === productName);
                if (matchingProduct) {
                    expect(matchingProduct.sizes).to.include(randomSize);
                    cy.log(`
                    Product ${matchingProduct.title} is available in size ${matchingProduct.sizes}, which matches the selected size: ${randomSize}
                     `)
                }
            });
        });
    });




})
