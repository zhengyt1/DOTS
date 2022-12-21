describe('test registration of a user', () => {
  it('passes', () => {
    cy.visit('https://deployment-dots.herokuapp.com/register')
    // type in username and password
    cy.get('#email').type('testuser@example.com').should('have.value', 'testuser@example.com')
    cy.get('#password').type('111').should('have.value', '111')
    // click register button
    cy.get('button').contains('Register').click()
    // this brings the user to the home page
    cy.url().should('include', '/home')
    // logout
    cy.get('a[href="/"]').click()
    // delete user
    cy.request('DELETE', 'https://deployment-dots.herokuapp.com/test/user')
  })
})