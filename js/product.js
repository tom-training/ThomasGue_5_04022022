const leDivImage = document.querySelector(".item__img");

const selectionCouleur = document.getElementById("colors");

// la variable str nous permet de récupérer l'URL

var str = window.location.href;

//console.log(str);

// Avec un constructeur on crée une instance de classe qu'on nomme url
var url = new URL(str);

/* Une méthode de cette instance de classe nous permet de récupérer l'id passé en paramètre 
dans l'URL */

var identifiant = url.searchParams.get("id");

//console.log(identifiant);

/* On commence par un fetch avec une promise

quand on a récupéré les valeurs/variables de l'API

On prend la valeur de la variable "identifiant"
 
et on affiche les éléments correspondants
*/

/* Désormais on va chercher avec un GET (fetch) les base de données appelé ici tableauData
 qui consiste en 8 elements*/

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

// FIN DE LA REQUETE FETCH ------- FIN DE LA REQUETE FETCH  ------- FIN DE LA REQUETE FETCH  

/* Avant qu'on mette dans le panier, on scanne le panier pour verifier s'il n'y a pas déja 
    un produit de meme couleur/meme produit (id et couleur identique) ==> addition sinon 
    ajout du nouveau produit

tester les cas d'erreur si 0 mis en quantité et si pas de couleurs   < C'EST FAIT >

/* C'est ici que l'on récupère la quantité et la couleur sélectionnée
Cette récupération se fera au moment où le visiteur clique sur "commander"
avec un eventListener sur le button id addToCart

*/





    console.log(localStorage);

    console.log(localStorage.getItem("obj"));
    const monStockageJSON = localStorage.getItem("obj");
    const monStockageJS = JSON.parse(monStockageJSON);
    
    console.log(monStockageJS);
    /*
    for (let i=0; i<monStockageJS.length; i++){
    
        console.log(monStockageJS[i]);
    
        console.log("Le produit commandé est le "+ monStockageJS[i].idt + "en "+ 
        monStockageJS[i].nombre + " exemplaires, de couleur: " + monStockageJS[i].couleur);
    
    }
*/

// ATTENTION SURVEILLER CET OBJET DÉCLARÉ, peut-être faut il l'inclure dans l'event

// Il faut un tableau d'objets


let monPanierTab = [

    {
        idt : " ",
        nombre: 0,
        couleur: " "
    }

];    

// DEBUT DE L'EVENT LISTENER ------- DEBUT DE L'EVENT LISTENER  ------- DEBUT DE L'EVENT LISTENER


document.getElementById("addToCart").addEventListener("click", function(){

    // ici on récupère la valeur couleur et la valeur nombre

    console.log(identifiant);
    console.log(document.getElementById("colors").value);
    
    console.log(document.getElementById("quantity").value);

    // il faut les stocker
  

    let leNombreSelect = document.getElementById("quantity").value;
    let laCouleurSelect = document.getElementById("colors").value;
    let leProduitSelect = identifiant;


    // On va aller chercher l'objet LOCALSTORAGE

    // on va aller chercher ce qu'il y a dans le localStorage

    // On va boucler cet Objet (s'il existe)

    /* if(identifiant ==== localStorage.idt && laCouleurSelect === localStorage.couleur){

        On déroule le code qui additionne dans le panier, et on va changer le nombre
         affiché dans cart 

    }else{ */
  
        if(leNombreSelect>0 && laCouleurSelect){


            /* il va falloir aller scanner le panier et vérifier que l'identifiant ci-dessus n'est 
            pas déjà dans le panier */

            monPanierTab= [
                {
                idt : leProduitSelect,
                nombre: leNombreSelect,
                couleur: laCouleurSelect
                }
            ];    

            // On transforme l'objet JS en objet JSON

            let monPanierJSon = JSON.stringify(monPanierTab);

            // On le stocke dans localStorage

            localStorage.setItem("obj", monPanierJSon);

        }else{
            console.log("choisissez la couleur et le nombre!!!");
        }
            //console.log(localStorage.getItem("obj"));  
    //}

});

// FIN DE L'EVENT LISTENER ------- FIN DE L'EVENT LISTENER  ------- FIN DE L'EVENT LISTENER

