
console.log(localStorage);

console.log(localStorage.getItem("obj"));
//const monStockageJSON = localStorage.getItem("obj");
//const monStockageJS = JSON.parse(monStockageJSON);


console.log("le produit avec l'identifiant "+ monStockageJS.idt + 
" est commandé en "+ monStockageJS.nombre + " exemplaire avec la couleur "+ monStockageJS.couleur);

/* Attention il faut peut-être crée une fonction pour transmettre les données
 dans le local storage. A moins que la fonction anonyme ne suffise dans l'event listener
 du bouton AJOUTER AU PANIER */