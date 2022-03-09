
// Nous sommes sur la page panier
// D'abord on récupère du localStorage : un tableau d'objet 
// pour rappel il contient plusieurs objet avec element.idt/element.nombre/ element.couleur

const monStockageJSON = localStorage.getItem("obj");
const monStockageJS = JSON.parse(monStockageJSON);

// 1ere fonction loadAPI qui retourne toute l'API sous la forme d'un objet

async function loadAPI(url){

    try{        
            const response = await fetch(url);

            return await response.json();
    
    }catch(error){
            console.error(error);
    }
}

// 2eme fonction loadListProduct qui récupère l'objet API et va boucler les canapés du localStorage
// dessus, afin d'obtenir une liste de produits commandés listProdCommandes qui est un tableau qui
// va avoir le même nombre d'objets que localStorage mais chaque canapés complétés des infos manquantes
// (description, image, alt text, prix...)

const loadListProduct = async function(urll){

    try{
            let listProduct = await loadAPI(urll);

            let listProdCommandes= [];

            for(let element of monStockageJS){

                for(let elt of listProduct){  // elt._id viennent de l'API donnant un tableau listProduct

                    if(element.idt === elt._id){  //element.idt vient du tableau monStockageJS

                        listProdCommandes.push(
                            {
                                idt: element.idt,
                                couleur: element.couleur,
                                nombre: element.nombre,

                                name: elt.name,
                                price: elt.price,
                                imageUrl: elt.imageUrl,
                                description: elt.description,
                                altTxt: elt.altTxt
                            }
                        );
            
                    }else{
                        console.log("c'est pas lui!");
                    }
                }
            }
            return listProdCommandes;

        }catch(error){
            console.error(error);
        }    
};

// cette fonction loadListProduct retourne un tableau listProdCommandes des produits commandés avec
// toutes leurs caractéristiques

//loadListProduct("http://localhost:3000/api/products");

console.log(loadListProduct("http://localhost:3000/api/products"));

// Ci-dessous on crée une fonction qui va ajouter tous les canapés issues du 
// localStorage/listProdCommandes dans le DOM et donc les afficher à l'écran

function ajouterArticle(objKanap){

    const articleElt = document.createElement("article");
    articleElt.id = objKanap.idt;
    articleElt.setAttribute('data-id', objKanap.idt);
    articleElt.setAttribute('data-color', objKanap.couleur);
    articleElt.classList.add('cart__item');
    
    const divImgElt = document.createElement("div");
    divImgElt.classList.add("cart__item__img");
    articleElt.appendChild(divImgElt); 

    const imgElt = document.createElement("img");
    imgElt.src = objKanap.imageUrl;
    imgElt.alt = objKanap.altTxt;
    divImgElt.appendChild(imgElt);

    const divContentElt = document.createElement("div");
    divContentElt.classList.add("cart__item__content");
    articleElt.appendChild(divContentElt); 

    const divContentDescrElt = document.createElement("div");
    divContentDescrElt.classList.add("cart__item__content__description");
    divContentElt.appendChild(divContentDescrElt); 

    const titreElt = document.createElement("h2");
    titreElt.textContent = objKanap.name;
    divContentDescrElt.appendChild(titreElt); 

    const couleurElt = document.createElement("p");
    couleurElt.textContent = objKanap.couleur;
    divContentDescrElt.appendChild(couleurElt);

    const prixElt = document.createElement("p");
    prixElt.textContent = objKanap.price + " €";
    divContentDescrElt.appendChild(prixElt);

    const divContentSettingsElt = document.createElement("div");
    divContentSettingsElt.classList.add("cart__item__content__settings");
    divContentElt.appendChild(divContentSettingsElt);

    const divContentSettQuantityElt = document.createElement("div");
    divContentSettQuantityElt.classList.add("cart__item__content__settings__quantity");
    divContentSettingsElt.appendChild(divContentSettQuantityElt);

    const qtyElt = document.createElement("p");
    qtyElt.textContent = "Qté";
    divContentSettQuantityElt.appendChild(qtyElt);

    const inputQtyElt = document.createElement("input");
    inputQtyElt.type = "number";
    inputQtyElt.classList.add("itemQuantity");
    inputQtyElt.name = "itemQuantity";
    inputQtyElt.min = 1;
    inputQtyElt.max = 100;
    inputQtyElt.value = objKanap.nombre;
    divContentSettQuantityElt.appendChild(inputQtyElt);

    
    const divContentSettDeleteElt = document.createElement("div");
    divContentSettDeleteElt.classList.add("cart__item__content__settings__delete");
    divContentSettingsElt.appendChild(divContentSettDeleteElt); 

    const deleteButtonElt = document.createElement("p");
    deleteButtonElt.textContent = "Supprimer";
    deleteButtonElt.classList.add("deleteItem");
    divContentSettDeleteElt.appendChild(deleteButtonElt);
    
    // raccordement de l'article complet au code HTML
    document.getElementById("cart__items").appendChild(articleElt);
} 

// 3ème fonction qui va récupérer le tableau listProdCommandes
// il va ensuite utiliser ce tableau pour:
// 1> insérer les articles (photos et données des canapés) à l'écran,
// 2> faire les totaux


