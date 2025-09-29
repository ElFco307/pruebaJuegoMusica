class Canciones {
    constructor(nombre, artista, año, direccion) {
        this.nombre = nombre;
        this.artista = artista;
        this.año = año;
        this.direccion = direccion;
    }
}

const listaCanciones = [
    new Canciones("I Will Survive", "Gloria Gaynor", 1978, "songs/Song 1 - I Will Survive.mp3"),
    new Canciones("Happy", "Pharrell Williams", 2013, "songs/Song 2 - Happy.mp3"),
    new Canciones("El ratón vaquero", "Cri Cri", 1944, "songs/Song 3 - El Raton Vaquero.mp3"),
    new Canciones("Buenos días señor sol", "Juan Gabriel", 1974, "songs/Song 4 - Buenos dias señor sol.mp3"),
    new Canciones("Como la flor", "Selena", 1992, "songs/Song 5 - Como la flor.mp3"),
    new Canciones("Color Esperanza", "Diego Torres", 2001, "songs/Song 6 - Color esperanza.mp3"),
    new Canciones("Corazón partío", "Alejandro Sanz", 1997, "songs/Song 7 - Corazón Partio.mp3"),
    new Canciones("Rhenné", "Lara Campos", 2020, "songs/Song 8 - Rhenne.mp3"),
    new Canciones("La patita Lulú", "Tatiana", 2004, "songs/Song 9 - La patita lulu.mp3"),
    new Canciones("La vida es un carnaval", "Celia Cruz", 1998, "songs/Song 10 - La vida es un carnaval.mp3"),
    new Canciones("Todo cambió", "Camila", 2006, "songs/Song 11 - Todo cambio.mp3"),
    new Canciones("De música ligera", "Soda Stereo", 1990, "songs/Song 12 - De musica ligera.mp3"),
    new Canciones("La Bikina", "Luis Miguel", 1997, "songs/Song 13 - La bikina.mp3"),
    new Canciones("Azul", "Cristian Castro", 2001, "songs/Song 14 - Azul.mp3"),
    new Canciones("Vuela Vuela", "Magneto", 1991, "songs/Song 15 - Vuela vuela.mp3"),
    new Canciones("Claridad", "Menudo", 1981, "songs/Song 16 - Claridad.mp3"),
    new Canciones("Si no te hubieras ido", "Marco Antonio Solís", 2001, "songs/Song 17 - Si No Te Hubieras Ido.mp3"),
    new Canciones("Libre soy", "Frozen", 2013, "songs/Song 18 - Libre soy.mp3"),
    new Canciones("Hakuna Matata", "Rey León", 1994, "songs/Song 19 - Hakuna matata.mp3"),
    new Canciones("La chica de humo", "Emmanuel", 1989, "songs/Song 20 - La chica de humo.mp3"),
    new Canciones("Bidi Bidi Bom Bom", "Selena", 1994, "songs/Song 21 - Bidi Bidi Bom Bom.mp3"),
    new Canciones("La calle de las sirenas", "Kabah", 1996, "songs/Song 22 - La Calle de las Sirenas.mp3"),
    new Canciones("Querida", "Juan Gabriel", 1984, "songs/Song 23 - Querida.mp3"),
    new Canciones("Sapito", "Belinda", 2003, "songs/Song 24 - El Baile Del Sapito.mp3"),
    new Canciones("Tu amigo fiel", "Toy Story", 1995, "songs/Song 25 - Yo Soy Tu Amigo Fiel.mp3"),
    new Canciones("Mi persona favorita", "Rio Roma", 2019, "songs/Song 26 - Mi Persona Favorita.mp3"),
    new Canciones("No se habla de Bruno", "Encanto", 2021, "songs/Song 27 - No Se Habla De Bruno.mp3")
    
];

function barajar(array) {
    const copia = [...array];
    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
}

const seleccionadas = barajar(listaCanciones).slice(0, 5);
let indice = 0;
let puntos = 0;

let temporizador;
let progresoAnimado;

const audio = document.getElementById("audio");
const opcionesDiv = document.getElementById("opciones");
const formulario = document.getElementById("formulario");
const iniciarBtn = document.getElementById("iniciarBtn");
const juegoDiv = document.getElementById("juego");
const artistaActual = document.getElementById("artistaActual");
const progreso = document.getElementById("progreso");
const contador = document.getElementById("contador");
const barra = document.getElementById("progresoTiempo");

// Modales
const modal = document.getElementById("modalMensaje");
const textoModal = document.getElementById("textoModal");
const botonCerrar = document.getElementById("cerrarModal");

const modalFinal = document.getElementById("modalFinal");
const textoFinal = document.getElementById("textoFinal");
const cerrarFinal = document.getElementById("cerrarFinal");

