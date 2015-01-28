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
var setbutton = document.getElementById("setbutton");
var slider = document.getElementById("switchCustom");


var customlevel = document.getElementById("customlevel");

// Array, das die einzelnen Matrizen speichert, also die math.js-Matrix-objekte
var matrizen = [];

// das aktuelle rechteck
var square;

// das Ziel, das erreicht werden soll
var target;

// Levelverwaltung
var levelmanager;
var level;

var levelComplete = new Event('levelComplete');


var ctx;
var canvas;
var canvasContainer;

var page;