// Je crée d'abord une fonction faireLeTotal

function faireLeTotal(tableauDeKanap){
    let total = 0;
    let totalQuantity = 0; 

    for(let kanap of tableauDeKanap){
        
        let leNombre = parseInt(kanap.nombre);  // il faut convertir le string en number
        total = total + leNombre * kanap.price;
        totalQuantity = totalQuantity + leNombre;
    }
    // de cette boucle complété on récupère les totaux total et totalQuantity
        
    document.getElementById("totalPrice").textContent = total;
    document.getElementById("totalQuantity").textContent = totalQuantity;
}

async function loadFinalTableau(url){

    try{

        const vaChercherTab = await loadListProduct(url);

        // 1> ici je vais insérer ma fonction de création d'élément de DOM

        for (let kanap of vaChercherTab){
            ajouterArticle(kanap);
        }
        // 2> Ma fonction total

        faireLeTotal(vaChercherTab);

        // 3> Ci-dessous le code pour supprimmer (delete) les canapés
        // les boutons delete peuvent être nombreux, on boucle sur eux

        const lesBoutonsDelete = document.querySelectorAll(".deleteItem")

        for (let elts of lesBoutonsDelete){

            elts.addEventListener("click", function(e){

                // tu as récupéré l'identifiant et la couleur => tu supprimes dans le DOM/ecran puis 
                // dans le vaChercherTab, puis à la fin dans le dataStorage

                for(let i=0; i<monStockageJS.length; i++){

                    if(monStockageJS[i].idt === e.target.closest("article").dataset.id){

                        // expulsion du i.idt du DOM

                        let articleToSuppress = document.getElementById(monStockageJS[i].idt);
                        
                        document.getElementById("cart__items").removeChild(articleToSuppress);

                        // expulsion du j.idt du vaChercherTab
                        for(let j=0; j<vaChercherTab.length; j++){

                            if(vaChercherTab[j].idt === monStockageJS[i].idt){
                                vaChercherTab.splice(j, 1);
                            }
                        }

                        // expulsion du i.idt du tableau du localStorage
                        monStockageJS.splice(i, 1);
                        
                        // maintenant il faut transformer le localStorage

                        const monStokageJSON = JSON.stringify(monStockageJS);
                        
                        localStorage.setItem("obj", monStokageJSON);
                        

                    }else{

                        console.log("non c'est pas lui");
                    
                    }
                }

                // l'Event click sur bouton supprimmer doit déclencher un recalcul
                
                faireLeTotal(vaChercherTab);

            });
        }

        // 4> ci-dessous le code pour modifier le nombre de canapés

        // on va utiliser l'élément de DOM suivant: input de type number "change"

        const lesBoutonsModifs = document.querySelectorAll(".itemQuantity");

        for(let elts of lesBoutonsModifs){

            elts.addEventListener("change", function(e){

                let nouveauNombre = e.target.value;

                for(let i=0; i<monStockageJS.length; i++){

                    if(monStockageJS[i].idt === e.target.closest("article").dataset.id){

                        monStockageJS[i].nombre = nouveauNombre;

                        monStokageJSON = JSON.stringify(monStockageJS);
                        
                        localStorage.setItem("obj", monStokageJSON);

                        // on s'occupe maintenant de mettre à jour vaChercherTab
                        for(let kanap of vaChercherTab){

                            if(kanap.idt === monStockageJS[i].idt){
                                kanap.nombre = nouveauNombre;
                            }
                        }
                    }
                }

                // l'Event change sur le bouton modifier doit déclencher un recalcul
                
                faireLeTotal(vaChercherTab);

            });

        }

        return vaChercherTab;     
        
        // le tableau vaChercherTab retourné ci-dessus est à jour des modifs et 
        // suppression eventuelles, ces modifs et suppressions doivent être dans 
        // cette fonction async car ils ont besoin de la création préalable du DOM
        // par l'étape 1> appellant la fonction ajouterArticle


    }catch(error){
        console.error(error);
    }
}

loadFinalTableau("http://localhost:3000/api/products");

// Travail sur la validation des champs du formulaire  - message: ENTREZ VOTRE PRENOM

document.getElementById("firstName").addEventListener("focus", function () {
    document.getElementById("firstNameErrorMsg").textContent = "Entrez votre prénom";
});

// CONTRÔLE CHAMP PRENOM avec une Regex pour vérifier qu'il n'y a pas de chiffre et au moins 
// une lettre, autrement message: VEUILLEZ NOUS LAISSER VOTRE PRENOM

let regexPrenom = /[a-zA-Z]+/;
let alerteMsgPrenom = false;

document.getElementById("firstName").addEventListener("blur", function (e) {

    let validitePrenom = "";
    
    if(!regexPrenom.test(e.target.value)){
        validitePrenom = "veuillez nous laisser votre prénom!";
        alerteMsgPrenom = true;
    }

    document.getElementById("firstNameErrorMsg").textContent = validitePrenom;

});

// CONTRÔLE CHAMP NOM avec une Regex pour vérifier qu'il n'y a pas de chiffre et au moins 
// une lettre, autrement message: VEUILLEZ NOUS LAISSER VOTRE NOM DE FAMILLE

