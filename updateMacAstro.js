const fs = require('fs');
const path = require('path');

const updateMacAstro = (data) => {
    // Parsear los datos del producto desde el cuerpo del issue
    const product = JSON.parse(data);

    // Extraer la información del producto
    const { id, titulo, descripcion, precio, linkImagen, seccion } = product;

    // Verificar si el producto pertenece a la sección "Mac"
    if (seccion === 'Mac') {
        const filePath = path.join(__dirname, 'src/pages/mac.astro');

        // Crear el código HTML para la nueva tarjeta del producto
        const newCard = `
<div class="card">
  <h2>${titulo}</h2>
  <img src="${linkImagen}" alt="${titulo}">
  <p>${descripcion}</p>
  <p>Precio: ${precio}</p>
</div>
        `;

        // Añadir la nueva tarjeta al final del archivo mac.astro
        fs.appendFile(filePath, newCard, (err) => {
            if (err) {
                console.error('Failed to add product', err);
            } else {
                console.log('Product added successfully');
            }
        });
    } else {
        console.error('Unsupported section');
    }
};

// Tomar los argumentos pasados al script (que contienen los datos del producto)
const args = process.argv.slice(2);

// Verificar si se proporcionaron datos
if (args.length > 0) {
    updateMacAstro(args[0]);
} else {
    console.error('No product data provided');
}
