///<reference types="cypress" />

describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('should have search bar', () => {
    cy.get('input').should('have.value', '');
    cy.get('button').should('exist');
  });
  it('should find Abradolfs', () => {
    const findName = 'Abradolf';
    cy.get('input').type(findName);
    cy.get('input').should('have.value', findName);
    cy.get('button').click();
    cy.get('div.container div:only-of-type').children().should('contain.text', findName);
  });
  it('should show the same Monsters after visiting form page and returning back', () => {
    const findName = 'Monster';
    cy.get('input').type(findName);
    cy.get('input').should('have.value', findName);
    cy.get('button').click();
    cy.get('.container div:only-of-type').children().should('contain.text', findName);
    cy.get('a:last-of-type').click();
    cy.get('a:first-of-type').click();
    cy.get('input').should('have.value', findName);
    cy.get('div.container div:only-of-type').children().contains(findName);
  });
  it('should show modal after click on card', () => {
    cy.get('div.container div:only-of-type')
      .children()
      .first()
      .should('contain.text', 'Name')
      .click();
    cy.get('.modal').should('exist');
  });
  it('should close modal after click on overlay but not on center', () => {
    cy.get('div.container div:only-of-type')
      .children()
      .first()
      .should('contain.text', 'Name')
      .click();
    cy.get('.modal').click('center');
    cy.get('.modal').should('exist').click('topLeft');
    cy.get('.modal').should('not.exist');
  });
  it('should show not found text', () => {
    const findName = 'notFoundTest';
    cy.get('input').type(findName);
    cy.get('input').should('have.value', findName);
    cy.get('button').click();
    cy.get('div.container div:only-of-type').first().should('contain.text', 'Characters not found');
  });
});

describe('About Us Page', () => {
  beforeEach(() => {
    cy.visit('/about');
  });
  it('should have text about us', () => {
    cy.get('h1').should('exist').should('contain.text', 'About us');
  });
});

describe('Not Found Page', () => {
  beforeEach(() => {
    cy.visit('/test404');
  });
  it('should have text error 404', () => {
    cy.get('h1').should('exist').should('contain.text', 'Error 404');
  });
});

describe('Forms Page', () => {
  beforeEach(() => {
    cy.visit('/form');
  });
  it('should have all forms', () => {
    cy.get('input[type="text"]').should('exist').should('have.value', '');
    cy.get('input[type="date"]').should('exist').should('have.value', '');
    cy.get('select')
      .should('exist')
      .children()
      .first()
      .should('have.value', 'unselect')
      .should('have.text', 'Choose here');
    cy.get('input[type="radio"]').should('exist').should('not.be.checked');
    cy.get('input[type="file"]').should('exist');
    cy.get('input[type="checkbox"]').should('exist').should('not.be.checked');
    cy.get('input[type="submit"]').should('exist');
  });
  it('should show invalidity warnings', () => {
    cy.get('input[type="submit"]').should('exist').click();
    cy.contains('Type your name');
    cy.contains('Choose birthday date');
    cy.contains('You must select a country');
    cy.contains('Gender must be selected');
    cy.contains('Choose image file');
    cy.contains('Your agreement is required');
  });
  it('should disappear invalidity warnings and create userCard', () => {
    cy.get('input[type="text"]').type('Apple');
    cy.get('input[type="submit"]').should('exist').click();
    cy.contains('Type your name').should('not.exist');
    cy.get('input[type="date"]').type('2002-05-01');
    cy.get('input[type="submit"]').click();
    cy.contains('Choose birthday date').should('not.exist');
    cy.get('select').select('ukraine');
    cy.get('input[type="submit"]').click();
    cy.contains('You must select a country').should('not.exist');
    cy.get('input[type="radio"][value="male"]').should('exist').check();
    cy.get('input[type="submit"]').click();
    cy.contains('Gender must be selected').should('not.exist');
    cy.get('input[type="file"]').selectFile({
      contents: Cypress.Buffer.from('file contents'),
      fileName: 'testImage.jpeg',
      lastModified: Date.now(),
    });
    cy.get('input[type="submit"]').click();
    cy.contains('Choose image file').should('not.exist');
    cy.get('input[type="checkbox"]').check();
    cy.get('input[type="submit"]').click();
    cy.contains('Your agreement is required').should('not.exist');
  });
});
