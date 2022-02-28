
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

// on va créer une fonction calculTotal

async function loadFinalTableau(url){

    try{

        const vaChercherTab = await loadListProduct(url);

        console.log(vaChercherTab);

        //ici je vais insérer ma fonction de création d'élément de DOM

        for (let kanap of vaChercherTab){
            ajouterArticle(kanap);
        }
        // MA FONCTION TOTAL
        console.log(vaChercherTab);
        // le code pour additionner le coût total

        let total = 0;
        let totalQuantity = 0; 
        for(let kanap of vaChercherTab){

            let leNombre = parseInt(kanap.nombre);
            total = total + leNombre * kanap.price;
            totalQuantity = totalQuantity + leNombre;
        }
        console.log(total); 

        document.getElementById("totalPrice").textContent = total;
        document.getElementById("totalQuantity").textContent = totalQuantity;
        
        // FIN DE MA FONCTION TOTAL

        // Ci-dessous le code pour supprimmer (delete) les canapés

        const lesBoutonsDelete = document.querySelectorAll(".deleteItem")
        
        for (let elts of lesBoutonsDelete){

            elts.addEventListener("click", function(e){

                console.log(e.target.closest("article"));

                console.log(e.target.closest("article").dataset.id);

                console.log(e.target.closest("article").dataset.color);

                // tu as récupéré l'identifiant et la couleur => tu supprimes dans le dataStorage

                // tu supprimes dans le listProdCommandes

                for(let i=0; i<monStockageJS.length; i++){

                    if(monStockageJS[i].idt === e.target.closest("article").dataset.id){

                        // expulsion du i.idt du tableau d'objet

                        let articleToSuppress = document.getElementById(monStockageJS[i].idt);
                        console.log(articleToSuppress);
                        document.getElementById("cart__items").removeChild(articleToSuppress);

                        console.log(monStockageJS.splice(i, 1));

                        // maintenant il faut transformer le localStorage

                        const monStokageJSON = JSON.stringify(monStockageJS);
                        
                        localStorage.setItem("obj", monStokageJSON);
                        
                        console.log(localStorage);

                    }else{

                        console.log("non c'est pas lui");
                    
                    }
                }

            });
        }

        // ci-dessous le code pour modifier le nombre de canapés

        // on va utiliser l'élément de DOM suivant: input de type number "change"

        const lesBoutonsModifs = document.querySelectorAll(".itemQuantity");
        
        for(let elts of lesBoutonsModifs){

            elts.addEventListener("change", function(e){

                console.log(e.target.value);

                let nouveauNombre = e.target.value;

                for(let i=0; i<monStockageJS.length; i++){

                    if(monStockageJS[i].idt === e.target.closest("article").dataset.id){
        
                        monStockageJS[i].nombre = nouveauNombre;

                        monStokageJSON = JSON.stringify(monStockageJS);
                        
                        localStorage.setItem("obj", monStokageJSON);
                        
                        console.log(localStorage);
        
                    }
                }

            });
        
        }

        


    }catch(error){
        console.log(error);
    }
}

loadFinalTableau("http://localhost:3000/api/products");

//   Ci-dessous on va travailler sur la suppression d'un canapé, choix 

/* 
    EVENTListener sur querySelector .deleteItem    MAIS il va falloir utiliser 

    la callback du querySelector va impacter le  

    listProdCommandes      ou le vaChercherTab   / le DOM  / le localStorage

    Element.closest 



*/




