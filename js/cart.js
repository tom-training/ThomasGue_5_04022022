
// Nous sommes sur la page panier

// D'abord on récupère du localStorage : un tableau d'objet 

//console.log(localStorage);

//console.log(localStorage.getItem("obj"));
const monStockageJSON = localStorage.getItem("obj");
const monStockageJS = JSON.parse(monStockageJSON);

//console.log(monStockageJS);

// ensuite on a rédigé ici une fonction qui permet quand on l'appelle de récupérer 
//toute les données de l'API

function requeterAPI(url, tableauVide){

    fetch(url)

    .then(function(res){
        if(res.ok){
            return res.json();
        }
    })

    .then(function(value){

        tableauVide = value;
        //console.log(tableauVide);
        return tableauVide;
    })
    .catch(function(err){

        return err;
    });
}

const tableauDobjet = [];
requeterAPI("http://localhost:3000/api/products", tableauDobjet);

// INSERER UN TRY / CATCH   - DEMANDER A JORDAN   -- INSERER UN TRY / CATCH   - DEMANDER A JORDAN
async function loadAPI(url){

    try{
        
            const response = await fetch(url);

            //console.log(await response.json());

            return await response.json();
    
    }catch(error){
            console.log(error);
    }
}

const loadListProduct = async function(urll){

    try{
            let listProduct = await loadAPI(urll);

            let listProdCommandes= [];

            for(let element of monStockageJS){
                
                //console.log(element.idt);

                for(let elt of listProduct){  // elt._id viennent de l'API donnant un tableau listProduct

                    if(element.idt === elt._id){  //element.idt vient du tableau monStockageJS

                        //console.log(`c'est le produit ${elt.name} avec l'identifiant ${elt._id}`);

                        // le code pour insérer le produit

                        /* if structure, on boucle sur for(let el of listProdCommandes){

                        } */

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
            //console.log(listProdCommandes);
            return listProdCommandes;

        }catch(error){
            console.log(error);
        }    
};


loadListProduct("http://localhost:3000/api/products");


function ajouterArticle(objKanap){

    const articleElt = document.createElement("article");
    articleElt.id = objKanap.idt;
    articleElt.setAttribute('data-id', objKanap.idt);
    articleElt.setAttribute('data-color', objKanap.couleur);
    
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
    
    const breakElt = document.createElement("br");
    articleElt.appendChild(breakElt);

    const lineElt = document.createElement("hr");
    articleElt.appendChild(lineElt);


    // il vaut raccorder l'article à son parent tout en dernier
    document.getElementById("cart__items").appendChild(articleElt);

} 

async function loadFinalTableau(url){

    try{

        const vaChercherTab = await loadListProduct(url);

        //console.log(vaChercherTab);

        //ici je vais insérer ma fonction de création d'élément de DOM

        for (let kanap of vaChercherTab){
            ajouterArticle(kanap);
        }
        // MA FONCTION TOTAL
        //console.log(vaChercherTab);
        // le code pour additionner le coût total

        function faireLeTotal(){
            let total = 0;
            let totalQuantity = 0; 
            for(let kanap of vaChercherTab){
    
                let leNombre = parseInt(kanap.nombre);
                total = total + leNombre * kanap.price;
                totalQuantity = totalQuantity + leNombre;
            }
            //console.log(total); 
    
            document.getElementById("totalPrice").textContent = total;
            document.getElementById("totalQuantity").textContent = totalQuantity;
        }

        // Ci-dessous le code pour supprimmer (delete) les canapés

        const lesBoutonsDelete = document.querySelectorAll(".deleteItem")
        
        for (let elts of lesBoutonsDelete){

            elts.addEventListener("click", function(e){

                //console.log(e.target.closest("article"));

                //console.log(e.target.closest("article").dataset.id);

                //console.log(e.target.closest("article").dataset.color);

                // tu as récupéré l'identifiant et la couleur => tu supprimes dans le dataStorage

                // tu supprimes dans le listProdCommandes

                for(let i=0; i<monStockageJS.length; i++){

                    if(monStockageJS[i].idt === e.target.closest("article").dataset.id){

                        // expulsion du i.idt du tableau d'objet

                        let articleToSuppress = document.getElementById(monStockageJS[i].idt);
                        //console.log(articleToSuppress);
                        document.getElementById("cart__items").removeChild(articleToSuppress);

                        monStockageJS.splice(i, 1);
                        //console.log(monStockageJS.splice(i, 1));

                        // maintenant il faut transformer le localStorage

                        const monStokageJSON = JSON.stringify(monStockageJS);
                        
                        localStorage.setItem("obj", monStokageJSON);
                        
                        //console.log(localStorage);

                    }else{

                        console.log("non c'est pas lui");
                    
                    }
                }

                faireLeTotal();

            });
        }

        // ci-dessous le code pour modifier le nombre de canapés

        // on va utiliser l'élément de DOM suivant: input de type number "change"

        const lesBoutonsModifs = document.querySelectorAll(".itemQuantity");
        
        for(let elts of lesBoutonsModifs){

            elts.addEventListener("change", function(e){

                //console.log(e.target.value);

                let nouveauNombre = e.target.value;

                for(let i=0; i<monStockageJS.length; i++){

                    if(monStockageJS[i].idt === e.target.closest("article").dataset.id){
        
                        monStockageJS[i].nombre = nouveauNombre;

                        monStokageJSON = JSON.stringify(monStockageJS);
                        
                        localStorage.setItem("obj", monStokageJSON);
                        
                        //console.log(localStorage);
        
                    }
                }

                faireLeTotal();

            });
        
        }

        faireLeTotal();

        return vaChercherTab;     // attention ce tableau n'est pas peut-être pas à jour des modifs et suppression eventuelles


    }catch(error){
        console.log(error);
    }
}

loadFinalTableau("http://localhost:3000/api/products");

// Travail sur la validation des champs du formulaire

document.getElementById("firstName").addEventListener("focus", function () {
    document.getElementById("firstNameErrorMsg").textContent = "Entrez votre prénom";
});

// CONTRÔLE CHAMP PRENOM

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

// CONTRÔLE CHAMP NOM

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

// CONTRÔLE CHAMP ADRESSE

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

// CONTRÔLE CHAMP VILLE

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
// Ce contrôle n'est PAS INDISPENSABLE

document.getElementById("firstName").addEventListener("input", function (e) {
    let prenomSaisie = e.target.value; 
    
    let aidePrenom = document.getElementById("firstNameErrorMsg");
    aidePrenom.textContent = "vous avez tapé : " + prenomSaisie; 
    
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


// ENVOI DES DONNÉES À L'API PAR UNE REQUÊTE POST

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



/*
document.querySelector("form").addEventListener("submit", function(e){

    e.preventDefault();
    console.log("hello world");

});
*/


function createClientPost(){

    //let formulaireFini = await loadFinalTableau("http://localhost:3000/api/products");

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
            console.log("ca part");
    
            const contact ={
                firstName: document.getElementById("firstName").value,
                lastName : document.getElementById("lastName").value,
                address: document.getElementById("address").value,
                city: document.getElementById("city").value,
                email: document.getElementById("email").value
            };
    
            console.log(contact);
    
            return contact;
        
        }  // fin du if statement
    }
    
}// fin de la fonction callback createClientPost

/*
document.querySelector("form").addEventListener("submit", function(e){
    
        e.preventDefault();
        const contact = createClientPost();
        const product = createCommandePost();

        console.log(contact);

        const bodyPoste = JSON.stringify({contact, product});

        console.log(bodyPoste);

        fetch("http://localhost:3000/api/products/order", 
        {
            method: "POST",
            headers: {
                    'Accept': 'application/json', 
                    'Content-Type': 'application/json'
                    },
            body: JSON.stringify({contact, product})
        }
            )
            .then(function(response) {
            if (response.ok) {
                                return response.json();
            }else{
                            console.log("il n'y a pas de response?");
            }
            })
            .then(function(data) {
            console.log(data.orderId);
            })
            .catch(
                function(error){
                    console.log("problème avec fetch: " + error.message);
                }
            );
        
});

*/



function submitForm(e) {
    e.preventDefault()
    
    const contact = createClientPost();
    const products = createCommandePost();

    console.log(contact);
    console.log(products);

    console.log(typeof(products[0]));

    const bodyPost = {contact, products};

    console.log(bodyPost);
    //console.log(JSON.stringify(bodyPost));

    fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        body: JSON.stringify(bodyPost),
        headers: {
            'Accept': 'application/json', 
            'Content-Type': 'application/json'
        } 
    }) 
        .then((res) => res.json())
        .then((data) => {
            const orderId = data.orderId
            console.log(orderId);
            
            //window.location.href = "./confirmation.html" + "?orderId=" + orderId
          })
        .catch((err) => console.error(err)) // afficher l'erreur si présente
        //console.log(form.elements.value)
} 


document.querySelector("#order").addEventListener("click", function(e){submitForm(e)});
