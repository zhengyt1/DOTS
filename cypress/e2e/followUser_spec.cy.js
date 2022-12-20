describe('test user login and follow an user', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')
    // type in username and password
    cy.get('#email').type('Francis2@gmail.com').should('have.value', 'Francis2@gmail.com')
    cy.get('#password').type('111').should('have.value', '111')
    // click login button
    cy.get('button').contains('Login').click()
    cy.url().should('include', '/home')
    // go to profile of user with id=6377e1b64661a1bbf54d80b2
    cy.get('#searchBox').type('a')
    cy.get('a[href*="/profile/6377e1b64661a1bbf54d80b2"]').click()
    // click on follow
    cy.get('button').contains('Follow').click()
    // make sure the button becomes Unfollow
    cy.get('button').contains('Unfollow')
    // unfollow the user
    cy.get('button').contains('Unfollow').click()
  })
})