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

let manejarClic = (evento) => {

    //ocultarTodosLosColores(); //esta función oculta el color y le da la clase tapado a todos los elementos del tablero
    //Es decir, los que tienen clase ficha

    //Retirar de array para que no se oculte al hacer clic en la segunda ficha.
    //Si no coinciden, llevarla de vuelta al array. Todo esto removiendo y asignando la clase.
    //Podría llamar dos o tres veces a la función. La inicial, la del segundo clic (hace lo mismo pero ya sin la 
    //del primer botón) y una última si no coinciden, para reestablecerlas. 

    clics++;

    let botonOprimido1 = evento.target;
    mostrarColor(botonOprimido1);
    console.log(botonOprimido1.name);
    botonOprimido1.classList.replace("ficha", "descubierto");
    botonesOprimidos.push(botonOprimido1);

    if (clics === 2) {
        console.log(botonesOprimidos);
        if(botonesOprimidos[0].id == botonesOprimidos[1].id){
            console.log("Encontraste una pareja!!");
            //Tengo que destapar definitivamente el color encontrado antes de llamar a esta función.
            ocultarTodosLosColores();
            clics = 0;
            botonesOprimidos = [];
        } else{
            ocultarTodosLosColores();
            clics = 0;
            botonesOprimidos = [];
        }
    }

    /*let botonOprimido2 = evento.target;
    mostrarColor(botonOprimido2);
    botonOprimido2 = botonOprimido2.id;
    console.log(botonOprimido2);*/
    
    if(clics === 1){
        manejarClic = null;
    }
    console.log(clics)
    return botonOprimido1.id;
    //Hay un problema: Sigue permitiendo hacer clics que muestran el color más de una vez
}


tablero.forEach(function(ficha){
    if (!manejarClic){
        ficha.onclick = manejarClic2;
    }
    else{
        ficha.onclick = manejarClic; 
    }
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


function manejarClic2(evento, estado = false){
    if(!estado){
        ocultarTodosLosColores();
        const botonOprimido2 = evento.target;
        mostrarColor(botonOprimido2);
        console.log(botonOprimido2.id + ' segundo');
        estado = true;
        return botonOprimido2.id;
    }
}

function descubrirFicha(elemento){
    elemento.classList.remove('tapado');
}

//Cuando se encuentre una pareja de fichas, sacarles la clase ficha para que no se oculten luego,
//y que solo tengan la de su color

//Idea: while disponibles (o sea, no tapados) > 14, manejar clic:
//const cliqueados = document.querySelectorAll ('.cliqueados'). If cliqueados[0].id === cliqueados[1].id = ganamos.

function ocultarTodosLosColores(){
    tablero.forEach(element => {
        let color = element.id;
        ocultarColor(element, color);
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
