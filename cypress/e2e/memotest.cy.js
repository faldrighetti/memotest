const URL = 'http://127.0.0.1:8080/memotest.html';
const URL2 = 'http://192.168.0.23:8080/memotest.html';
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
    /*it('Se asegura de que los cuadros sean aleatorios', () => {
      let fichasOriginales = [];
      let fichasNuevas = [];
      cy.get('.ficha').then((cuadros) => {
        
        cuadros.each(function(i, cuadro) {
          fichasOriginales.push(cuadro.id);
        });

        cy.visit(URL);

        cy.get('.ficha').then((cuadros) => {
          cuadros.each(function(i, cuadro) {
            fichasNuevas.push(cuadro.id);
          });

          cy.wrap(fichasOriginales).should('not.deep.equal', fichasNuevas);

        });
      });
    });*/

    //Test 3
    /*it('Se asegura de que se vuelvan a tapar las fichas después de un clic erróneo', () => {

    });*/


    //Test 4
    /*it('Se asegura de que se vean las parejas descubiertas', () => {

    });*/

    it('se asegura que los cuadros sean aleatorios', () => {
      cy.get('button').then((cuadros) => {
        let clasesOriginales = [];
        cuadros.each(function(i, cuadro) {
          clasesOriginales.push(cuadro.id);
        });

        cy.visit(URL2);

        let clasesNuevas = [];
        cy.get('button').then(nuevosCuadros => {
          nuevosCuadros.each(function(i, cuadro) {
            clasesNuevas.push(cuadro.id);
          });

          cy.wrap(clasesOriginales).should('not.deep.equal', clasesNuevas);
        });
      });
      

    });
  
});
