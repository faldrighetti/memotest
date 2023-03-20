//SI Poner x imágenes en un array y duplicarlas.
//SI Ubicarlas aleatoriamente antes de empezar la partida
//Asignarles clase tapado y que con el clic se remueva esa clase
//Si las fichas cliqueadas coinciden, se remueve la clase ficha para ellas, pero se mantiene el color. Sino, se ocultan.
//Que al final del juego salga un botón que diga "Volver a jugar" y recargue la página

let rondas = 0;
let arrayColores = ['rojo','azul','verde','amarillo','violeta','naranja','rosa','celeste'];
arrayColores = arrayColores.concat(arrayColores);
const tablero = document.querySelectorAll('.ficha');
let clics = 0;
let botonesOprimidos = [];

function manejarClic (evento){
    clics++;
    let botonOprimido = evento.target;
    mostrarColor(botonOprimido);
    botonesOprimidos.push(botonOprimido);

    if (clics === 2) {
        console.log(botonesOprimidos);
        if(botonesOprimidos[0].id == botonesOprimidos[1].id && botonesOprimidos[0].name !== botonesOprimidos[1].name){
            console.log("Encontraste una pareja!!");
            destaparPareja(botonesOprimidos[0], botonesOprimidos[1]);
            let tableroNuevo = Array.from(tablero);
            tableroNuevo.splice(botonesOprimidos[0],1);
            tableroNuevo.splice(botonesOprimidos[1],1);
            console.log(tableroNuevo.length + " length");
            rondas++;
            ganarPartida();
                    //Tengo que destapar definitivamente el color encontrado antes de llamar a esta función.
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
    console.log(clics);
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
    //Con esto el elemento adquiere la clase de su color
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

//Cuando se encuentre una pareja de fichas, sacarles la clase ficha para que no se oculten luego,
//y que solo tengan la de su color

//Idea: const cliqueados = document.querySelectorAll ('.cliqueados'). If cliqueados[0].id === cliqueados[1].id = ganamos.

function ocultarTodosLosColores(){
    tablero.forEach(element => {
        if(!element.classList.contains('descubierto')){
            let color = element.id;
            ocultarColor(element, color);
        }
    });
}

/*
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

function ganarPartida(){
    let descubiertos = document.querySelectorAll('.descubierto');
    if(!tablero.length){
        console.log("Ganaste en " + rondas + " rondas");
    }
}
