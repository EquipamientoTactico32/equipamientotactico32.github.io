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
imagen: "images/yarara.jpg",
colores: ["Verde"],
talles: ["Único"]
},
{
categoria: "Uniformes",
nombre: "Pantalón Urban Elt Ripstop Táctico",
precio: "ARS$58.999",
imagen: "images/pantalon1.jpg",
colores: ["Negro","Verde"],
talles: ["S","M","L","XL"]
},
{
categoria: "Mochilas",
nombre: "Mochila Molle Táctica 45L",
precio: "ARS$76.999",
imagen: "images/mochila1.jpg",
colores: ["Negro","Verde"],
talles: ["Único"]
}
];

const container = document.getElementById("productos-container");

function mostrarCategorias(){
container.innerHTML = "";

categorias.forEach(cat => {
container.innerHTML += `
<div class="producto">
<h3>${cat}</h3>
<button class="btn" onclick="mostrarProductos('${cat}')">Ver Productos</button>
</div>
`;
});
}

function mostrarProductos(categoria){
container.innerHTML = "";

const productosFiltrados = productos.filter(p => p.categoria === categoria);

if(productosFiltrados.length === 0){
container.innerHTML = `
<h2>${categoria}</h2>
<p>Próximamente productos disponibles.</p>
<button class="btn" onclick="mostrarCategorias()">Volver</button>
`;
return;
}

productosFiltrados.forEach(producto => {

let coloresOptions = producto.colores.map(c => `<option>${c}</option>`).join("");
let tallesOptions = producto.talles.map(t => `<option>${t}</option>`).join("");

container.innerHTML += `
<div class="producto">
<h3>${producto.nombre}</h3>
<img src="${producto.imagen}">
<p class="precio">${producto.precio}</p>

<label>Color:</label>
<select class="color">
${coloresOptions}
</select>

<label>Talle:</label>
<select class="talle">
${tallesOptions}
</select>

<button onclick="comprar(this,'${producto.nombre}','${producto.precio}')" class="btn">
Comprar por WhatsApp
</button>
</div>
`;
});

container.innerHTML += `<br><button class="btn" onclick="mostrarCategorias()">Volver a Categorías</button>`;
}

function comprar(btn,nombre,precio){
let productoCard = btn.parentElement;
let color = productoCard.querySelector(".color").value;
let talle = productoCard.querySelector(".talle").value;

let mensaje = `Hola, quiero comprar el ${nombre} por ${precio}. Color: ${color}. Talle: ${talle}`;

let url = `https://wa.me/5491128642601?text=${encodeURIComponent(mensaje)}`;

window.open(url,"_blank");
}

mostrarCategorias();
