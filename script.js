<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Bolsa de Empleo - Trelew</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; background: #f4f4f4; }
        header { background: #0077cc; color: white; padding: 15px; text-align: center; }
        main { padding: 20px; max-width: 800px; margin: auto; }
        section { margin-bottom: 40px; }
        h2 { color: #0077cc; }
        .card { background: white; padding: 15px; margin-bottom: 10px; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
        button { background: #0077cc; color: white; border: none; padding: 10px 15px; border-radius: 5px; cursor: pointer; }
        button:hover { background: #005fa3; }
        input, textarea { width: 100%; padding: 8px; margin-bottom: 10px; border-radius: 4px; border: 1px solid #ccc; }
    </style>
</head>
<body>

<header>
    <h1>Bolsa de Empleo - Trelew</h1>
</header>

<main>

    <!-- Sección para publicar empleos -->
    <section>
        <h2>Publicar Empleo</h2>
        <form id="formulario">
            <input type="text" placeholder="Nombre de la empresa" required>
            <input type="text" placeholder="Puesto" required>
            <textarea placeholder="Descripción" rows="3" required></textarea>
            <button type="submit">Publicar Empleo</button>
        </form>
    </section>

    <!-- Lista de empleos publicados -->
    <section>
        <h2>Empleos Publicados</h2>
        <div id="lista-empleos"></div>
    </section>

    <!-- Sección para el formulario de postulantes -->
    <section>
        <h2>Formulario de Postulación</h2>
        <iframe 
            src="https://docs.google.com/forms/d/e/1FAIpQLSdcP6OQx_JUmYWkwn69noNw3Wf4kqY-CJix0NI6rafTVeXlvg/viewform?embedded=true" 
            width="100%" 
            height="800" 
            frameborder="0" 
            marginheight="0" 
            marginwidth="0">
            Cargando…
        </iframe>
    </section>

</main>

<script>
const formulario = document.getElementById("formulario");
const lista = document.getElementById("lista-empleos");

// Cargar empleos guardados al iniciar
document.addEventListener("DOMContentLoaded", cargarEmpleos);

// Cuando se envía el formulario de publicar empleo
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

// Mostrar empleo en pantalla
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

// Cargar empleos guardados al iniciar
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
</script>

</body>
</html>
