describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('');
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
});
