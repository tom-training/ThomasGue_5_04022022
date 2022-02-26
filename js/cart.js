
// Nous sommes sur la page panier

// D'abord on récupère du localStorage : un tableau d'objet 

console.log(localStorage);

console.log(localStorage.getItem("obj"));
const monStockageJSON = localStorage.getItem("obj");
const monStockageJS = JSON.parse(monStockageJSON);

console.log(monStockageJS);

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
        console.log(tableauVide);
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

            listProduct.forEach(function(product) {
            console.log(product.name);
            });

            let listProdCommandes= [];

            for(let element of monStockageJS){
                
                console.log(element.idt);

                for(let elt of listProduct){

                    if(element.idt === elt._id){

                        console.log(`c'est le produit ${elt.name} avec l'identifiant ${elt._id}`);

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
            console.log(listProdCommandes);
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
    prixElt.textContent = objKanap.price;
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

        console.log(vaChercherTab);

        //ici je vais insérer ma fonction de création d'élément de DOM

        for (let kanap of vaChercherTab){
            ajouterArticle(kanap);
        }

    }catch(error){

        console.log(error);

    }

}

loadFinalTableau("http://localhost:3000/api/products");

//   Ci-dessous on va travailler sur la suppression d'un canapé, choix 


