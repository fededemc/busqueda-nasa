const API_NASA = "https://images-api.nasa.gov/search?q=";

let inputBuscar = document.getElementById("inputBuscar");
let botonBuscar = document.getElementById("btnBuscar");
let divContenedor = document.getElementById("contenedor");
let divError = document.getElementById("fetch-error");


botonBuscar.addEventListener('click', function (e) {

    fetch(API_NASA+inputBuscar.value)
        .then(respuesta => respuesta.json())
        .then(datos => {
        console.log(datos.collection);

        let htmlContentToAppend = "";

        if (datos.collection.items.length == 0) {
            htmlContentToAppend += `
                  <h1 class="p-3 mb-2 bg-danger text-white">Ups! No se encontraron resultados.</h1>
                `
              divError.innerHTML = htmlContentToAppend;
              divContenedor.innerHTML = "";
          }

        for(let objeto of datos.collection.items){

                htmlContentToAppend += `
                <div class="col">
                <div class="card">
                <img class="card-img-top" src="${objeto.links[0].href}">
                <div class="card-body">
                  <h5 class="card-title">${objeto.data[0].title}</h5>
                  <p class="card-text">${objeto.data[0].description}</p>
                </div>
                </div>
                </div>
              `
    
            divContenedor.innerHTML = htmlContentToAppend;
            divError.innerHTML = "";
        }


});

} )