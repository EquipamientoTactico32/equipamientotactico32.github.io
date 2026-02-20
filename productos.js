const categorias = [
    "Mochilas",
    "Riñoneras",
    "Pouchs",
    "Pañuelos",
    "Gorras",
    "Parches",
    "Prenda Inferior",
    "Prenda Superior",
    "Calzado",
    "Cuchillería",
    "Linternas",
    "Cinturones",
    "Varios"
];

const productos = [
    {
        categoria: "Mochilas",
        nombre: "Mochila Molle 28Lts",
        precio: "ARS $45.000",
        imagenesPorColor: {
            "Verde": "./images/mochila28_verde.jpg",
            "Negro": "./images/mochila28_negro.jpg",
            "Amarillo": "./images/mochila28_amarillo.jpg"
        },
        imagenDefault: "./images/mochila1.jpg", // Podés cambiar esto por la foto principal
        colores: ["Verde", "Negro", "Amarillo"],
        talles: ["Único"]
    },
    {
        categoria: "Mochilas",
        nombre: "Mochila Molle 48Lts",
        precio: "ARS $60.000",
        imagenesPorColor: {
            "Verde": "./images/mochila48_verde.jpg",
            "Negro": "./images/mochila48_negro.jpg",
            "Amarillo": "./images/mochila48_amarillo.jpg"
        },
        imagenDefault: "./images/mochila1.jpg",
        colores: ["Verde", "Negro", "Amarillo"],
        talles: ["Único"]
    },
    {
        categoria: "Mochilas",
        nombre: "Bolso Mochila Coyote 90Lts",
        precio: "ARS $90.000",
        imagenesPorColor: {
            "Amarillo": "./images/mochila90_amarillo.jpg"
        },
        imagenDefault: "./images/mochila90_amarillo.jpg",
        colores: ["Amarillo"],
        talles: ["Único"]
    }
];

const container = document.getElementById("productos-container");

function mostrarCategorias() {
    container.innerHTML = "";
    categorias.forEach(cat => {
        container.innerHTML += `
            <div class="producto categoria-card">
                <h3>${cat}</h3>
                <button class="btn" onclick="mostrarProductos('${cat}')">Ver catálogo</button>
            </div>
        `;
    });
}

function cambiarImagen(select, nombreProducto) {
    const colorElegido = select.value;
    const producto = productos.find(p => p.nombre === nombreProducto);
    const card = select.closest('.producto');
    const imgElement = card.querySelector('.img-producto');

    if (producto.imagenesPorColor && producto.imagenesPorColor[colorElegido]) {
        imgElement.src = producto.imagenesPorColor[colorElegido];
    }
}

function mostrarProductos(categoria) {
    container.innerHTML = "";
    const filtrados = productos.filter(p => p.categoria === categoria);

    if (filtrados.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 50px;">
                <h2>${categoria}</h2>
                <p>Próximamente productos disponibles en esta sección.</p>
                <button class="btn" style="max-width: 200px; margin: 20px auto;" onclick="mostrarCategorias()">Volver</button>
            </div>`;
        return;
    }

    filtrados.forEach(p => {
        const coloresHTML = p.colores.map(c => `<option value="${c}">${c}</option>`).join("");
        const tallesHTML = p.talles.map(t => `<option value="${t}">${t}</option>`).join("");

        container.innerHTML += `
            <div class="producto">
                <img src="${p.imagenDefault}" class="img-producto" alt="${p.nombre}" onerror="this.src='https://via.placeholder.com/300?text=Sin+Imagen'">
                <h3>${p.nombre}</h3>
                <p class="precio">${p.precio}</p>
                
                <div style="text-align: left; margin-bottom: 10px;">
                    <label>Color:</label>
                    <select class="select-color" onchange="cambiarImagen(this, '${p.nombre}')" style="width: 100%; padding: 8px; background: #222; color: white; border: 1px solid #444; border-radius: 4px; margin-bottom: 10px;">
                        ${coloresHTML}
                    </select>

                    <label>Talle:</label>
                    <select class="select-talle" style="width: 100%; padding: 8px; background: #222; color: white; border: 1px solid #444; border-radius: 4px;">
                        ${tallesHTML}
                    </select>
                </div>

                <button class="btn" onclick="comprar(this, '${p.nombre}', '${p.precio}')">Comprar por WhatsApp</button>
            </div>
        `;
    });
    container.innerHTML += `<div style="grid-column: 1/-1; margin-top: 30px;"><button class="btn" style="max-width: 250px;" onclick="mostrarCategorias()">← Volver a categorías</button></div>`;
}

function comprar(btn, nombre, precio) {
    const card = btn.parentElement;
    const color = card.querySelector(".select-color").value;
    const talle = card.querySelector(".select-talle").value;
    const mensaje = `Hola Equipamiento Táctico 32! Me interesa el producto: ${nombre} (${precio}).\nColor: ${color}\nTalle: ${talle}`;
    window.open(`https://wa.me/5491128642601?text=${encodeURIComponent(mensaje)}`, "_blank");
}

mostrarCategorias();
