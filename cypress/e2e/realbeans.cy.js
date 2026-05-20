const storeUrl = 'https://r1012518-realbeans.myshopify.com/';
const password = 'iaprap';

function enterPassword() {
  cy.visit(storeUrl);

  cy.get('body').then(($body) => {
    if ($body.find('input[type="password"]').length > 0) {
      cy.get('input[type="password"]').type(password);
      cy.get('button[type="submit"]').click();
    }
  });
}

describe('RealBeans Shopify store', () => {
  beforeEach(() => {
    enterPassword();
  });

  it('shows the homepage intro text', () => {
    cy.contains('Since 1801, RealBeans has roasted premium coffee in Antwerp');
    cy.contains('Ethically sourced beans, crafted with care.');
  });

  it('shows the About page text', () => {
    cy.visit(`${storeUrl}/pages/about`);

    cy.contains('From a small Antwerp grocery to a European coffee staple');
    cy.contains('Our beans are roasted in-house, shipped from Antwerp or Stockholm');
  });

  it('shows the product catalog page', () => {
    cy.visit(`${storeUrl}/collections/all`);

    cy.get('body').should('contain.text', 'RealBeans');
  });

  it('can sort products by price', () => {
    cy.visit(`${storeUrl}/collections/all`);

    cy.get('select').first().select('Price, low to high', { force: true });
  });

  it('opens a product detail page', () => {
    cy.visit(`${storeUrl}/collections/all`);

    cy.get('a[href*="/products/"]:visible').first().click();

    cy.get('body').should('contain.text', '€');
    cy.get('img').should('exist');
  });
});