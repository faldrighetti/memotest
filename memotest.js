//SI Poner x imágenes en un array y duplicarlas.
//SI Ubicarlas aleatoriamente antes de empezar la partida
//Asignarles clase tapado y que con el clic se remueva esa clase
//Si las fichas cliqueadas coinciden, se remueve la clase ficha para ellas, pero se mantiene el color. Sino, se ocultan.
//Que al final del juego salga un botón que diga "Volver a jugar" y recargue la página

let rondas = 0;
let arrayColores = ['rojo','azul','verde','amarillo','violeta','naranja','rosa','celeste'];
arrayColores = arrayColores.concat(arrayColores);
const tablero = document.querySelectorAll('.ficha');
let coloresPresionados = [];

tablero.forEach(element => {
    let sorteado = Math.floor(Math.random() * arrayColores.length);
    let color = arrayColores[sorteado];
    element.classList.add(color);
    //Con esto el elemento adquiere la clase de su color
    element.id = color;
    //Con esto el elemento adquiere el id de su color. Cuando se borre la clase,
    //seguirá teniendo el id que lo vincule con el color

    ocultarColor(element, color); //Ahora todas las fichas están sin clase color y con clase tapado
    arrayColores.splice(sorteado,1);
});

function jugar(){
    manejarTurno();
    ganarPartida();
}

function manejarTurno(){
    tablero.forEach(function(ficha){
        ficha.onclick = manejarClic;
    });

    if(coloresPresionados.length === 2){
        mostrarColor(coloresPresionados[1]);
        compararClics(coloresPresionados);
    }   
}

function ganarPartida(){
    if (!tablero.length){
        alert('Ganaste! Te tomó ' + rondas + ' rondas.'); //mejorar esto
    }
}

function ocultarColor(cuadro, color){
    cuadro.classList.remove(color);
    cuadro.classList.add('tapado');
}

function mostrarColor(cuadro){
    cuadro.classList.remove('tapado');
    cuadro.classList.add(cuadro.id);
}

function manejarClic(evento){
    const botonOprimido = evento.target;
    console.log(botonOprimido.id);
    mostrarColor(botonOprimido);
    coloresPresionados.push(botonOprimido.id);
    console.log(coloresPresionados.length);

    return botonOprimido.id;
}

function compararClics(array){
    const boton1 = array[0];
    const boton2 = array[1];

    if (boton1 === boton2){
        boton1.classList.remove('ficha');
        boton1.classList.add('emparejado');
        boton1.classList.add(boton1.id);
        
        boton2.classList.remove('ficha');
        boton2.classList.add('emparejado');
        boton2.classList.add(boton2.id);
    } else {
        ocultarTodosLosColores();
    }
    rondas++;
    coloresPresionados = [];
}

function ocultarTodosLosColores(){
    tablero.forEach(element => {
        let color = element.id;
        setTimeout(function(){
            ocultarColor(element, color);
        },1000);
    });
}

jugar();

/*

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
