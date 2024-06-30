let intentos = 6;
let palabra;
const button = document.getElementById("guess-button");
const input = document.getElementById("guess-input");
const playAgainButton = document.getElementById("play-again-button");

window.addEventListener('load', init);
function init() {
    obtenerPalabraAleatoria();
    input.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            intentar();
            input.value = "";
        }
    });
    button.addEventListener("click", function () {
        intentar();
        input.value = "";
    });
}
function obtenerPalabraAleatoria() {
    fetch('https://random-word-api.herokuapp.com/word?length=5&lang=en')
        .then(response => response.json())
        .then(data => {
            palabra = data[0].toUpperCase();
            console.log(palabra)
        })
        .catch(error => {
            console.error('Error al obtener la palabra aleatoria:', error);
        });
}


function intentar() {
    const INTENTO = leerIntento();
    if (!INTENTO || INTENTO.length < 5 || INTENTO.length > 5) {
        alert("Ingresa una palabra de 5 letras.")
        return;
    }
    const GRID = document.getElementById("grid");
    const ROW = document.createElement('div');
    ROW.className = 'row';
    const letrasAdivinadas = {};
    for (let i = 0; i < palabra.length; i++) {
        const letraDeLaPalabra = palabra[i];
        const SPAN = document.createElement('span');
        SPAN.className = 'letter';
        const letraEncontrada = INTENTO.includes(letraDeLaPalabra);
        const letraCorrecta = (INTENTO[i] === letraDeLaPalabra);
        if (letraCorrecta) {
            SPAN.innerHTML = letraDeLaPalabra;
            SPAN.style.backgroundColor = "#79b851";
        } else if (letraEncontrada && !letrasAdivinadas[letraDeLaPalabra]) {
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = "#f3c237";
            letrasAdivinadas[letraDeLaPalabra] = true;
        } else {
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = "#a4aec4";
        }
        ROW.appendChild(SPAN);
    }
    GRID.appendChild(ROW);
    intentos--;
    if (intentos === 0 || INTENTO === palabra) {
        terminar(INTENTO === palabra ? "<h1>GANASTE!</h1>" : "<h1>PERDISTE!</h1>");
    }
}
function leerIntento() {
    let intento = document.getElementById("guess-input");
    intento = intento.value;
    intento = intento.toUpperCase();
    return intento;
}
function terminar(mensaje) {
    const INPUT = document.getElementById("guess-input");
    const BUTTON = document.getElementById("guess-button");
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje;
    playAgainButton.style.display = "block";
    playAgainButton.addEventListener("click", function () {
        window.location.reload();
    });
    INPUT.disabled = true;
    BUTTON.disabled = true;
    BUTTON.style.cursor = "default";
}