const leDivImage = document.querySelector(".item__img");

const selectionCouleur = document.getElementById("colors");

// la variable str (string) nous permet de récupérer l'URL

var str = window.location.href;

// Avec un constructeur on crée une instance de classe qu'on nomme url
var url = new URL(str);

/* Une méthode de cette instance de classe nous permet de récupérer l'id passé en paramètre 
dans l'URL */

var identifiant = url.searchParams.get("id");

/* On commence par un fetch qui sera une promise,

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

            if(element._id === identifiant){

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
                }   */
            }    
        }
    })
    .catch(function(err){

        console.error(err);
        const messageErreur = document.createElement("p");
    
        messageErreur.textContent = "Il semblerait qu'un problème technique empêche le " + 
        "chargement des informations concernant nos canapés, " + "nous nous excusons pour ce désagrément," 
        +" veuillez réactualiser la page";

        document.querySelector(".item").appendChild(messageErreur);

    });

// FIN DE LA REQUETE FETCH ------- FIN DE LA REQUETE FETCH  ------- FIN DE LA REQUETE FETCH  

/* 

Avant qu'on mette dans le panier, on scanne le panier pour verifier s'il n'y a pas déja 
un produit de meme couleur/meme produit (id et couleur identique) ==> addition sinon 
ajout du nouveau produit

tester les cas d'erreur si 0 mis en quantité et si pas de couleurs  

C'est ici que l'on récupère la quantité et la couleur sélectionnée
Cette récupération se fera au moment où le visiteur clique sur "commander"
avec un eventListener sur le button id addToCart
*/

// on va vérifier s'il y a qqchose dans le localStorage

const monStockageJSON = localStorage.getItem("obj");
const monStockageJS = JSON.parse(monStockageJSON);

console.log(monStockageJS);

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
    // il faut les stocker
  
    let leNombreSelect = Number(document.getElementById("quantity").value);
    console.log(typeof(leNombreSelect));
    let laCouleurSelect = document.getElementById("colors").value;
    let leProduitSelect = identifiant;

    // On va aller chercher l'objet dans le LOCALSTORAGE
    // On va boucler cet Objet (s'il existe)

    if(leNombreSelect>0 && laCouleurSelect){ //on verifie qu'il y a au moins un canap et une couleur selectionnée

        if(monStockageJS){
            if(monStockageJS.length === 0){
                console.log("le panier est vide");

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
                console.log('il y a qqchose dans le panier');

                let additionArticle = false;

                // s'il y a déjà un canapé même couleur et même identifiant on ne fait qu'ajouter 
                // les nombres nouveau et anciens
                // sinon on déroule le code où l'on ajoute un objet

                for(let i=0; i<monStockageJS.length; i++){

                    let idtAlready = monStockageJS[i].idt;
                    let couleurAlready = monStockageJS[i].couleur;

                    if(idtAlready === leProduitSelect && couleurAlready === laCouleurSelect){
                        
                        // code où l'on ajoute en ne faisant qu'une simple addition
                        monStockageJS[i].nombre = Number(monStockageJS[i].nombre) + leNombreSelect;
                        additionArticle = true;

                        let monPanierJSon = JSON.stringify(monStockageJS);
                        localStorage.setItem("obj", monPanierJSon);

                        
                    }else{
                        console.log("non il n'y a pas eu de commande de canapé de ce type modèle/couleur avant");
                    }
                }
                // il ne faut pas oublier que la page produit ne contient qu'un seul canapé
                // donc si il y a sélection d'un canapé même modèle/couleur, c'est fini 
                // additionArticle = true; et donc le if ci-dessous n'opèrera pas
                // s'il n'y a pas sélection d'un canapé même modèle/couleur alors additionArticle restera false
                // et le if ci-dessous peut opérer

                if(additionArticle === false){
                    monStockageJS.push( 
                        {
                            idt : leProduitSelect,
                            nombre: leNombreSelect,
                            couleur: laCouleurSelect
                        }
                    );

                    let monPanierJSon = JSON.stringify(monStockageJS);
                    localStorage.setItem("obj", monPanierJSon);
                }
            }

        }else{
            console.log('le localStorage est null');

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
        }

    }else{
        console.log("choisissez la couleur et le nombre!!!");
        const messageErreur = document.createElement("p");
        messageErreur.textContent = "Veuillez svp choisir une couleur et un nombre";
        document.querySelector(".item__content").appendChild(messageErreur);
    }       

});

// FIN DE L'EVENT LISTENER ------- FIN DE L'EVENT LISTENER  ------- FIN DE L'EVENT LISTENER

