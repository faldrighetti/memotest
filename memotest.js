let rondas = 0;
let arrayColores = ['rojo','azul','verde','amarillo','violeta','naranja','rosa','celeste'];
arrayColores = arrayColores.concat(arrayColores);
const tablero = document.querySelectorAll('.ficha');
let tableroNuevo = Array.from(tablero);
let clics = 0;
let botonesOprimidos = [];

function manejarClic (evento){
    clics++;
    let botonOprimido = evento.target;
    mostrarColor(botonOprimido);
    botonesOprimidos.push(botonOprimido);

    if (clics === 2) {
        if(botonesOprimidos[0].id == botonesOprimidos[1].id && botonesOprimidos[0].name !== botonesOprimidos[1].name){
            destaparPareja(botonesOprimidos[0], botonesOprimidos[1]);
            tableroNuevo.splice(botonesOprimidos[0],1);
            tableroNuevo.splice(botonesOprimidos[1],1);
            rondas++;
        } else if(botonesOprimidos[0].name == botonesOprimidos[1].name){
            ocultarTodosLosColores();
        } else{
            rondas++;
            setTimeout(function(){
                ocultarTodosLosColores();
            }, 1000)
        }
        clics = 0;
        botonesOprimidos = [];
    }
    ganarPartida();
}

function destaparPareja(cuadro1, cuadro2){
    cuadro1.classList.remove("ficha");
    cuadro2.classList.remove("ficha");
    cuadro1.classList.add('descubierto');
    cuadro2.classList.add('descubierto'); 
}

tablero.forEach(function(ficha){
    ficha.onclick = manejarClic;    
})

tablero.forEach(element => {
    let sorteado = Math.floor(Math.random() * arrayColores.length);
    let color = arrayColores[sorteado];
    element.classList.add(color);
    element.id = color;
    //Con esto el elemento adquiere el id de su color. Cuando se borre la clase,
    //seguirá teniendo el id que lo vincule con el color
    ocultarColor(element, color);
    arrayColores.splice(sorteado,1);
});

function ocultarColor(cuadro, color){
    cuadro.classList.remove(color);
    cuadro.classList.add('tapado');
}

function mostrarColor(cuadro){
    cuadro.classList.remove('tapado');
    cuadro.classList.add(cuadro.id);
}

function descubrirFicha(elemento){
    elemento.classList.remove('tapado');
}

function ocultarTodosLosColores(){
    tablero.forEach(element => {
        if(!element.classList.contains('descubierto')){
            let color = element.id;
            ocultarColor(element, color);
        }
    });
}

function ganarPartida(){
    if(!tableroNuevo.length){
        ocultarTablero();
        escribirVictoria();
    }   
}

function ocultarTablero(){
    const $tablero = document.querySelector('#tablero');
    $tablero.className = 'oculto';
}

function escribirVictoria(){
    const mensaje = document.createElement('p');
    const $resultado = document.querySelector('#resultado');
    $resultado.className = '';
    mensaje.textContent = "¡Ganaste la partida en " + rondas + " rondas!"
    $resultado.appendChild(mensaje);
}
