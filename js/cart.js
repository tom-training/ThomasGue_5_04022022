
console.log(localStorage);

console.log(localStorage.getItem("obj"));
const monStockageJSON = localStorage.getItem("obj");
const monStockageJS = JSON.parse(monStockageJSON);


console.log("le produit avec l'identifiant "+ monStockageJS.idt + 
" est commandé en "+ monStockageJS.nombre + " exemplaire avec la couleur "+ monStockageJS.couleur);


/*
 Il y a déjà la couleur et le nombre que l'on peut installer

            cart__item__content__description > p    <----  monStockageJS.couleur    

            cart__item__content__settings__quantity > p  <--- monStockageJS.nombre

*/

document.querySelector(".cart__item__content__description>p").textContent = monStockageJS.couleur;

document.querySelector(".cart__item__content__settings__quantity>input").value = monStockageJS.nombre;

/* J'ai bien récupéré un objet avec idt, nombre et couleur

    l'identifiant va me permettre d'aller requêter l'API pour récupérer 

    l'image     element.imageUrl        --->querySelector cart__item__img >img

    nom du produit      element.name    ---> cart_item_content_description > h2

    prix du produit     element.price   ----> cart_item_content_description > p + p
*/

fetch("http://localhost:3000/api/products")

    .then(function(res){
        if(res.ok){
            return res.json();
        }
    })

    .then(function(value){

        const tableauDatum = value;

        for(const element of tableauDatum){

            if(element._id === monStockageJS.idt){

                /* ici on place les éléments qui coincident avec l'identifiant  
                l'image + le nom + le prix
                */

                document.querySelector(".cart__item__img>img").src = element.imageUrl;

                document.querySelector(".cart__item__content__description>h2").textContent = element.name;

                document.querySelector(".cart__item__content__description>p+p").textContent = element.price + " €";


            }else{
                console.log("c'est pas lui!!!!");
            }
        }
    })