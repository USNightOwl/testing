context('Assertions', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/assertions')
  })

  describe('Implicit Assertions', () => {
    it('.should() - make an assertion about the current subject', () => {
      cy.get('.assertion-table')
        .find('tbody tr:last').should('have.class', 'success')
        .find('td')
        .first().should('have.text', 'Column content')
        .should('contain', 'Column content')
        .should('have.html', 'Column content')
        .should('match', 'td')

        cy.get('.assertion-table')
        .find('tbody tr:last')
        // finds first  element with text content matching regular expression
        .contains('td', /column content/i)
        .should('be.visible')
    });

    it('.and() - chain multiple assertions together', () => {
      cy.get('.assertions-link')
        .should('have.class', 'active')
        .and('have.attr', 'href')
        .and('include', 'cypress.io')
    })
  });

  describe('Explicit Assertions', () => {
    it('expect - make an assertion about a specified subject', () => {
      expect(true).to.be.true;
      const o = { foo: 'bar' }
      expect(o).to.equal(o)
      expect(o).to.deep.equal({ foo: 'bar' })
      // matching text using regular expression
      expect('FooBar').to.match(/bar$/i)
    })
  })
});