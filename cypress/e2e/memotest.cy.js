/*describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })
})*/

//No puedo entrar a una URL desde el servidor
//Ver si puedo abrir un servidor para darle una URL donde testear o si puedo hacerlo desde el archivo en la pc local
//Sino, puedo intentarlo en el deploy de GitHub Pages.

const URL = 'http://www.google.com'; //Acá va la URL

context('memotest', () => {
    before(() => {
        cy.visit(URL);
    })

    it('tests', () => {})
    
})