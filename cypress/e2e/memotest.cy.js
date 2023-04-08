const URL = 'http://127.0.0.1:8081/memotest.html';
const URL2 = 'http://192.168.0.23:8081/memotest.html';
const NUMERO_CUADROS = 16;

context('memotest', () => {
    before(() => {
        cy.visit(URL);
    });

    //Test 1
    it('Se asegura de que haya un tablero con cuadros', () => {     
      cy.get('#tablero').find('.ficha').should('have.length', NUMERO_CUADROS);
    });

    //Test 2
    it('Se asegura de que los cuadros sean aleatorios', () => {
      let fichasOriginales = [];
      let fichasNuevas = [];
      cy.wait(1000);

      cy.get('button').then(cuadros => {
        
        cuadros.each(function(cuadro) {
          fichasOriginales.push(cuadro.id);
        });

        cy.visit(URL);

        cy.get('button').then(cuadros => {
          cuadros.each(function(cuadro) {
            fichasNuevas.push(cuadro.id);
          });

          cy.wrap(fichasOriginales).should('not.deep.equal', fichasNuevas);

        });
      });
    });

    //Test 3
    /*it('Se asegura de que se vuelvan a tapar las fichas después de un clic erróneo', () => {

    });*/


    //Test 4
    /*it('Se asegura de que se vean las parejas descubiertas', () => {

    });*/
  
});
