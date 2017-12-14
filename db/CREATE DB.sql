SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

/*BASE DE DATOS SOUNDLIB*/
DROP DATABASE IF EXISTS soundlib;
CREATE DATABASE soundlib DEFAULT CHARACTER SET latin1 COLLATE latin1_spanish_ci;
USE soundlib;

/*tabla usuarios*/
CREATE TABLE Users (
    UserID int not null UNIQUE AUTO_INCREMENT,
    Nombre varchar(255),
    Apellidos varchar(255),
    Alias varchar(255) not null UNIQUE,
    Email varchar(55) not null UNIQUE,
    Password varchar(255) not null,
	ID_key varchar(25) not null UNIQUE,
    PRIMARY KEY (UserID)
	);
	
	CREATE TABLE Soportes(
    SoporteID int not null UNIQUE AUTO_INCREMENT,
    Tipo varchar(255) not null
    );
	
	CREATE TABLE Generos(
	GeneroID int not null UNIQUE AUTO_INCREMENT,
	GeneroNombre varchar(255) not null,
	PRIMARY KEY (GeneroID)
	);

CREATE TABLE Discos (
    DiscoID int not null UNIQUE AUTO_INCREMENT,    
    Album varchar(225) not null,
    Artista varchar(255),	
	Año datetime,
    Genero varchar(255) not null,
    SoporteID int not null,
    Etiquetado varchar(255),
    Identificadores varchar(255),
	Discografica varchar(255),
	Img_cover int,
	Img_back int,
    PRIMARY KEY (DiscoID),
	CONSTRAINT Chk_ImgCover (CHECK Img_cover IN (SELECT CoverID FROM Covers)),
	CONSTRAINT Chk_ImgBack (CHECK Img_back IN (SELECT CoverID FROM Covers)),
    FOREIGN KEY (SoporteID) REFERENCES Soportes(SoporteID)	
	);
	
CREATE TABLE Covers (
	CoverID int not null UNIQUE AUTO_INCREMENT,
	FileName varchar(255) not null,
	Tipo enum ('Cover', 'Back') not null,
	FullFileName varchar(255) not null UNIQUE,	
	Tamaño enum ('S', 'M', 'L', 'XL') not null,	
	PRIMARY KEY (CoverID)	
	);	

CREATE TABLE Fonotecas(
    FonoID int not null UNIQUE AUTO_INCREMENT,
    Nombre varchar(255) not null,
    UserID int not null,
    PRIMARY KEY (FonoID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
    );

CREATE TABLE FonotecasData(
    FonotecasDataID int not null UNIQUE AUTO_INCREMENT,
    DiscoID int not null,
    FechaRegistro datetime not null,
    NumItems int not null,
	FonoID int not null,
	PRIMARY KEY (FonotecasDataID),
	FOREIGN KEY (FonoID) REFERENCES Fonotecas(FonoID)
    );
    
CREATE TABLE Generos(
    GeneroID int not null UNIQUE AUTO_INCREMENT,
    GeneroNombre varchar(255) not null,
    PRIMARY KEY (GeneroID)
    );

CREATE TABLE Estilos(
    EstiloID int not null UNIQUE AUTO_INCREMENT,
    GeneroID int not null,
    EstiloNombre varchar(255) not null,
    PRIMARY KEY (EstiloID),
    FOREIGN KEY (GeneroID) REFERENCES Generos(GeneroID)
    );
    
CREATE TABLE Canciones(
	CancionID int not null UNIQUE AUTO_INCREMENT,
    Titulo varchar(255) not null,
    Pista int,
    Duracion time,
    Artistas TEXT,
	DiscoID int,
    PRIMARY KEY (CancionID),
	FOREIGN KEY (DiscoID) REFERENCES Discos(DiscoID)	
    );