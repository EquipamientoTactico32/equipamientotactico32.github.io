const categorias = [
    "Cuchillos",
    "Uniformes",
    "Mochilas",
    "Accesorios",
    "Botas",
    "Pouchs / Riñoneras"
];

const productos = [
    {
        categoria: "Cuchillos",
        nombre: "Cuchillo Yarara CMN",
        precio: "ARS$111.200",
        imagen: "./images/yarara.jpg",
        colores: ["Verde"],
        talles: ["Único"]
    },
    {
        categoria: "Uniformes",
        nombre: "Pantalón Urban Elt Ripstop Táctico",
        precio: "ARS$58.999",
        imagen: "./images/pantalon1.jpg",
        colores: ["Negro","Verde"],
        talles: ["S","M","L","XL"]
    },
    {
        categoria: "Mochilas",
        nombre: "Mochila Molle Táctica 45L",
        precio: "ARS$76.999",
        imagen: "./images/mochila1.jpg",
        colores: ["Negro","Verde"],
        talles: ["Único"]
    }
];

const container = document.getElementById("productos-container");

function mostrarCategorias(){
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

function mostrarProductos(categoria){
    container.innerHTML = "";
    const productosFiltrados = productos.filter(p => p.categoria === categoria);

    if(productosFiltrados.length === 0){
        container.innerHTML = `
            <div class="aviso">
                <h2>${categoria}</h2>
                <p>Próximamente productos disponibles.</p>
                <button class="btn" onclick="mostrarCategorias()">Volver</button>
            </div>
        `;
        return;
    }

    productosFiltrados.forEach(producto => {
        let coloresOptions = producto.colores.map(c => `<option value="${c}">${c}</option>`).join("");
        let tallesOptions = producto.talles.map(t => `<option value="${t}">${t}</option>`).join("");

        container.innerHTML += `
            <div class="producto">
                <div class="img-container">
                    <img src="${producto.imagen}" alt="${producto.nombre}" onerror="this.src='https://via.placeholder.com/300?text=Imagen+No+Encontrada'">
                </div>
                <h3>${producto.nombre}</h3>
                <p class="precio">${producto.precio}</p>

                <div class="opciones">
                    <label>Color:</label>
                    <select class="color">${coloresOptions}</select>
                    
                    <label>Talle:</label>
                    <select class="talle">${tallesOptions}</select>
                </div>

                <button onclick="comprar(this,'${producto.nombre}','${producto.precio}')" class="btn btn-comprar">
                    Pedir por WhatsApp
                </button>
            </div>
        `;
    });

    container.innerHTML += `<div class="w-100"><button class="btn btn-volver" onclick="mostrarCategorias()">← Volver a Categorías</button></div>`;
}

function comprar(btn, nombre, precio){
    let productoCard = btn.parentElement;
    let color = productoCard.querySelector(".color").value;
    let talle = productoCard.querySelector(".talle").value;

    let mensaje = `Hola! Me interesa el producto: ${nombre} (${precio}).\nColor: ${color}\nTalle: ${talle}\n¿Tienen stock?`;
    let url = `https://wa.me/5491128642601?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
}

// Iniciar la página
mostrarCategorias();
