const URL = 'http://127.0.0.1:8080/memotest.html';
const URL2 = 'http://192.168.0.23:8080/memotest.html';
let NUMERO_CUADROS = 16;

context('Configuración inicial', () => {
    beforeEach(() => {
        cy.visit(URL);
    });

    it('Se asegura de que haya un tablero con cuadros', () => {     
      cy.get('#tablero').find('.ficha').should('have.length', NUMERO_CUADROS);
    });

    it('Se asegura de que los cuadros sean aleatorios', () => {
      let fichasOriginales = [];
      let fichasNuevas = [];

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

context('Resolución del juego: clic erróneo', () => {
  before(() => {
    cy.visit(URL);
  });

  let mapaPares, arrayIdPares;

  it('Elige dos fichas no coincidentes', () => {
    let cuadros = cy.get('.ficha');

    cuadros.then((fichas) => {
      mapaPares = obtenerMapaDePares(fichas);
      arrayIdPares = Object.values(mapaPares);
      cy.get(arrayIdPares[0][0]).click();
      cy.get(arrayIdPares[1][0]).click();

      cy.get('.ficha').should('have.length', NUMERO_CUADROS);
    })
  });
});

context('Resolución del juego: clic correcto', () => {
  before(() => {
    cy.visit(URL);
  });

  let mapaPares, arrayIdPares;

  it('Resuelve el juego', () => {
    
    cy.get('.ficha').then((fichas) => {
      mapaPares = obtenerMapaDePares(fichas);
      arrayIdPares = Object.values(mapaPares);

      arrayIdPares.forEach((par) => {
        cy.get(par[0]).click();
        cy.get(par[1]).click();
      });

      cy.get('.ficha').should('have.length', 0);
    });
  });
});

function obtenerMapaDePares(cuadros){
  let pares = {};

  cuadros.each((i, elemento) => {
     const idColor = elemento.id;

     if(pares[idColor]){
      pares[idColor].push(elemento);
     } else {
      pares[idColor] = [elemento];
     }
  });

  return pares;
}
