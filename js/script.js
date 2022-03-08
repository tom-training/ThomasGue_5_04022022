// CE SCRIPT CONCERNE LA PAGE INDEX 
// On va tout d'abord récupérer les données "canapé" à l'aide d'une fetch GET


fetch("http://localhost:3000/api/products")
  .then(function(res) {
    if (res.ok) {
      return res.json();                  
    }
  })
  .then(function(value) {
    console.log(value);

    const tableauDeResultat = value;

    tableauDeResultat.forEach(element => {
        // On cree un lien <a> pour chaque article

        const lienProduit = document.createElement("a");

        document.getElementById('items').appendChild(lienProduit);

        // On crée un article pour chaque canapé
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
    console.error(err);

    const messageErreurDebut = document.createElement("p");
    const messageErreurFin = document.createElement("p");
    const breakElement = document.createElement("br");
   
    messageErreurDebut.textContent = "Il semblerait qu'un problème technique empêche le " + 
    "chargement des informations concernant nos canapés, ";

    messageErreurFin.textContent = "nous nous excusons pour ce désagrément," +
    " veuillez réactualiser la page";

    document.getElementById("items").appendChild(messageErreurDebut);
    document.getElementById("items").appendChild(breakElement);
    document.getElementById("items").appendChild(messageErreurFin);

  });

/* FIN FIN FIN */




