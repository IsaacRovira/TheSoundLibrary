/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package xmltomysql;
import java.sql.*;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.io.*;
import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.Scanner;
import javax.xml.parsers.*;
import javax.xml.parsers.*;
import org.xml.sax.*;
import org.w3c.dom.*;




/**
 *
 * @author Isaac
 */
public class XMLtoMySQL {

    /**
     * @param args the command line arguments
     */
    public static class Album{

        String album;
        String albumArtist;
        String composer;
        String song;
        String genero;
        String año;
        String pista;

        public String getAlbum() {
            return album;
        }
        public void setAlbum(String album) {
            this.album = album;
        }
        public String getAlbumArtist() {
            return albumArtist;
        }
        public void setAlbumArtist(String albumArtist) {
            this.albumArtist = albumArtist;
        }
        public String getComposer() {
            return composer;
        }
        public void setComposer(String composer) {
            this.composer = composer;
        }
        public String getSong() {
            return song;
        }
        public void setSong(String song) {
            this.song = song;
        }
        public String getGenero() {
            return genero;
        }
        public void setGenero(String genero) {
            this.genero = genero;
        }
        public String getAño() {
            return año;
        }
        public void setAño(String año) {
            this.año = año;
        }
        public String getPista() {
            return pista;
        }
        public void setPista(String pista) {
            this.pista = pista;
        }

        public Album(String album, String albumArtist, String composer, String song, String genero, String año, String pista) {
            this.album = album;
            this.albumArtist = albumArtist;
            this.composer = composer;
            this.song = song;
            this.genero = genero;
            this.año = año;
            this.pista = pista;
        }
        public Album(){
            this.album="";
            this.albumArtist="";
            this.composer="";
            this.song="";
            this.genero="";
            this.año="";
            this.pista="";
        }
    }
    public static class Songs{
        String album;
        String song;
        String artist;
        String pista;
        String composer;

        public String getComposer() {
            return composer;
        }

        public void setComposer(String composer) {
            this.composer = composer;
        }
        
        public String getPista() {
            return pista;
        }

        public void setPista(String pista) {
            this.pista = pista;
        }        
        
        public String getAlbum() {
            return album;
        }

        public void setAlbum(String album) {
            this.album = album;
        }

        public String getSong() {
            return song;
        }

        public void setSong(String song) {
            this.song = song;
        }

        public String getArtist() {
            return artist;
        }

        public void setArtist(String artist) {
            this.artist = artist;
        }

        public Songs() {
        }

        public Songs(String album, String song, String artist, String pista, String composer) {
            this.album = album;
            this.song = song;
            this.artist = artist;
            this.pista = pista;
            this.composer = composer;
        }        
    }
    
    public static void main(String[] args) {
        
        Scanner teclado = new Scanner(System.in);
        for(int i = 0; i<15; i++){
            System.out.println();            
        }
        ArrayList<Album> album = new ArrayList();
        ArrayList<Songs> songs = new ArrayList();
               
        try{
            File xmlFile = new File("h:\\tmp\\Biblioteca.xml");
            DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
            Document doc = dBuilder.parse(xmlFile);
            
            doc.getDocumentElement().normalize();
            
            //System.out.println("Root element: " + doc.getDocumentElement().getNodeName());
            
            NodeList nList = doc.getElementsByTagName("key");
            Album disco = new Album();
            Songs cancion = new Songs();
            boolean existe = true;
            
            for(int i=0; i<nList.getLength(); i++){
                
                //System.out.println(nList.item(i).getTextContent());
                //System.out.println(nList.item(i).getTextContent()+" - "+ nList.item(i).getNextSibling().getTextContent()+"\n");
                if(nList.item(i).getTextContent().equals("Track ID")){
                    disco = new Album();
                    cancion = new Songs();
                    existe = true;
                }
                switch(nList.item(i).getTextContent()){
                    case "Name": cancion.setSong(nList.item(i).getNextSibling().getTextContent());break;
                    case "Artist": cancion.setArtist(nList.item(i).getNextSibling().getTextContent());break;
                    case "Composer": cancion.setComposer(nList.item(i).getNextSibling().getTextContent());break;
                    case "Album":
                        cancion.setAlbum(nList.item(i).getNextSibling().getTextContent());                        
                        disco.setAlbum(cancion.getAlbum());                        
                        break;
                    case "Genre": disco.setGenero(nList.item(i).getNextSibling().getTextContent()); break;
                    case "Track Number": cancion.setPista(nList.item(i).getNextSibling().getTextContent()); break;
                    case "Year": disco.setAño(nList.item(i).getNextSibling().getTextContent()); break;
                    case "Location":
                        if(cancion.getAlbum()!=null){
                            songs.add(cancion);
                            for(Album a: album){
                                if(a.getAlbum().equals(cancion.getAlbum())){
                                    existe=false;
                                    break;
                                }
                            }
                            if(existe) album.add(disco);
                        }                        
                        break;
                    default:break;
                }                
            }
            
            System.out.println(album.size());
            System.out.println(songs.size());
            System.out.println(nList.getLength());
            
            ArrayList<String> songList = new ArrayList();
            ArrayList<String> discosList = new ArrayList();
            
            for(Album valor: album){
                discosList.add("INSERT INTO Discos (Album, Artista, año, Genero, SoporteID, Etiquetado, Identificadores, Discografica, Img_cover, Img_backcover) VALUES (\""+valor.getAlbum().replaceAll("\"", "\\\"")+"\", \""+valor.albumArtist+"\", \""+valor.getAño()+"\", \""+valor.getGenero()+"\",1,\"\",\"\",\"\",\""+valor.getAlbum().replaceAll("\"", "\\\"")+".jpg\",\"\");");
                //System.out.println(valor.getAlbum().replaceAll("\"", "\\\""));
            }
            /*
            discosList.stream().forEach((A) -> {
                System.out.println(A);
            });
            */
            songs.stream().forEach((valor)->{
                String v1,v2,v3="";
                v1=valor.getSong();
                v3=valor.getAlbum();
                v2=valor.getArtist();                
                if(v1.contains("\"")) v1.replace("\"", "");
                if(v2.contains("\"")) v2.replace("\"", "");
                if(v3.contains("\"")) v3.replace("\"", "");
                
                System.out.println(MessageFormat.format("INSERT INTO Canciones (Titulo, pista, Artistas, discoID) VALUES (\"{0}\", {1}, \"{2}\", (SELECT DiscoID from Discos where Album = \"{3}\"));", v1, valor.getPista(), v2, v3));

                songList.add(MessageFormat.format("INSERT INTO Canciones (Titulo, pista, Artistas, discoID) VALUES (\"{0}\", {1}, \"{2}\", (SELECT DiscoID from Discos where Album = \"{3}\"));",
                        v1, valor.getPista(), v2, v3).toString());                
            });
            
            discosList.stream().forEach((D)->{System.out.println(D);});
            songList.stream().forEach((S)->{System.out.println(S);});
            
        }catch(Exception e){
            System.out.println(e.getMessage());
        }
    }    
}