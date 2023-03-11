//Poner x imágenes en un array y duplicarlas.
//Ubicarlas aleatoriamente antes de empezar la partida
//Asignarles clase tapado y que con el clic se remueva esa clase
//Si el id de las imágenes cliqueadas coincide, se remueve la clase tapada para esa imagen. Sino, se ocultan.
//Que al final del juego salga un botón que diga "Volver a jugar" y recargue la página

let arrayColores = ['rojo','azul','verde','amarillo','violeta','naranja','rosa','celeste'];
arrayColores = arrayColores.concat(arrayColores);
const tablero = document.querySelectorAll('.ficha');

tablero.forEach(element => {
    let sorteado = Math.floor(Math.random() * arrayColores.length);
    element.classList.add(arrayColores[sorteado]);
    arrayColores.splice(sorteado,1);
    console.log(arrayColores);
});

/*
function mezclarFichas(){
    const arrayImagenes = [imagen1, imagen2, ...]
    const arrayJuego = arrayImagenes.concat(arrayImagenes)
    hacer un shuffle con arrayJuego
    ubicar las fichas en cada botón
}

function manejarTurno(){
}

function manejarClic(){
    boton.onclick = remover clase tapado
    if(document.querySelectorAll('.descubierto').length === 2){
        if (boton.id === boton2.id) {
            boton.classList.remove('tapado')
            boton2.classList.remove('tapado')
        } else {
            boton.classList.add('tapado')
            boton2.classList.add('tapado')
        }
    }
}

mezclarFichas()
manejarTurno()
*/
