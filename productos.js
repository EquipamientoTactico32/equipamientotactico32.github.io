const productos = [
{
nombre: "Cuchillo Yarará C.M.N",
precio: "ARS$111.200",
imagen: "images/yarara.jpg",
colores: ["Verde"],
talles: ["Único"]
},
{
nombre: "Pantalón Urban Elt Ripstop Táctico",
precio: "ARS$58.999",
imagen: "images/pantalon1.jpg",
colores: ["Negro","Verde"],
talles: ["S","M","L","XL"]
},
{
nombre: "Mochila Molle Táctica 45L",
precio: "ARS$76.999",
imagen: "images/mochila1.jpg",
colores: ["Negro","Verde"],
talles: ["Único"]
}
];

const container = document.getElementById("productos-container");

productos.forEach(producto => {

let coloresOptions = producto.colores.map(c => `<option>${c}</option>`).join("");
let tallesOptions = producto.talles.map(t => `<option>${t}</option>`).join("");

let card = `
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

container.innerHTML += card;

});

function comprar(btn,nombre,precio){
let productoCard = btn.parentElement;
let color = productoCard.querySelector(".color").value;
let talle = productoCard.querySelector(".talle").value;

let mensaje = `Hola, quiero comprar el ${nombre} por ${precio}. Color: ${color}. Talle: ${talle}`;

let url = `https://wa.me/5491128642601?text=${encodeURIComponent(mensaje)}`;

window.open(url,"_blank");
}
