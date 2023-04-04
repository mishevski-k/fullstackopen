describe('Note app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = {
      name: 'Kiril Mishevski',
      username: 'mishevski-k',
      password: 'sudo'
    };
    cy.request('POST', 'http://localhost:3001/api/users', user);
    cy.visit('http://localhost:5173');
  });

  it('front page can be opened', function() {
    cy.contains('Notes');
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2023');
  });

  it('user can log in', function() {
    cy.contains('login').click()
    cy.get('#username').type('mishevski-k')
    cy.get('#password').type('sudo')
    cy.get('#login-button').click()

    cy.contains('Kiril Mishevski logged in')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.contains('login').click()
      cy.get('input:first').type('mishevski-k')
      cy.get('input:last').type('sudo')
      cy.get('#login-button').click()
    })

    it('a new note can be created', function() {
      cy.contains('new note').click()
      cy.get('input').type('a note created by cypress')
      cy.get('#save-note-btn').click()
      cy.contains('a note created by cypress')
    })
  })

})