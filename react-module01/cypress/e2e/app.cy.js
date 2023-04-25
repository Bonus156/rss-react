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
    cy.get('.container div:only-of-type').children().should('contain.text', findName);
  });
});