const modalTiempo = document.getElementById("modalTiempo");
const cerrarTiempo = document.getElementById("cerrarTiempo");

function obtenerOpciones(correcta) {
    const nombres = listaCanciones.map(c => c.nombre).filter(n => n !== correcta);
    const opciones = barajar(nombres).slice(0, 3);
    opciones.push(correcta);
    return barajar(opciones);
}

function reproducirDesdeAleatorio(audioElement) {
    audioElement.addEventListener("loadedmetadata", () => {
        const opciones = [1 / 3, 1 / 2, 2 / 3];
        const aleatorio = opciones[Math.floor(Math.random() * opciones.length)];
        audioElement.currentTime = audioElement.duration * aleatorio;
        audioElement.play();
    }, { once: true });
}

function iniciarTemporizador() {
    let tiempoRestante = 10;
    let porcentaje = 0;
    barra.style.width = "0%";

    clearTimeout(temporizador);
    clearInterval(progresoAnimado);

    progresoAnimado = setInterval(() => {
        porcentaje += 10;
        barra.style.width = `${porcentaje}%`;
    }, 1000);

    temporizador = setTimeout(() => {
        barra.style.width = "100%";
        audio.pause();

        modalTiempo.classList.add("show");
        modalTiempo.style.display = "flex";
    }, 10000);
}

function mostrarPregunta() {
    const cancionActual = seleccionadas[indice];
    audio.src = cancionActual.direccion;
    audio.load();
    reproducirDesdeAleatorio(audio);

    progreso.textContent = `Canción ${indice + 1}/5`;
    artistaActual.textContent = `🎤 Artista: ${cancionActual.artista}`;

    const opciones = obtenerOpciones(cancionActual.nombre);
    opcionesDiv.innerHTML = "";

    opciones.forEach(opcion => {
        const label = document.createElement("label");
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "opcion";
        radio.value = opcion;
        label.appendChild(radio);
        label.appendChild(document.createTextNode(" " + opcion));
        opcionesDiv.appendChild(label);
        opcionesDiv.appendChild(document.createElement("br"));
    });

    juegoDiv.classList.remove("fade-in", "fade-out");

    iniciarTemporizador();
}

formulario.addEventListener("submit", function (e) {
    e.preventDefault();

    clearTimeout(temporizador);
    clearInterval(progresoAnimado);
    barra.style.width = "0%";

    const seleccionada = document.querySelector('input[name="opcion"]:checked');
    if (!seleccionada) {
        alert("Selecciona una opción.");
        return;
    }

    audio.pause();
    const respuesta = seleccionada.value;
    const correcta = seleccionadas[indice].nombre;

    if (respuesta === correcta) {
        textoModal.textContent = "🎉 ¡MUY BIEN!";
        puntos += 20;
    } else {
        textoModal.textContent = "❌ ¡NOOOO, ESA NO ES :(";
    }

    modal.classList.add("show");
    modal.style.display = "flex";
});

botonCerrar.onclick = () => {
    modal.classList.remove("show");
    setTimeout(() => {
        modal.style.display = "none";
        indice++;

        if (indice < seleccionadas.length) {
            juegoDiv.classList.remove("fade-in");
            juegoDiv.classList.add("fade-out");

            setTimeout(() => {
                mostrarPregunta();
                juegoDiv.classList.remove("fade-out");
                juegoDiv.classList.add("fade-in");
            }, 400);
        } else {
            textoFinal.textContent = `🎵 Juego terminado. Tu puntaje fue de ${puntos} puntos.`;
            modalFinal.classList.add("show");
            modalFinal.style.display = "flex";
        }
    }, 400);
};

cerrarFinal.onclick = () => {
    modalFinal.classList.remove("show");
    setTimeout(() => {
        modalFinal.style.display = "none";
        location.reload();
    }, 400);
};

cerrarTiempo.onclick = () => {
    modalTiempo.classList.remove("show");
    setTimeout(() => {
        modalTiempo.style.display = "none";
        indice++;

        if (indice < seleccionadas.length) {
            mostrarPregunta();
        } else {
            textoFinal.textContent = `🎵 Juego terminado. Tu puntaje fue de ${puntos} puntos.`;
            modalFinal.classList.add("show");
            modalFinal.style.display = "flex";
        }
    }, 400);
};

iniciarBtn.addEventListener("click", () => {
    iniciarBtn.style.display = "none";
    contador.style.display = "block";

    let cuenta = 3;
    contador.textContent = cuenta;

    const intervalo = setInterval(() => {
        cuenta--;
        if (cuenta > 0) {
            contador.textContent = cuenta;
        } else {
            clearInterval(intervalo);
            contador.style.display = "none";
            juegoDiv.style.display = "block";
            juegoDiv.classList.add("slide-up");
            mostrarPregunta();
        }
    }, 1000);
});

