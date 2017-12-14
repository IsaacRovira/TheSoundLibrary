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
            
            System.out.println("Root element: " + doc.getDocumentElement().getNodeName());
            
            NodeList nList = doc.getElementsByTagName("key");
            Album disco = new Album();
            Songs cancion = new Songs();
            boolean existe = false;
            
            for(int i=0; i<nList.getLength(); i++){
                
                //System.out.println(nList.item(i).getTextContent());
                //System.out.println(nList.item(i).getTextContent()+" - "+ nList.item(i).getNextSibling().getTextContent()+"\n");
                if(nList.item(i).getTextContent().equals("Track ID")){
                    disco = new Album();
                    cancion = new Songs();
                    existe = false;
                }
                switch(nList.item(i).getTextContent()){
                    case "Name": cancion.setSong(nList.item(i).getNextSibling().getTextContent());break;
                    case "Artist": cancion.setArtist(nList.item(i).getNextSibling().getTextContent());break;
                    case "Composer": cancion.setComposer(nList.item(i).getNextSibling().getTextContent());break;
                    case "Album":
                        cancion.setAlbum(nList.item(i).getNextSibling().getTextContent());
                        for(Album a: album){
                            if(a.getAlbum().equals(cancion.getAlbum())){
                                existe = true;
                                break;
                            }
                        }
                        if(!existe){
                            disco.setAlbum(cancion.getAlbum());
                        }
                        break;
                    case "Genre":
                        if(!existe){
                        disco.setGenero(nList.item(i).getNextSibling().getTextContent());
                        }
                        break;
                    case "Track Number":
                        cancion.setPista(nList.item(i).getNextSibling().getTextContent());
                        songs.add(cancion);
                        break;
                    case "Year": 
                        if(!existe){
                            disco.setAño(nList.item(i).getNextSibling().getTextContent());                                    
                        }
                        if(!existe){
                            album.add(disco);
                        }else{
                            existe=true;
                        }
                        break;
                    default:break;                                    
                }
            }            
            /*
            for(Songs valor: songs){
                System.out.println(valor.getSong() + " - " + valor.getPista() + " - "+ valor.getAlbum());                        
            }
            */
            for(Album valor: album){
                System.out.println("(\""+valor.getAlbum()+"\"), (\""+valor.albumArtist+"\"), (\""+valor.getAño()+"\"), (\""+valor.getGenero()+"\"),(1),(\"\"),(\"\"),(\"\"),(\"\"),(\"\")");
            }
            
            System.out.println(album.size());
            System.out.println(songs.size());
            System.out.println(nList.getLength());
                    
        }catch(Exception e){
            System.out.println(e.getMessage());
        }
        
    }    
}
