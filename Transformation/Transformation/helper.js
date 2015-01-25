/**
 * Created by Lukas on 14.01.2015.
 */

// eigens redefinierte Mathematische Funktionen

function toRadian(degree){
    return ((Math.PI/180)*degree);
}

/** Sinus für Gradmaß*/
function sin(degree){
    return round(Math.sin(toRadian(degree)));
}

/** Cosinus für Gradmaß*/
function cos(degree){
    return round(Math.cos(toRadian(degree)));
}

/** Rundungsfunktion*/
function round(number){
    return Math.round(number * 100) / 100;

}
