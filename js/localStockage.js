console.log(localStorage.getItem("obj"));
const monStockageJSON = localStorage.getItem("obj");
const monStockageJS = JSON.parse(monStockageJSON);


console.log("le produit avec l'identifiant "+ monStockageJS.idt + 
" est commandé en "+ monStockageJS.nombre + " exemplaire avec la couleur "+ monStockageJS.couleur);


