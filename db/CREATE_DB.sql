SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

/*BASE DE DATOS SOUNDLIB*/
DROP DATABASE IF EXISTS soundlib;
CREATE DATABASE soundlib DEFAULT CHARACTER SET latin1 COLLATE latin1_spanish_ci;
USE soundlib;

/*TABLAS*/

/*tabla usuarios*/
CREATE TABLE Users (
    UserID int not null UNIQUE AUTO_INCREMENT,
    Nombre varchar(255),
    Apellidos varchar(255),
    Alias varchar(255) not null UNIQUE,
	Username varchar(255) UNIQUE,
	displayName varchar(255),	
    Email varchar(255) UNIQUE,
    Password varchar(255) not null,
	ID_key varchar(255) not null UNIQUE,
	token varchar(255) UNIQUE,
	local int,
	twitter int,
	google int,
	facebook int,	
    PRIMARY KEY (UserID)
	);

/*SOPORTES*/
CREATE TABLE Soportes(
    SoporteID int not null UNIQUE AUTO_INCREMENT,
    Tipo varchar(255) not null
    );

/*GENEROS*/
CREATE TABLE Generos(
	GeneroID int not null UNIQUE AUTO_INCREMENT,
	GeneroNombre varchar(255) not null,
	PRIMARY KEY (GeneroID)
	);

/*DISCOS*/
CREATE TABLE Discos (
    DiscoID int not null UNIQUE AUTO_INCREMENT,    
    Album varchar(255) not null,
    Artista varchar(255),	
	year int,
    Genero varchar(255) not null,
    SoporteID int not null,
    Etiquetado varchar(255),
    Identificadores varchar(255),
	Discografica varchar(255),
	Img_cover int,
	Img_back int,
    PRIMARY KEY (DiscoID)
	);
/*COVERS*/
/*
CREATE TABLE Covers (
	CoverID int not null UNIQUE AUTO_INCREMENT,
	FileName varchar(255) not null,
	Tipo enum ('Cover', 'Back') not null,
	FullFileName varchar(255) not null UNIQUE,	
	Tamaño enum ('S', 'M', 'L', 'XL') not null,	
	PRIMARY KEY (CoverID)	
	);
*/

/*FONOTECAS*/
CREATE TABLE Fonotecas(
    FonoID int not null UNIQUE AUTO_INCREMENT,
    Nombre varchar(255) not null,
    UserID int not null,
    PRIMARY KEY (FonoID)    
    );
	
/*FONOTECASDATA*/

CREATE TABLE FonotecasData(
    FonotecasDataID int not null UNIQUE AUTO_INCREMENT,
	FonoID int not null,
    DiscoID int not null,
    FechaRegistro datetime not null,
    NumItems int not null,
	PRIMARY KEY (FonotecasDataID),
	FOREIGN KEY (FonoID) REFERENCES Fonotecas(FonoID)
    );  

/*CANCIONES*/

CREATE TABLE Canciones(
	CancionID int not null UNIQUE AUTO_INCREMENT,
    Titulo varchar(255) not null,
    Pista int,
    Duracion time,
    Artistas TEXT,
	DiscoID int,
    PRIMARY KEY (CancionID)	
    );

/*CONSTRAINTS*/
/*
ALTER TABLE Discos ADD FOREIGN KEY Chk_cover (Img_cover) REFERENCES Covers(CoverID);
ALTER TABLE Discos ADD FOREIGN KEY Chk_back (Img_back) REFERENCES Covers(CoverID);
*/
ALTER TABLE Discos ADD FOREIGN KEY Chk_soporteId (SoporteID) REFERENCES Soportes(SoporteID);
ALTER TABLE Fonotecas ADD FOREIGN KEY Chk_userId (UserID) REFERENCES Users(UserID);
ALTER TABLE FonotecasData ADD FOREIGN KEY Chk_fonoId (FonoID) REFERENCES Fonotecas(FonoID);
ALTER TABLE Canciones ADD FOREIGN KEY chk_discoId (DiscoID) REFERENCES Discos(DiscoID);