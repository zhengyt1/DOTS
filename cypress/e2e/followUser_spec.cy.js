describe('test user login and follow an user', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')
    // type in username and password
    cy.get('#email').type('2@2.com').should('have.value', '2@2.com')
    cy.get('#password').type('222').should('have.value', '222')
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