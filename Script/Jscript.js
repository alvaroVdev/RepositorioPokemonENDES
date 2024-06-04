// Este array será utilizado en la función getAleatorio () más tarde.
var contadores = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
// Creamos el elemento tabla y lo introducimos en la etiqueta main del HTML.
var tabla1 = document.createElement("table");
document.getElementById("tablero").appendChild(tabla1);
// Ahora hacemos un bucle que añada las filas que vayamos a necesitar. Nuestra tabla tendrá 5 filas.
for (let i = 0; i < 5; i++) {
    var fila = document.createElement("tr");
    fila.setAttribute("id",("fila" + i));
    document.getElementById("tablero").children[0].appendChild(fila);
}
/* Hacemos un bucle que añada las columnas de cada fila. Cada fila tendrá 6 celdas y dentro de ella un botón. 
Dentro del botón habrá una imagen generada aleatoriamente. */
for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 6; j++) {
        // Se generan las celdas, se les da un id y se añaden a las filas.
        var celda = document.createElement("td");
        celda.setAttribute("id",("f" + i + "c" + j));
        document.getElementById("fila" + i).appendChild(celda);
        /* Se generan los botones, se les da un id, se les indica la función que ejecutarán 
        cuando sean pulsados y se añaden a cada celda. */
        var boton = document.createElement("button");
        boton.setAttribute("id",(i+"bot"+j));
        boton.setAttribute("onclick","comparaCartas(" + i + "," + j + ")");
        document.getElementById("f" + i + "c" + j).appendChild(boton);
        /* Aquí se establece que el ratón cambie cuando pase por encima del botón y se genera una imagen aleatoria como
        fondo de cada botón utilizando la función getAleatorio (). Todas las fotos se llaman igual menos por el número,
        que será lo que nos de el método. */
        document.getElementById(i+"bot"+j).style.cursor = "pointer";
        document.getElementById(i+"bot"+j).style.backgroundImage= "url(Imagenes/pok" + getAleatorio() + ".jpg)";
        /* Se añade un div dentro de cada botón. Este div se usa para esconder las cartas mientras el usuario no las haya pulsado
        o si no las ha acertado. Esto se encarga de gestionarlo la función comparaCartas. */
        var tapa = document.createElement("div");
        tapa.setAttribute("id",(i+"tapa"+j));
        document.getElementById(i+"bot"+j).appendChild(tapa);
    }
}
/* Este método devuelve un número random que no puede salir más de dos veces. Para ello utiliza el array de contadores 
creado al principio del script. */
function getAleatorio () {
    var ctrl1 = false;
    var resultado;
    do {
        // Este math random genera números del 0 al 14.
        var numRandom = parseInt(Math.random() * 15);
        /* Si la posición del array de contadores es menor que 2, entonces se acepta el número generado automáticamente. 
        Si es igual a dos, se vuelve a repetir el bucle hasta que salga un número cuyo contador sea menor que 2, es decir,
        que no haya salido ya 2 veces. */
        if (contadores[numRandom] < 2) {
            // Al número aleatorio resultado hay que sumarle 1 porque las imágenes están numeradas del 1 al 15.
            resultado = numRandom + 1;
            // Cada vez que se acepta un resultado, se suma 1 a la posición del array que controla ese resultado.
            contadores[numRandom]++;
            ctrl1 = true;
        }
    } while (ctrl1 === false);
    return resultado;
}
// Función que compara cartas y deja al descubierto las que coinciden.
var ctrl2 = 0; // Servirá para controlar cuantas cartas se han destapado.
var carta1;
var carta2;
function comparaCartas (i,j) {
    // Se destapa la primera carta y se almacena su id en carta1.
    if (ctrl2 === 0) {
        document.getElementById(i+"tapa"+j).style.display = "none";
        carta1 = i+"bot"+j;
        ctrl2++;
    // Se destapa la segunda carta y se almacena su id en carta2.
    } else if (ctrl2 === 1) {
        document.getElementById(i+"tapa"+j).style.display = "none";
        carta2 = i+"bot"+j;
        ctrl2++;
    }
    /* Si ya hay dos cartas destapadas y de estas coinciden las imágenes, estas se dejan destapadas. Además hay que 
    considerar que si se pulsa dos veces la misma carta, su imagen será igual y se estaría engañando al programa, 
    por lo que hay que añadir la codición de que los id de estos botones no sean iguales. */
    if (ctrl2 == 2 && document.getElementById(carta1).style.backgroundImage == document.getElementById(carta2).style.backgroundImage && carta1 != carta2) {
        ctrl2 = 0;
    } else if (ctrl2 == 2) {
        // Si las cartas no son iguales se vuelven a tapar después de 0.6 segundos.
        setTimeout(function () {
            document.getElementById(carta1).children[0].style.display = "block";
            document.getElementById(carta2).children[0].style.display = "block";
        }, 600);
        ctrl2 = 0;
    }
}