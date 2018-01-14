USE soundlib;
INSERT INTO Soportes (Tipo) values ("CD"), ("VINILO"), ("DVD");

INSERT INTO Generos (GeneroNombre) values ("Alt. Rock"), ("Alternative"), ("Blues"), ("Blues/R&B"), ("Britpop"), ("Children's"), ("Clásica"), ("Clásicos pop"), ("Concert"), ("Easy Listening"), ("Electrónica"), ("Desconocido"), ("Indie Rock"), ("Jazz"), ("Jazz Vocal"), ("Latin"), ("OST"), ("Pop"), ("Punk"), ("Punk Rock"), ("R&B"), ("R&B/Soul"), ("Reggae"), ("Rock"), ("Rock & Roll"), ("Rock clásico"), ("Rock duro"), ("Rock/Pop"), ("Soul"), ("Swing"), ("Rock duro"), ("Metal"), ("Dance"), ("Disco"), ("House"), ("Funk"), ("Ska"), ("Hip hop"), ("Folk"), ("Country"), ("Rap"), ("Techno"), ("Garage");

INSERT INTO Covers (FileName, Tipo, FullFileName, Tamaño) values ("123456.jpg", "Cover", "img/123456.jpg", "M"), ("234567.jpg", "Back", "img/234567.jpg", "M"), ("345678.jpg", "Cover", "img/345678.jpg", "M"), ("456789.jpg", "Back", "img/456789.jpg", "M");

INSERT INTO Discos (Album, Artista, year, Genero, SoporteID, Etiquetado, Identificadores, Discografica, Img_cover, Img_back) values ("Impulse!", "John Coltrane", 1962, "Jazz; New Wave", 1, 2, "DELUXE EDITION", "3145895672", "The Verve Music Group", 1, 2), ("DYLAN", "Bob Dylan", 2007, "ROCK", 1, 3, "Recopilatorio", "8697109542", "Columbia Records", 3, 4);

/*
    DiscoID int not null UNIQUE AUTO_INCREMENT,    
    Album varchar(225) not null,
    Artista varchar(255),	
	year datetime,
    Genero TEXT not null,    
    SoporteID int not null,	
    Etiquetado varchar(255),
    Identificadores varchar(255),
	Discografica varchar(255),
	Img_cover int,
	Img_back int,
	*/
	
	/*
	CoverID int not null UNIQUE AUTO_INCREMENT,
	FileName varchar(255) not null,
	Tipo enum ('Cover', 'Back') not null,
	FullFileName varchar(255) not null UNIQUE,	
	Tamaño enum ('S', 'M', 'L', 'XL') not null,
	*/