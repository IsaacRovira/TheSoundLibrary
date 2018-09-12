/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var createTables = {
    canciones:  "CREATE TABLE IF NOT EXIST canciones (cancionID INT PRIMARY KEY, titulo TEXT NOT NULL, pista int DEFAULT NULL, duracion TEXT DEFAULT NULL, artistas TEXT, dicoID INT NOT NULL, FOREGIN KEY (discoID) REFERENCES discos (discoID));",
    discos: "CREATE TABLE IF NOT EXIST discos (discoID INT PRIMARY KEY, album TEXT NOT NULL, artista TEXT DEFAULT NULL, year INT DEFAULT NULL, genero TEXT NOT NULL, soporteID INT NOT NULL, etiquetado TEXT DEFAULT NULL, identificadores TEXT DEFAULT NULL, discografica TEXT DEFAULT NULL, img_cover TEXT DEFAULT NULL, img_backcover TEXT DEFAULT NULL);",
    fonotecasdata: "CREATE TABLE IF NOT EXIST fonotecasdata (fonotecasdataID INT PRIMARY KEY, userID INT NOT NULL, discoID INT NOT NULL, fecharegistro TEXT NOT NULL, numitems INT NOT NULL, FOREGIN KEY (discoID) REFERENCES discos (discoID), FOREGIN KEY (userID) REFERENCES users (userID));",
    generos: "CREATE TABLE IF NOT EXIST generos (generoID INT PRIMARY KEY, generonombre TEXT NOT NULL);",
    soportes: "CREATE TABLE IF NOT EXIST soportes (soporteID INT PRIMARY KEY, tipo TEXT NOT NULL);",
    users: "CREATE TABLE IF NOT EXIST users (userID PRIMARY KEY, nombre TEXT DEFAULT NULL, username TEXT DEFAULT NULL, displayname TEXT DEFAULT NULL, email TEXT DEFAULT NULL, password TEXT NOT NULL, id_key TEXT NOT NULL, token TEXT NOT NULL, local INT DEFAULT NULL, twitter INT DEFAULT NULL,google INT DEFAULT NULL, facebook INT DEFAULT NULL);"    
};