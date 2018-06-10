//  ./public/js/changeView.js

//var esMosaico = true;     //Define el modo de visión: mosaico o lista.
//var idActivo = '';


//Elimina todos los elementos del mainRow
function removeElements() {
    var mainRowChild = document.getElementById('mainRow').childNodes;
    while (mainRowChild.length > 0) {
        document.getElementById('mainRow').removeChild(mainRowChild[0]);
    }
}
;
//Llama a las funciones q generan las vistas mosáico o lista.
function changeMode(data) {
    activeId = null;
    avtiveDiv = null;
    isActive = false;

    removeElements();
    if (commonData.esMosaico.get()) {
        //f302
        //<i class="far fa-newspaper"></i>
        document.getElementById('modo').setAttribute('class',"far fa-newspaper" );
        commonData.esMosaico.set(false);
        //getAll(genImageList);
        genImageList(data);

    }
    else {
        //f022
        //<i class="far fa-list-alt"></i>
        document.getElementById('modo').setAttribute('class',"far fa-list-alt");
        commonData.esMosaico.set(true);
        //getAll(genImageMosaico);
        genImageMosaico(data);
    }
}
;
function test(id) {
    //alert(id);
    var clase1 = 'col-xs-12 col-sm-6 col-md-4 col-lg-3 main-col-mosaic';
    var clase2 = 'col-6';
    var valor = document.getElementById(id).getAttribute('class');

    switch (valor) {

        case clase1:
            document.getElementById(id).setAttribute('class', clase2);
            doQuerySongsByAlbum('http://127.0.0.1/canciones', id, showData);
            break;

        case clase2:
            document.getElementById(id).setAttribute('class', clase1);
            break;
    }
}
;
function showData(data) {
    var data = JSON.parse(data);
    for (var i = 0; i < data.length; i++) {
        for (var key in data[i]) {
            alert(data[i][key]);
        }
    }
}
;