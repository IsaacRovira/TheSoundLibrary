/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var createTables = {
    sqlite:{
        canciones:      "CREATE TABLE canciones ( cancionID INTEGER PRIMARY KEY NOT NULL, titulo TEXT NOT NULL, pista INTEGER DEFAULT NULL, duracion TEXT DEFAULT NULL, artistas TEXT, discoID INTEGER NOT NULL, FOREIGN KEY(discoID) REFERENCES discos('discoID') )",
        discos:         "CREATE TABLE discos( discoID INTEGER PRIMARY KEY NOT NULL, album TEXT NOT NULL, artista TEXT, year INTEGER, genero TEXT NOT NULL, soporteID INTEGER NOT NULL, etiquetado TEXT, identificadores TEXT, discografica TEXT, img_cover TEXT, img_backcover TEXT, FOREIGN KEY(soporteID) REFERENCES soportes(soporteID) )",
        fonotecasdata:  "CREATE TABLE fonotecasdata( fonotecasDataID INTEGER PRIMARY KEY NOT NULL, userID INTEGER NOT NULL, discoID INTEGER NOT NULL, fechaRegistro TEXT, numItems INTEGER, FOREIGN KEY (userID) REFERENCES users(userID), FOREIGN KEY (discoID) REFERENCES discos(discoID) )",
        soportes:       "CREATE TABLE soportes( soporteID INTEGER PRIMARY KEY NOT NULL, tipo TEXT NOT NULL )",
        users:          "CREATE TABLE users( userID INTEGER PRIMARY KEY NOT NULL, nombre TEXT, userName TEXT UNIQUE, displayNmae TEXT, email TEXT UNIQUE, password TEXT NOT NULL, ID_key TEXT NOT NULL UNIQUE, token TEXT UNIQUE, local INTEGER UNIQUE, twitter INTEGER UNIQUE, google INTEGER UNIQUE, facebook INTEGER UNIQUE)"
    },
    mysql:{
        canciones:  "CREATE TABLE IF NOT EXIST canciones (cancionID INT PRIMARY KEY, titulo TEXT NOT NULL, pista int DEFAULT NULL, duracion TEXT DEFAULT NULL, artistas TEXT, dicoID INT NOT NULL, FOREGIN KEY (discoID) REFERENCES discos (discoID));",
        discos: "CREATE TABLE IF NOT EXIST discos (discoID INT PRIMARY KEY, album TEXT NOT NULL, artista TEXT DEFAULT NULL, year INT DEFAULT NULL, genero TEXT NOT NULL, soporteID INT NOT NULL, etiquetado TEXT DEFAULT NULL, identificadores TEXT DEFAULT NULL, discografica TEXT DEFAULT NULL, img_cover TEXT DEFAULT NULL, img_backcover TEXT DEFAULT NULL);",
        fonotecasdata: "CREATE TABLE IF NOT EXIST fonotecasdata (fonotecasdataID INT PRIMARY KEY, userID INT NOT NULL, discoID INT NOT NULL, fecharegistro TEXT NOT NULL, numitems INT NOT NULL, FOREGIN KEY (discoID) REFERENCES discos (discoID), FOREGIN KEY (userID) REFERENCES users (userID));",
        //generos: "CREATE TABLE IF NOT EXIST generos (generoID INT PRIMARY KEY, generonombre TEXT NOT NULL);",
        soportes: "CREATE TABLE IF NOT EXIST soportes (soporteID INT PRIMARY KEY, tipo TEXT NOT NULL);",
        users: "CREATE TABLE IF NOT EXIST users (userID PRIMARY KEY, nombre TEXT DEFAULT NULL, username TEXT DEFAULT NULL, displayname TEXT DEFAULT NULL, email TEXT DEFAULT NULL, password TEXT NOT NULL, id_key TEXT NOT NULL, token TEXT NOT NULL, local INT DEFAULT NULL, twitter INT DEFAULT NULL,google INT DEFAULT NULL, facebook INT DEFAULT NULL);"
    }        
};

