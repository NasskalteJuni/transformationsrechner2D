/**
 * Created by NasskalteJuni on 25.01.2015.
 */



// Konstanten für den Canvas
var CANVAS_WIDTH = 800;
var CANVAS_HEIGHT = 600;
var SCALE = 50;

// die Buttons
var moreButton = document.getElementById("moreButton");
var lessButton = document.getElementById("lessButton");
var fehlerbutton = document.getElementById("fehlerbutton");
var gewinnbutton = document.getElementById("gewinnbutton");




// Array, das die einzelnen Matrizen speichert, also die math.js-Matrix-objekte
var matrizen = [];

// das aktuelle rechteck
var square;

// das Ziel, das erreicht werden soll
var target;

var ctx;
var canvas;
var canvasContainer;

var page;

