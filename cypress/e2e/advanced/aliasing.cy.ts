context('Aliasing', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/aliasing')
  })

  it('.as() - alias a DOM element for later use', () => {
    cy.get('.as-table').find('tbody>tr').first().find('td').first().find('button').as('firstBtn')

    cy.get('@firstBtn').click()
    cy.get('@firstBtn').should('have.class', 'btn-success')
      .and('contain', 'Changed');
  })
})