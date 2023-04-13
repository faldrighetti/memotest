const URL = 'http://127.0.0.1:8080/memotest.html';
const URL2 = 'http://192.168.0.23:8080/memotest.html';
let NUMERO_CUADROS = 16;

context('Configuración inicial', () => {
    beforeEach(() => {
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

          expect(fichasOriginales).to.not.equal, fichasNuevas;

        });
      });
    });
});

context('Resolución del juego', () => {

  beforeEach(() => {
    cy.visit(URL);
  });

  //Test 3
  it('Resuelve el juego', () => {
    

  });

  //Test 4
  /*it('HACERSe asegura de que se vean las parejas descubiertas', () => {
    let cantidadFichas = cy.get('.ficha');
    let clic1 = cy.get('button').click();
    cy.get(clic1)
    let clic2 = cy.get('button').click();
    cantidadFichas.should('have.length', NUMERO_CUADROS - 2);
  });*/
    
})
