
/* CE MORCEAU DE CODE DEVRA ETRE SUPPRIME

window.addEventListener('load', function(){

    console.log("page entierement chargée");
});

*/


/* CE SCRIPT CONCERNE LA PAGE INDEX */

fetch("http://localhost:3000/api/products")
  .then(function(res) {
    if (res.ok) {
      return res.json();                  // que fait cette méthode?
    }
  })
  .then(function(value) {
    console.log(value);

    const tableauDeResultat = value;

    tableauDeResultat.forEach(element => {
        console.log(element.colors);

        // On cree un lien <a> pour chaque article

        const lienProduit = document.createElement("a");

        document.getElementById('items').appendChild(lienProduit);

        


        // On cree un article pour chaque canapé
        const articleCanape = document.createElement("article");
        
        lienProduit.appendChild(articleCanape);

        // on cree une balise image, une balise titre h3, p 

        const imageCanape = document.createElement("img");
        const titreCanape = document.createElement("h3");
        const descripCanape = document.createElement("p");

        articleCanape.appendChild(imageCanape);
        articleCanape.appendChild(titreCanape);
        articleCanape.appendChild(descripCanape);

        imageCanape.src = element.imageUrl;
        imageCanape.alt = element.altTxt;

        titreCanape.textContent = element.name;
        descripCanape.textContent = element.description;

        // On prepare le terrain pour la page produit qui decoulera d'un click
        lienProduit.href = "./product.html?id="+ element._id;   
        
        /* Attention on n'utilise pas d'eventListener:
        
        On va transmettre l'element.id (et pas le nom), il sera inclus dans l'url ici
         et c'est tout, on n'a pas d'autre fonctions à gérer */

    });

  })
  .catch(function(err) {
    console.log(err);
  });

/* FIN FIN FIN FIN FIN FIN -------CE SCRIPT CONCERNE LA PAGE INDEX  ----------- FIN FIN FIN FIN FIN*/




