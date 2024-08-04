describe('My First Test', () => {
  it('Does not do much!', () => {
    cy.visit('https://usnightowl.github.io/testing-cypress/')

    cy.wait(1000)
    cy.contains('Baitaptracnghiem')
  })
})