let regexNom = /[a-zA-Z]+/;
let alerteMsgNom = false;

document.getElementById("lastName").addEventListener("blur", function (e) {

    let validiteNom = "";

    if(!regexNom.test(e.target.value)){
        validiteNom = "veuillez nous laisser votre nom de famille!";
        alerteMsgNom = true;
    }

    document.getElementById("lastNameErrorMsg").textContent = validiteNom;

});

// CONTRÔLE CHAMP ADRESSE avec une Regex pour vérifier qu'il n'y a au moins 
// une lettre ou un chiffre, autrement message: VEUILLEZ INDIQUER VOTRE ADRESSE


let regexAdresse = /[A-Za-z0-9]+/;
let alerteMsgAdresse = false;

document.getElementById("address").addEventListener("blur", function (e) {

    let validiteAdresse = "";

    if(!regexAdresse.test(e.target.value)){
        validiteAdresse = "veuillez indiquer votre adresse!";
        alerteMsgAdresse = true;
    }

    document.getElementById("addressErrorMsg").textContent = validiteAdresse;

});

// CONTRÔLE CHAMP VILLE avec une Regex pour vérifier qu'il n'y a au moins 
// une lettre ou un chiffre, autrement message: VEUILLEZ INDIQUER LA VILLE DE VOTRE ADRESSE

let regexCity = /[a-zA-Z0-9]+/;
let alerteMsgVille = false;

document.getElementById("city").addEventListener("blur", function (e) {

    let validiteVille = "";

    if(!regexCity.test(e.target.value)){
        validiteVille = "veuillez indiquer la ville de votre adresse";
        alerteMsgVille = true;
    }

    document.getElementById("cityErrorMsg").textContent = validiteVille;

});

// REGEX POUR LA VALIDATION DE L'EMAIL

let regexEmail = /.+@.+\..+/;
let alerteMsgCourriel = false;

const verifEmail = document.getElementById("email");

verifEmail.addEventListener("blur", function(e){

    let validiteCourriel = " ";

    if(!regexEmail.test(e.target.value)){
        validiteCourriel = "votre email ne semble pas valide!";
        alerteMsgCourriel = true;
    }

    document.getElementById("emailErrorMsg").textContent = validiteCourriel;
});

// FIN DES TESTS            FIN DES TESTS           FIN DES TESTS           FIN DES TESTS

// ENVOI DES DONNÉES À L'API PAR UNE REQUÊTE POST - on envoie un objet contact avec les
// les champs du formulaire et un tableau d'identifiant (qui peut être récupéré du localStorage)

// function CALLBACK d'envoi des données du formulaire 

// D'abord fonction createCommandePost qui va récupérer le tableau des produits commandés


function createCommandePost(){
    
    console.log(monStockageJS);

    let product = [];

    for(let canape of monStockageJS){
        product.push(canape.idt);
    }

    return product;
    // cette fonction renvoie les produits commandés
}

function createClientPost(){

    if(monStockageJS){
        let prenomValide = false;
        let nomValide = false;
        let adresseValide = false;
        let villeValide = false;
        let emailValide = false;
    
        if(document.getElementById("firstName").value !== "" && alerteMsgPrenom === false){
            prenomValide = true;
        }
    
        if(document.getElementById("lastName").value !== "" && alerteMsgNom === false){
            nomValide = true;
        }
    
        if(document.getElementById("address").value !== "" && alerteMsgAdresse === false){
            adresseValide = true;
        }
    
        if(document.getElementById("city").value !== "" && alerteMsgVille === false){
            villeValide = true;
        }
    
        if(document.getElementById("email").value !== "" && alerteMsgCourriel === false){
            emailValide = true;
        }
    
        if(
            prenomValide === true &&
            nomValide === true &&
            adresseValide === true &&
            villeValide === true &&
            emailValide === true
        ){
            // creation de l'objet contact
    
            const contact ={
                firstName: document.getElementById("firstName").value,
                lastName : document.getElementById("lastName").value,
                address: document.getElementById("address").value,
                city: document.getElementById("city").value,
                email: document.getElementById("email").value
            };
    
            return contact;
        
        }  // fin du if statement
    }
    
}// fin de la fonction callback createClientPost

function submitForm(e) {
    
    e.preventDefault()
    
    const contact = createClientPost();
    const products = createCommandePost();

    const bodyPost = {contact, products};

    fetch("http://localhost:3000/api/products/order", {

        method: "POST",
        body: JSON.stringify(bodyPost),
        headers: {
            'Accept': 'application/json', 
            'Content-Type': 'application/json'
        } 
    }) 
        .then(function(res){
            if(res.ok){
                return res.json();
            }else{console.log("il y a un problème!");}
        })
        .then(function(data){
            const orderId = data.orderId;
            console.log(orderId);
            window.location.href = "./confirmation.html" + "?orderId=" + orderId
        })
        .catch(function(err){
            console.error(err);
        }); // afficher l'erreur si présente
        
} 

document.querySelector("form").addEventListener("submit", function(e){submitForm(e)});
