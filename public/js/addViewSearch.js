/*
 * Función para realizar las busquedas en la Web Discog.
 * Esta función devuelve una objeto de la forma llave = valor con los parámetros de la búsqueda.
 * URL: https://api.discogs.com/database/search?title=back to black&type=release&per_page=3&page=1
 * 
 
 /database/search?type=album&release_title=back to black&artist=Amy&per_page=3&page=1

type => String. One of release, master, artist, label

title           => Search by combined “Artist Name - Release Title” title field.

release_title   => Search release titles.

credit          => Search release credits.

artist          => Search artist names.

anv             => Search artist ANV.

label           => Search label names.

genre           => Search genres. Example: rock

style           => Search styles. Example: grunge

country         => Search release country.

year            => Search release year.

format          => Search formats. Example: album, CD, Vynl

catno           => Search catalog number. Example: DGCD-24425

barcode         => Search barcodes. Example: 7 2064-24425-2 4

track           => Search track titles.
 */


function paginationParam(per_page, page){
    if(arguments.length === 1){        
        this.page = 1;
    }else{        
        this.page = page;
    }
    this.per_page = per_page;
};
function searchParam(type,title,release_title,credit, artist, anv, label, genre, style, country, year, format, catno, barcode, track){
    this.type = type;
    this.title = title;
    this.release_title = release_title;
    this.credit = credit;
    this.artist = artist;
    this.anv = anv;
    this.label = label;
    this.genre = genre;
    this.style = style;
    this.country = country;
    this.year = year;
    this.format = format;
    this.catno = catno;
    this.barcode = barcode;
    this.track = track;
};

/*
 * Devuelve una cadena type=valor1&release=valor2&per_page=1&page=1
 */
function getParamsString(paramsObject){
    var searchString = null;    
    for (var param in paramsObject){
        if(!!paramsObject[param]){
            if(!searchString){
                searchString = param + "=" + paramsObject[param];
            }else{
                searchString += "&" + param + "=" + paramsObject[param];
            }
        }
    }    
    if(!searchString){        
        return null;
    }    
    return searchString;
};
function getPaginationString(pagObject){
    var pagString = null;    
    for(var key in pagObject){
        pagString += "&" + pagObject[key];        
    }
    return pagString;
};

