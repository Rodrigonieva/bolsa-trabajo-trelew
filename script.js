const formulario = document.getElementById("formulario");
const lista = document.getElementById("lista-empleos");

// Cargar datos guardados al iniciar
document.addEventListener("DOMContentLoaded", cargarEmpleos);

formulario.addEventListener("submit", function(e) {
    e.preventDefault();

    const inputs = formulario.querySelectorAll("input, textarea");

    const empleo = {
        empresa: inputs[0].value,
        puesto: inputs[1].value,
        descripcion: inputs[2].value
    };

    guardarEmpleo(empleo);
    mostrarEmpleo(empleo);

    formulario.reset();
});

// Guardar en localStorage
function guardarEmpleo(empleo) {
    let empleos = JSON.parse(localStorage.getItem("empleos")) || [];
    empleos.push(empleo);
    localStorage.setItem("empleos", JSON.stringify(empleos));
}

// Mostrar en pantalla
function mostrarEmpleo(empleo) {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <h3>${empleo.puesto}</h3>
        <p><strong>${empleo.empresa}</strong></p>
        <p>${empleo.descripcion}</p>
        <button onclick="eliminarEmpleo(this)">Eliminar</button>
    `;

    lista.appendChild(card);
}

// Cargar empleos al iniciar
function cargarEmpleos() {
    let empleos = JSON.parse(localStorage.getItem("empleos")) || [];
    empleos.forEach(mostrarEmpleo);
}

// Eliminar empleo
function eliminarEmpleo(boton) {
    const card = boton.parentElement;
    const puesto = card.querySelector("h3").textContent;

    let empleos = JSON.parse(localStorage.getItem("empleos"));

    empleos = empleos.filter(e => e.puesto !== puesto);

    localStorage.setItem("empleos", JSON.stringify(empleos));

    card.remove();
}
