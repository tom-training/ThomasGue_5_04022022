const leDivImage = document.querySelector(".item__img");

const selectionCouleur = document.getElementById("colors");

var str = window.location.href;

//console.log(str);

var url = new URL(str);


var identifiant = url.searchParams.get("id");

//console.log(identifiant);

/* On commence par un fetch avec une promise

quand on a récupéré les valeurs/variables de l'API

On prend la valeur de la variable "identifiant"
 
et on affiche les éléments correspondants
*/



fetch("http://localhost:3000/api/products")
    .then(function(res){
        if(res.ok){
            return res.json();
        }
    })
    .then(function(value){

        const tableauData = value;

        for(const element of tableauData){
            //console.log(element);

            if(element._id === identifiant){
                /* console.log("C'est le canapé avec l'identifiant "+ element._id + 
                " qui est le canapé: "+ element.name);  */

                // c'est ici que tout se joue au niveau insertion des éléments du canape

                const imageCanap = document.createElement("img");

                imageCanap.src = element.imageUrl;
                imageCanap.alt = element.altTxt;
                leDivImage.appendChild(imageCanap);
                            

                
                document.getElementById("title").textContent = element.name;
                document.getElementById("price").textContent = element.price;
                document.getElementById("description").textContent = element.description;

                // enfin il faut parcourir le tableau des couleurs element.colors

                for(const couleur of element.colors){
                    //console.log(couleur);

                    const couleurOption = document.createElement("option");
                    couleurOption.value = couleur;
                    couleurOption.textContent = couleur;

                    selectionCouleur.appendChild(couleurOption);
                }


            /*  }else{
                console.log("c'est pas lui !!!!");
                }                                           */
            }    

        }
        

    })
    .catch(function(err){
        console.log(err);
    });



    /* C'est ici que l'on récupère la quantité et la couleur sélectionnée
    Cette récupération se fera au moment 

    avec un eventListener sur le button id addToCart

    il n'y a pas de requêtes vers le serveur, pas de requête POST

    tout ce fait par la création d'un objet qui sera sauvegardé dans localStorage

    */

let monPanierObj = {
        idt : " ",
        nombre: 0,
        couleur: " "
};


document.getElementById("addToCart").addEventListener("click", function(){

    // ici on récupère la valeur couleur et la valeur nombre

    console.log(identifiant);
    console.log(document.getElementById("colors").value);
    
    console.log(document.getElementById("quantity").value);

    // il faut les stocker
  

    let leNombreSelect = document.getElementById("quantity").value;
    let laCouleurSelect = document.getElementById("colors").value;
    let leProduitSelect = identifiant;

    monPanierObj = {
        idt : leProduitSelect,
        nombre: leNombreSelect,
        couleur: laCouleurSelect
    }

    // On transforme l'objet JS en objet JSON

    let monPanierJSon = JSON.stringify(monPanierObj);

    // On le stocke dans localStorage

    localStorage.setItem("obj", monPanierJSon);

    //console.log(localStorage.getItem("obj"));

  

});

