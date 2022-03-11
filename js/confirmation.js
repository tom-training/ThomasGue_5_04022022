// window.location.href nous permet de récupérer l'URL

var strg = window.location.href;

console.log(strg);

// Avec un constructeur on crée une instance de classe qu'on nomme url
var url = new URL(strg);

/* Une méthode de cette instance de classe nous permet de récupérer l'id passé en paramètre 
dans l'URL */

var identifiantOrder = url.searchParams.get("orderId");

console.log(identifiantOrder);

document.getElementById("orderId").textContent = identifiantOrder;


let monStockageJSON = localStorage.getItem("obj");
let monStockageJS = JSON.parse(monStockageJSON);

console.log(monStockageJS);

monStockageJS = [];

monStockageJSON = JSON.stringify(monStockageJS);

localStorage.setItem("obj", monStockageJSON);

console.log(localStorage);