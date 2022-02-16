console.log(localStorage);

console.log(localStorage.getItem("obj"));
const monStockageJSON = localStorage.getItem("obj");
const monStockageJS = JSON.parse(monStockageJSON);

console.log(monStockageJS);

function requeterAPI(url, tableauVide, monStock){

    fetch(url)

    .then(function(res){
        if(res.ok){
            return res.json();
        }
    })

    .then(function(value){

        tableauVide = value;

        for(const element of tableauVide){

            // on doit boucler sur le tableau d'objet

            if(element._id === monStock){  

                /* ici on place les éléments qui coincident avec l'identifiant  
                l'image + le nom + le  prix */
                console.log("yes le vla!!");                

                document.querySelector(".cart__item__img>img").src = element.imageUrl;

                document.querySelector(".cart__item__content__description>h2").textContent = element.name;

                document.querySelector(".cart__item__content__description>p+p").textContent = element.price + " €";


            }else{
                console.log("Non Non Non , c'est pas lui!!!!");
            }
        }
    })
}



// à ce stade on a de la part du localStorage: l'idt, la couleur et le nombre
  
if(monStockageJS){

    if(monStockageJS.length === 0){

        console.log("le panier est vide!");

    }else if(monStockageJS.length === 1){

        const tableauDatum = {};

        requeterAPI("http://localhost:3000/api/products", tableauDatum, monStockageJS[0].idt);

        console.log("il n'y a qu'un seul article dans mon panier");

        console.log("le premier canape est "+ monStockageJS[0].idt+
         " est de couleur "+ monStockageJS[0].couleur + " en nombre de "+ monStockageJS[0]);

        // ici on tape le code pour monStockageJS[0];  on va les placer avec des textContent

        document.querySelector(".cart__item__content__description > p").textContent = 
        monStockageJS[0].couleur;

        document.querySelector(".cart__item__content__settings__quantity > input").value = 
        monStockageJS[0].nombre;

    }else{
        console.log("il y a plusieurs article dans le panier");
        console.log("le premier canape est "+ monStockageJS[0].idt+ " est de couleur "+ 
        monStockageJS[0].couleur + " en nombre de " + monStockageJS[0].nombre);

        //on commence par le premier article

        const tableauDatum = {};

        requeterAPI("http://localhost:3000/api/products", tableauDatum, monStockageJS[0].idt);

        document.querySelector(".cart__item__content__description > p").textContent = 
        monStockageJS[0].couleur;

        document.querySelector(".cart__item__content__settings__quantity > input").value = 
        monStockageJS[0].nombre;

        // On continue pour les articles supplémentaires
        // on boucle et pour chaque itération on va créer les éléments

        for(let i=1; i< monStockageJS.length; i++){

            let articleElt = document.createElement("article");

            document.getElementById("cart__items").appendChild(articleElt);

            articleElt.class = "cart__item";

            articleElt.id = monStockageJS.idt; // variable idt

            //articleElt.style.color = monStockageJS.couleur;
            
            // dans l'innerHTML ci-dessous sont insérées les variables couleur et nombre

            var tableauData ={};            

            fetch("http://localhost:3000/api/products")

            .then(function(res){
                if(res.ok){
                    return res.json();
                }
            })

            .then(function(value){

                tableauData = value;

                articleElt.innerHTML = `
    
                <div class="cart__item__img">
                    <img src="" alt="">
                </div>
      
                <div class="cart__item__content">
      
                    <div class="cart__item__content__description">
    
                        <h2>Nom du produit</h2>
        
                        <p>${monStockageJS[i].couleur}</p>
        
                        <p>42,00 €</p>
    
                    </div>
      
                    <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                            <p>Qté : </p>
            
                            <input type="number" class="itemQuantity" name="itemQuantity" 
                            min="1" max="100" value="${monStockageJS[i].nombre}">
    
                        </div>
                        <div class="cart__item__content__settings__delete">
                            <p class="deleteItem">Supprimer</p>
                        </div>
                    </div>
      
                </div>
        
                `;

                for(const element of tableauData){

                    // on doit boucler sur le tableau d'objet

                    if(element._id === monStockageJS[i].idt){  

                        /* ici on place les éléments qui coincident avec l'identifiant  
                        l'image + le nom + le  prix */
                        console.log("En vla un !!!");

                        document.querySelector(".cart__item__img>img").src = element.imageUrl;

                        document.querySelector(".cart__item__content__description>h2").textContent = element.name;

                        document.querySelector(".cart__item__content__description>p+p").textContent = element.price + " €";


                    }else{
                        console.log("c'est pas lui!!!!");
                    }
                }
            })

        }

        }

}else{
    console.log("mon panier n'existe pas");
}


