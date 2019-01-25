//  ./public/js/orderFunction.js
/*
 * Ordenar commonData.datosDiscos
 * 
 * (4) […]
​ *
 *  0: {…}
​​ *
 *  album: "Back To Black"
​​ *
 *  artista: ""
​​ *
 *   discoID: 169
 *​​
 *   discografica: ""
​ *​
 *   etiquetado: ""
 *​​
 *   genero: "Soul"
 *​​
 *   identificadores: ""
​ *​
 *   img_backcover: ""
 *​​
 *   img_cover: "cover_id169_(225x225).jpg"
 *​​
 *   tipo: "CD"
 *​​
 *   year: 2006
 *​​
 *   <prototype>: Object { … }
 *​
 *   1: Object { discoID: 171, album: "Live In Paradiso", genero: "Concert", … }
​
 *   2: Object { discoID: 170, album: "Frank", genero: "Pop", … }
​
 *   3: Object { discoID: 172, album: "Greatest Hits", img_cover: "cover_id172_(225x225).jpg", … }
 *​
 *   length: 4
 */

/*
 * Ordena la matriz commonData.datosDiscos()
 * @param {string} id
 * @returns {undefined}
 */
function orderByMe(id){
    console.log("Modo: ", commonData.currentMode.get());
    switch(commonData.currentMode.get()[0]){
        case "fonoteca":
        case "discog":
        default:
            ordenarDatosDiscos(commonData.datosDiscos.get(), id.split("-")[0], id.split("-")[1], commonData.datosDiscos.set);
            break;
    }
};


/*
 * 
 * @param {array[object]} datos
 * @param {string} campo
 * @param {int} direccion
 * @param {function} callback
 * @returns {undefined}
 */
function ordenarDatosDiscos(datos, campo, direccion, callback) {
    console.log("Datos: ", datos);
    console.log("Campo: ", campo);
    console.log("Dirección: ", direccion);
    
    for(var i = 0; i < datos.length; i++){            
        for(var j = i+1; j < datos.length; j++){
            switch(campo){
                case "discoID":
                case "year":
                    switch(direccion){
                        case "asc":
                            if(datos[j][campo] < datos[i][campo]) datos = intercambiar(datos,i,j);
                            break;
                        case "desc":
                            if(datos[i][campo] < datos[j][campo]) datos = intercambiar(datos,i,j);
                            break;
                    }
                    break;
                default:
                    switch(direccion){
                        case "asc":
                            if(datos[j][campo].localeCompare(datos[i][campo]) < 0) datos = intercambiar(datos,i,j);
                            break;
                        case "desc":
                            if(datos[i][campo].localeCompare(datos[j][campo]) < 0) datos = intercambiar(datos,i,j);
                            break;
                    }
                break;
            }
        }
    }
    callback(datos);
};
    
function intercambiar(data, posA, posB){
    var temp = data[posA];
    data[posA] = data[posB];
    data[posB] = temp;

    return data;
};

/*
 * FALTA CORREGIR LOS CAMPOS DE BÚSQUEDA PARA EL MODO AÑADIR(DISCOG)- SON DIFERENTES DE LOS DE FONOTECA.
 */