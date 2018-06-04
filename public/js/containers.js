//containers

/*
 * Estructuras que representan los contenedores.
 */

var coverPath = commonData.path.get().cover;

var albumDetails ={
    dataDetailsDiv:{
        node        :   'div',
        class       :   'hidden'
    },
    dataSongsDiv:{
        node        :   'div',
        class       :   'hidden'
    },
    albumDataList:{
        node        :   'ul',
        class       :   'albumData'
    },
    songDataList:{
        node        :   'ul',
        class       :   'songData'
    },
    albumDetailsNew :function(){
        var albumDetails = {
            dataDetailsDiv: {
                node: 'div',
                class: 'hidden'
            },
            dataSongsDiv: {
                node: 'div',
                class: 'hidden'
            },
            albumDataList: {
                node: 'ul',
                class: 'albumData'
            },
            songDataList: {
                node: 'ul',
                class: 'songData'
            }
        };
        return albumDetails;
    }
};

var imgContainer ={
    mainDiv     :{        
            node        :   'div',
            class       :   'col-xs-12 col-sm-6 col-md-4 col-lg-3 main-col-mosaic',
            id          :   'id'
        },
        imgDiv      :{
            node        :   'div',
            class       :   'col-12',
            onclick     :   '',
            onhover     :   '',
            id          :   'imgDiv'
        },
        imgTag      :{
            node        :   'img',
            class       :   'col-12',
            alt         :   '',
            src         :   '',
            onerror     :   'this.onerror=null;this.src='+ coverPath +'nopic.png',
            onclick     :   '',
            id          :   'img'
        },
        dataDiv     :{
            node        :   'div',
            class       :   'col-12 infoText',
            id          :   'dataDiv'
        },
        hTag        :{
            node        :   'h4',        
            class       :   ''   
        },
    imgContainerNew     : function(){
        var img = {
                mainDiv     :{        
                    node        :   'div',
                    class       :   'col-xs-12 col-sm-6 col-md-4 col-lg-3 main-col-mosaic',
                    id          :   'id'
                },
                imgDiv      :{
                    node        :   'div',
                    class       :   'col-12',
                    onclick     :   '',
                    onhover     :   '',
                    id          :   'imgDiv'
                },
                imgTag      :{
                    node        :   'img',
                    class       :   'col-12',
                    alt         :   '',
                    src         :   '',
                    onerror     :   'this.onerror=null;this.src='+ coverPath +'nopic.png',
                    onclick     :   '',
                    id          :   'img'
                },
                dataDiv     :{
                    node        :   'div',
                    class       :   'col-12 infoText',
                    id          :   'dataDiv'
                },
                hTag        :{
                    node        :   'h4',        
                    class       :   ''   
                }
            };
        return img;
    }
};