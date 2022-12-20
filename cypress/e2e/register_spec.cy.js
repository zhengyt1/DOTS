describe('test registration of a user', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/register')
    // type in username and password
    cy.get('#email').type('Francis2@gmail.com').should('have.value', 'Francis2@gmail.com')
    cy.get('#password').type('111').should('have.value', '111')
    // click register button
    cy.get('button').contains('Register').click()
    // this brings the user to the home page
    cy.url().should('include', '/home')
  })
})