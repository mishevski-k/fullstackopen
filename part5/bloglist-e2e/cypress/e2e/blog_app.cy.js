describe('Blog app', function(){
  beforeEach(function(){
    cy.request('POST', 'http://localhost:3003/api/v1/testing/reset');
    cy.visit('http://localhost:5173');
  });

  it('Login form is show', function(){
    cy.contains('login');
  })
});