describe('Actions', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/actions')
  })

  it('.type() - type into a DOM element', () => {
    cy.get('.action-email').type('fake@email.com');
    cy.get('.action-email').should('have.value', 'fake@email.com');

    // .type() with special character sequences
    cy.get('.action-email').type('{leftarrow}{rightarrow}{uparrow}{downarrow}')
    cy.get('.action-email').type('{del}{selectall}{backspace}')

    // .type() with key modifiers
    cy.get('.action-email').type('{alt}{option}') //these are equivalent
    cy.get('.action-email').type('{ctrl}{control}') //these are equivalent
    cy.get('.action-email').type('{meta}{command}{cmd}') //these are equivalent
    cy.get('.action-email').type('{shift}')

    // Delay each keypress by 0.1 sec
    cy.get('.action-email').type('slow.typing@email.com', { delay: 100 })
    cy.get('.action-email').should('have.value', 'slow.typing@email.com')

    cy.get('.action-disabled')
    // Ignore error checking prior to type
    // like whether the input is visible or disabled
    .type('disabled error checking', { force: true })
    cy.get('.action-disabled').should('have.value', 'disabled error checking')
  })

  it('.focus() - focus on a DOM element', () => {
    cy.get('.action-focus').focus()
    cy.get('.action-focus').should('have.class', 'focus')
    .prev() // phan tu cung cap o truoc
    .should('have.attr', 'style', 'color: orange;');
  })

  it('.blur() - blur off a DOM element', () => {
    cy.get('.action-blur').type('About to blur')
    cy.get('.action-blur').blur()
    cy.get('.action-blur').should('have.class', 'error')
    .prev().should('have.attr', 'style', 'color: red;')
  })

  it('.clear() - clears an input or textarea element', () => {
    cy.get('.action-clear').type('Clear this text')
    cy.get('.action-clear').should('have.value', 'Clear this text')
    cy.get('.action-clear').clear()
    cy.get('.action-clear').should('have.value', '')
  })

  it('.submit() - submit a form', () => {
    cy.get('.action-form')
      .find('[type="text"]').type('HALFOFF')
      
    cy.get('.action-form').submit()
    cy.get('.action-form').next().should('contain', 'Your form has been submitted!')
  })

  it('.click() - click on a DOM element', () => {
    cy.get('.action-btn').click()

    // clicking in the center of the element is the default
    cy.get('#action-canvas').click()

    cy.get('#action-canvas').click('topLeft')
    cy.get('#action-canvas').click('top')
    cy.get('#action-canvas').click('topRight')
    cy.get('#action-canvas').click('left')
    cy.get('#action-canvas').click('right')
    cy.get('#action-canvas').click('bottomLeft')
    cy.get('#action-canvas').click('bottom')
    cy.get('#action-canvas').click('bottomRight')

    cy.get('#action-canvas')
    cy.get('#action-canvas').click(80, 75) // click 80px on x coord and 75px on y coord
    cy.get('#action-canvas').click(170, 75)
    cy.get('#action-canvas').click(80, 165)
    cy.get('#action-canvas').click(100, 185)
    cy.get('#action-canvas').click(125, 190)
    cy.get('#action-canvas').click(150, 185)
    cy.get('#action-canvas').click(170, 165)

    // click multiple elements by passing multiple: true
    cy.get('.action-labels>.label').click({ multiple: true })

    // Ignore error checking prior to clicking
    cy.get('.action-opacity>.btn').click({ force: true })
  })

  it('.dblclick() - double click on a DOM element', () => {
    cy.get('.action-div').dblclick()
    cy.get('.action-div').should('not.be.visible')
    cy.get('.action-input-hidden').should('be.visible')
  })

  it('.rightclick() - right click on a DOM element', () => {
    cy.get('.rightclick-action-div').rightclick()
    cy.get('.rightclick-action-div').should('not.be.visible')
    cy.get('.rightclick-action-input-hidden').should('be.visible')
  })

  it('.check() - check a checkbox or radio element', () => {
    cy.get('.action-checkboxes [type="checkbox"]').not('[disabled]').check()
    cy.get('.action-checkboxes [type="checkbox"]').not('[disabled]').should('be.checked')

    cy.get('.action-radios [type="radio"]').not('[disabled]').check()
    cy.get('.action-radios [type="radio"]').not('[disabled]').should('be.checked')

    cy.get('.action-radios [type="radio"]').check('radio1')
    cy.get('.action-radios [type="radio"]').should('be.checked')

    // .check() accepts an array of values
    cy.get('.action-multiple-checkboxes [type="checkbox"]').check(['checkbox1', 'checkbox2'])
    cy.get('.action-multiple-checkboxes [type="checkbox"]').should('be.checked')

    // Ignore error checking prior to checking
    cy.get('.action-checkboxes [disabled]').check({ force: true })
    cy.get('.action-checkboxes [disabled]').should('be.checked')

    cy.get('.action-radios [type="radio"]').check('radio3', { force: true })
    cy.get('.action-radios [type="radio"]').should('be.checked')
  })

  it('.uncheck() - uncheck a checkbox element', () => {
    
  })
})