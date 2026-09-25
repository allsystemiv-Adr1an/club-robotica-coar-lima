// Esperar a que la página web cargue por completo
document.addEventListener("DOMContentLoaded", () => {
    cargarProyectos();
});

// Función para leer los datos del archivo JSON y mostrarlos en la web
async function cargarProyectos() {
    try {
        // 1. Ir a buscar el archivo proyectos.json
        const respuesta = await fetch('data/proyectos.json');
        const proyectos = await respuesta.json();
        
        // 2. Buscar el contenedor en el HTML donde irán las tarjetas
        const contenedor = document.getElementById('proyectos-grid');
        
        if (!contenedor) return; // Si no existe el contenedor, detener la función

        // 3. Limpiar el contenedor por si acaso
        contenedor.innerHTML = "";

        // 4. Recorrer cada proyecto del JSON y crear su tarjeta visual
        proyectos.forEach(proyecto => {
            // Crear el bloque de código para la tarjeta
            const tarjeta = document.createElement('div');
            tarjeta.classList.add('project-card');

            // Generar las etiquetas de tecnología (badges)
            const tecnologiasHTML = proyecto.tecnologias
                .map(tech => `<span class="tech-tag">${tech}</span>`)
                .join('');

            // Meter la estructura de la tarjeta (Cargando la imagen de forma directa)
            tarjeta.innerHTML = `
                <div class="project-img-container">
                    <img src="${proyecto.imagen}" alt="${proyecto.nombre}" class="project-img">
                </div>
                <div class="project-info">
                    <h3>${proyecto.nombre}</h3>
                    <p>${proyecto.descripcion}</p>
                    <div class="project-tech">
                        ${tecnologiasHTML}
                    </div>
                    <a href="${proyecto.enlace}" class="btn-secondary">VER PROYECTO →</a>
                </div>
            `;

            // Agregar la tarjeta al contenedor de la página
            contenedor.appendChild(tarjeta);
        });

    } catch (error) {
        console.error("Error al cargar los proyectos del club:", error);
    }
}
