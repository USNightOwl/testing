context('Querying', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/querying')
  })

  it('cy.get() - query DOM elements', () => {
    cy.get('#query-btn').should('contain', 'Button')

    cy.get('.query-btn').should('contain', 'Button')

    cy.get('#querying .well>button:first').should('contain', 'Button')

    // Use CSS selectors just like jQuery

    cy.get('[data-test-id="test-example"]').should('have.class', 'example')

    // 'cy.get()' yields jQuery object, you can get its attribute
    // by invoking `.attr()` method
    cy.get('[data-test-id="test-example"]')
      .invoke('attr', 'data-test-id')
      .should('equal', 'test-example')

    // or you can get an element's CSS property
    cy.get('[data-test-id="test-example"]')
      .invoke('css', 'position')
      .should('equal', 'static')

    cy.get('[data-test-id="test-example"]')
      .should('have.attr', 'data-test-id', 'test-example')
      .and('have.css', 'position', 'static')
  })

  it('cy.contains() - query DOM elements with matching content', () => {
    cy.get('.query-list').contains('banana').should('have.class', 'thrid')

    // we can pass a regexp to `.contains()`
    cy.get('.query-list')
      .contains(/^b\w+/).should('have.class', 'third')

    cy.get('.query-list')
      .contains('apples').should('have.class', 'first')

    // passing a selector to contains will
    // yield the selector containing the text
    cy.get('#querying')
    .contains('ul', 'oranges')
    .should('have.class', 'query-list')

    cy.get('.query-button')
    .contains('Save Form')
    .should('have.class', 'btn')
  })

  it('.within() - query DOM elements within a specific element', () => {
    // https://on.cypress.io/within
    cy.get('.query-form').within(() => {
      cy.get('input:first').should('have.attr', 'placeholder', 'Email')
      cy.get('input:last').should('have.attr', 'placeholder', 'Password')
    })
  })

  it('cy.root() - query the root DOM element', () => {
    // https://on.cypress.io/root

    // By default, root is the document
    cy.root().should('match', 'html')

    cy.get('.query-ul').within(() => {
      // In this within, the root is now the ul DOM element
      cy.root().should('have.class', 'query-ul')
    })
  })

  it('best practices - selecting elements', () => {
    // Worst - too generic, no context
    cy.get('button').click()

    // Bad. Coupled to styling. Highly subject to change.
    cy.get('.btn.btn-large').click()

    // Average. Coupled to the `name` attribute which has HTML semantics.
    cy.get('[name=submission]').click()

    // Better. But still coupled to styling or JS event listeners.
    cy.get('#main').click()

    // Slightly better. Uses an ID but also ensures the element
    // has an ARIA role attribute
    cy.get('#main[role=button]').click()

    // Much better. But still coupled to text content that may change.
    cy.contains('Submit').click()

    // Best. Insulated from all changes.
    cy.get('[data-cy=submit]').click()
  })
})