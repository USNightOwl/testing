describe('My First Test', () => {
  it('Does not do much!', () => {
    cy.visit('http://localhost:3000/testing-cypress/')

    cy.wait(3000)
    cy.contains('Baitaptracnghiem')
  })
})