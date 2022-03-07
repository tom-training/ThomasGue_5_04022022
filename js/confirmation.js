

var strg = window.location.href;

console.log(strg);

// Avec un constructeur on crée une instance de classe qu'on nomme url
var url = new URL(strg);

/* Une méthode de cette instance de classe nous permet de récupérer l'id passé en paramètre 
dans l'URL */

var identifiantOrder = url.searchParams.get("orderId");

console.log(identifiantOrder);

document.getElementById("orderId").textContent = identifiantOrder;