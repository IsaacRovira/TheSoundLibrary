SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

/*BASE DE DATOS SOUNDLIB*/
DROP DATABASE IF EXISTS soundlib;
CREATE DATABASE soundlib DEFAULT CHARACTER SET latin1 COLLATE latin1_spanish_ci;
USE soundlib;

<<<<<<< HEAD
--TABLAS
=======
/*TABLAS*/
>>>>>>> madrid
/*tabla usuarios*/
CREATE TABLE Users (
    UserID int not null UNIQUE AUTO_INCREMENT,
    Nombre varchar(255),
<<<<<<< HEAD
    Apellidos varchar(255),
    Alias varchar(255) not null UNIQUE,
    Email varchar(55) not null UNIQUE,
    Password varchar(255) not null,
	ID_key varchar(25) not null UNIQUE,
    PRIMARY KEY (UserID)
	);

--SOPORTES	
	CREATE TABLE Soportes(
=======
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
>>>>>>> madrid
    SoporteID int not null UNIQUE AUTO_INCREMENT,
    Tipo varchar(255) not null
    );

<<<<<<< HEAD
--GENEROS
	CREATE TABLE Generos(
=======
/*GENEROS*/
CREATE TABLE Generos(
>>>>>>> madrid
	GeneroID int not null UNIQUE AUTO_INCREMENT,
	GeneroNombre varchar(255) not null,
	PRIMARY KEY (GeneroID)
	);

<<<<<<< HEAD
--DISCOS
CREATE TABLE Discos (
    DiscoID int not null UNIQUE AUTO_INCREMENT,    
    Album varchar(225) not null,
    Artista varchar(255),	
	Año datetime,
=======
/*DISCOS*/
CREATE TABLE Discos (
    DiscoID int not null UNIQUE AUTO_INCREMENT,    
    Album varchar(255) not null,
    Artista varchar(255),	
	year int,
>>>>>>> madrid
    Genero varchar(255) not null,
    SoporteID int not null,
    Etiquetado varchar(255),
    Identificadores varchar(255),
	Discografica varchar(255),
<<<<<<< HEAD
	Img_cover int,
	Img_back int,
    PRIMARY KEY (DiscoID)
	);

--COVERS	
=======
	Img_cover varchar(255),
	Img_backcover varchar(255),
    PRIMARY KEY (DiscoID)
	);

/*COVERS*/
/*	
>>>>>>> madrid
CREATE TABLE Covers (
	CoverID int not null UNIQUE AUTO_INCREMENT,
	FileName varchar(255) not null,
	Tipo enum ('Cover', 'Back') not null,
	FullFileName varchar(255) not null UNIQUE,	
	Tamaño enum ('S', 'M', 'L', 'XL') not null,	
	PRIMARY KEY (CoverID)	
	);	
<<<<<<< HEAD

--FONOTECAS
=======
*/
/*FONOTECAS*/
>>>>>>> madrid
CREATE TABLE Fonotecas(
    FonoID int not null UNIQUE AUTO_INCREMENT,
    Nombre varchar(255) not null,
    UserID int not null,
    PRIMARY KEY (FonoID)    
    );
	
<<<<<<< HEAD
--FONOTECASDATA
=======
/*FONOTECASDATA*/
>>>>>>> madrid
CREATE TABLE FonotecasData(
    FonotecasDataID int not null UNIQUE AUTO_INCREMENT,
    DiscoID int not null,
    FechaRegistro datetime not null,
    NumItems int not null,
	FonoID int not null,
	PRIMARY KEY (FonotecasDataID),
	FOREIGN KEY (FonoID) REFERENCES Fonotecas(FonoID)
    );

<<<<<<< HEAD
--CANCIONES    
=======
/*CANCIONES*/
>>>>>>> madrid
CREATE TABLE Canciones(
	CancionID int not null UNIQUE AUTO_INCREMENT,
    Titulo varchar(255) not null,
    Pista int,
    Duracion time,
    Artistas TEXT,
<<<<<<< HEAD
	DiscoID int,
    PRIMARY KEY (CancionID)	
    );
	
--CONSTRAINTS
ALTER TABLE Discos ADD FOREIGN KEY Chk_cover (Img_cover) REFERENCES Covers(CoverID);
ALTER TABLE Discos ADD FOREIGN KEY Chk_back (Img_back) REFERENCES Covers(CoverID);
ALTER TABLE Discos ADD FOREIGN KEY Chk_soporteId (SoporteID) REFERENCES Soportes(SoporteID));
=======
	DiscoID int not null,
    PRIMARY KEY (CancionID)	
    );
	
/*CONSTRAINTS*/
/*
ALTER TABLE Discos ADD FOREIGN KEY Chk_cover (Img_cover) REFERENCES Covers(CoverID);
ALTER TABLE Discos ADD FOREIGN KEY Chk_back (Img_back) REFERENCES Covers(CoverID);
*/
ALTER TABLE Discos ADD FOREIGN KEY Chk_soporteId (SoporteID) REFERENCES Soportes(SoporteID);
>>>>>>> madrid
ALTER TABLE Fonotecas ADD FOREIGN KEY Chk_userId (UserID) REFERENCES Users(UserID);
ALTER TABLE FonotecasData ADD FOREIGN KEY Chk_fonoId (FonoID) REFERENCES Fonotecas(FonoID);
ALTER TABLE Canciones ADD FOREIGN KEY chk_discoId (DiscoID) REFERENCES Discos(DiscoID);