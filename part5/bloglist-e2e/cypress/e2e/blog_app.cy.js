describe('Blog app', function(){
  beforeEach(function(){
    cy.request('POST', 'http://localhost:3003/api/v1/testing/reset');
    const user = {
      username: 'root',
      password: 'sudo',
      name: 'Admin',
    };
    cy.request('POST', 'http://localhost:3003/api/v1/users', user);
    cy.visit('http://localhost:5173');
  });

  it('Login form is show', function(){
    cy.contains('login');
  })

  describe('Login', function() {
    it('succeeds with the correct credentials', function(){
      cy.get('#user-username').type('root');
      cy.get('#user-password').type('sudo');
      cy.get('#user-login').click();
      cy.contains('Welcome back');
      cy.contains('Admin logged in');
    });

    it('fails with wrong credentials', function(){
      cy.get('#user-username').type('fake');
      cy.get('#user-password').type('sudo');
      cy.get('#user-login').click();
      cy.contains('Username or password dont match')
      cy.contains('login');
    });
  });

  describe('When logged in', function() {
    beforeEach(function(){
      cy.get('#user-username').type('root');
      cy.get('#user-password').type('sudo');
      cy.get('#user-login').click();
    });

    it('A blog can be created', function(){
      cy.contains('new blog').click();
      cy.get('#blog-title').type('Testing title');
      cy.get('#blog-author').type('Admin');
      cy.get('#blog-url').type('localhost');
      cy.get('#blog-create').click();
      cy.contains('Testing title Admin');
    });
  });
});