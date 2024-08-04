describe('example to-do app', () => {
  beforeEach(() => {
    cy.visit("https://example.cypress.io/todo")
  });

  it("displays two todo items by default", ()=>{
    cy.get('.todo-list li').should("have.length", 2);

    cy.get('.todo-list li').first().should('have.text', 'Pay electric bill')
    cy.get('.todo-list li').last().should('have.text', 'Walk the dog')    
  });

  it('can add new todo items', () => {
    const newItem = 'Feed the cat';

    // add new todo item
    cy.get('[data-test=new-todo]').type(`${newItem}{enter}`);

    //
    cy.get('.todo-list li')
    .should('have.length', 3) // add new todo item successfully
    .last().should('have.text', newItem); // test that newItem
  });

  it('can check off an item as completed', () => {
    // check pay electric bill
    cy.contains('Pay electric bill')
    .parent().find('input[type=checkbox]').check();

    cy.contains('Pay electric bill').parents('li')
    .should('have.class','completed');
  });

  context('with a checked task', () => {
    beforeEach(() => {
      cy.contains('Pay electric bill').parent()
      .find('input[type=checkbox]').check();
    })

    it('can filter for uncompleted tasks', () => {
      // We'll click on the "active" button in order to
      // display only incomplete items
      cy.contains('Active').click();

      cy.get('.todo-list li').should('have.length', 1)
      .first().should('have.text', 'Walk the dog')

      cy.contains('Pay electric bill').should('not.exist')
    })

    it('can filter for completed tasks', () => {
      cy.contains('Completed').click()

      cy.get('.todo-list li')
        .should('have.length', 1)
        .first()
        .should('have.text', 'Pay electric bill')

      cy.contains('Walk the dog').should('not.exist')
    })

    it('can delete all completed tasks', () => {
      cy.contains('Clear completed').click()

      cy.get('.todo-list li')
      .should('have.length', 1)
      .should('not.have.text', 'Pay electric bill')

      cy.contains('Clear completed').should('not.exist')
    });
  })

  after(() => {
    cy.wait(5000);
  })
});