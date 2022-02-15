
console.log(localStorage);

console.log(localStorage.getItem("obj"));
const monStockageJSON = localStorage.getItem("obj");
const monStockageJS = JSON.parse(monStockageJSON);

console.log(monStockageJS);

console.log("le premier canape est "+ monStockageJS[0].idt+ " est de couleur "+ monStockageJS[0].couleur);

// ici on tape le code pour monStockageJS[0];  on va les placer avec des textContent

document.querySelector(".cart__item__content__description > p").textContent = monStockageJS[0].couleur;

document.querySelector(".cart__item__content__settings__quantity > input").value = monStockageJS[0].nombre;

// maintenant qu'on a récupéré la couleur/ nombre
// on va maintenant requêter l'API pour récupérer image/name/price avec l'idt comme point d'appui 

//const tableauDatum = {};



fetch("http://localhost:3000/api/products")

    .then(function(res){
        if(res.ok){
            return res.json();
        }
    })

    .then(function(value){

        const tableauDatum = value;

        for(const element of tableauDatum){

            // on doit boucler sur le tableau d'objet

            if(element._id === monStockageJS[0].idt){  

                /* ici on place les éléments qui coincident avec l'identifiant  
                l'image + le nom + le  prix */
                

                document.querySelector(".cart__item__img>img").src = element.imageUrl;

                document.querySelector(".cart__item__content__description>h2").textContent = element.name;

                document.querySelector(".cart__item__content__description>p+p").textContent = element.price + " €";


            }else{
                console.log("c'est pas lui!!!!");
            }
        }
    })

//----------------------------------------------------------------------------------------------

// Cette partie concerne l'insertion des éventuels canapés supplémentaires du panier 
// là par contre on va devoir insérer des éléments à la main
/*
for(let i=1; i< monStockageJS.length; i++){

    console.log("canapé : " + monStockageJS[i].idt);

    let nouvelleCommandeElt = document.createElement('article');

    document.getElementById('cart__items').appendChild(nouvelleCommandeElt);

}
*/






    