/**
 * Created by Lukas on 11.01.2015.
 */

// Konstanten für den Canvas
var CANVAS_WIDTH = 800;
var CANVAS_HEIGHT = 600;
var SCALE = 50;

// die Buttons
var moreButton = document.getElementById("moreButton");
var lessButton = document.getElementById("lessButton");

// Array, das die einzelnen Matrizen speichert, also die math.js-Matrix-objekte
var matrizen = [];

// das aktuelle rechteck
var rectangle = [];

// das Ziel, das erreicht werden soll
var target = [];

var ctx;
var canvas;
var canvasContainer;

initCanvas();
initRectangle();
drawRectangle();



/** initiiert den Canvas als Element auf der Seite, bereitet den */
function initCanvas() {
    // entferne gegebenenfalls genutze Canvas
    if(document.getElementById("canvas")){
        var rem = document.getElementById("canvas");
        rem.parentNode.removeChild(rem);
    }
    // erstelle den Canvas
    canvasContainer = document.getElementById("canvasContainer");
    canvas = document.createElement("canvas");
    canvas.setAttribute("id", "canvas");
    canvas.setAttribute("width", "" + CANVAS_WIDTH);
    canvas.setAttribute("height", "" + CANVAS_HEIGHT);
    canvasContainer.appendChild(canvas);

    // initiiere den Context
    ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.strokeStyle = "gray";
    ctx.lineWidth = 1;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.save();

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.scale(1, -1);

    // male Achsen und Koordinatensystem
    drawAxis();
    drawGrid();
}


/** Eine Funktion, die das Gitter auf den Canvas malt */
function drawGrid(){
    // senkrechte Striche
    for(var x=0; x<= canvas.width;x+=SCALE){
        ctx.moveTo(x,(-canvas.height/2)*SCALE);
        ctx.lineTo(x,(canvas.height/2)*SCALE);
        ctx.stroke();
        ctx.moveTo(-x,(-canvas.height/2)*SCALE);
        ctx.lineTo(-x,(canvas.height/2)*SCALE);
        ctx.stroke();
    }
    // wagerechte Striche
    for(var y=0; y<= canvas.height;y+=SCALE){
        ctx.moveTo((-canvas.width/2)*SCALE,y);
        ctx.lineTo((canvas.width/2)*SCALE,y);
        ctx.stroke();
        ctx.moveTo((-canvas.width/2)*SCALE,-y);
        ctx.lineTo((canvas.width/2)*SCALE,-y);
        ctx.stroke();
    }

}

/** Eine Funktion, die die X- und Y-Achse malt */
function drawAxis(){
    ctx.save();
    ctx.strokeStyle="black";
    ctx.lineWidth=5;
    ctx.moveTo(0,(canvas.height/2)*SCALE);
    ctx.lineTo(0,-(canvas.height/2)*SCALE);
    ctx.stroke();
    ctx.moveTo((canvas.width/2)*SCALE,0);
    ctx.lineTo(-(canvas.width/2)*SCALE,0);
    ctx.stroke();
    ctx.restore();
}



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




// Eventlistener für die Buttons

moreButton.addEventListener("click",function(){
    var valid = true;
    var array = [[0,0,0],[0,0,0],[0,0,0]];
    for(var i = 0; i < array.length; i++){
        for(var j = 0; j < array.length; j++){
            var index = (i*3+j+1) + "";
            var input = document.getElementById(index).value.toLowerCase();
            if(input != "" && input != undefined) {
                if(input.indexOf("sin") != -1 || input.indexOf("sinus") != -1 || input.indexOf("cosinus") != -1 || input.indexOf("cos") != -1){
                    //input = input.replace("sin","Math.sin");
                    //input = input.replace("cos","Math.cos");
                    input = input.replace("sinus","sin");
                    input = input.replace("cosinus","cos");
                    var index = 0;
                    //if(input.charAt(0) == "-"){
                    //    index++;
                    //}
                    //input = input.substring(0,index)+"1*"+input.substring(index,input.length);
                    console.log(input);
                    array[i][j] = eval(input);
                }else {
                    array[i][j] = parseFloat(document.getElementById(index).value); // nehme den Wert aus dem Eingabefeld und speichere ihn an die entsprechende Arrayposition
                }
            }else{
                valid = false;
            }
        }
    }
    var m = math.matrix(array); // erzeuge eine math.js Matrix aus diesem Array
    if(valid) {
        matrizen.push(m); // speichere die Matrix im Array matrizen
    }
    updateSite();   // stelle die Matrizen auf der Seite neu dar
},false);

lessButton.addEventListener("click",function(){
    matrizen.pop();
    updateSite();
},false);


/** Eine Funktion, die eine Matrix innerhalb des Kontainers 'matrizen' auf der Seite darstellt,
 *  und dazu ein DIV mit der Klasse matrix an dieses DIV 'matrizen' anhängt.
 *  @param matrix Die darzustellende Matrix*/
function addMatrixToSite(matrix){
    var m = document.createElement("div");
    var text = "";
    m.setAttribute("class","matrix");
    for(var i = 0; i < 3; i++){
        for(var j = 0; j < 3; j++){
            text += matrix.get([i,j]);
            text += (j == 2) ? "<br/>" : " ";
        }
    }
    m.innerHTML = text;
    document.getElementById("matrizen").appendChild(m);
}

function addMultiplicationToSite(){
    var x = document.createElement("div");
    x.innerHTML = "   <br/> x <br/>   <br/>";
    x.setAttribute("class","multiplication");
    document.getElementById("matrizen").appendChild(x);
}

function addEqualToSite(){
    var e = document.createElement("div");
    e.innerHTML = "   <br/> = <br/>   <br/>";
    e.setAttribute("class","equal");
    document.getElementById("matrizen").appendChild(e);
}

/** aktualisiert die im Container 'matrizes' dargestellten Matrizen,
 * indem alle im Array 'matrizen' gespiecherte Matrizen eingelesen und im Container
 * 'matrizes' dargestellt werden, getrennt durch 'x' für die Multiplikation*/
function updateSite(){
    var m = document.getElementById("matrizen");
    m.innerHTML="";

    for(var i = 0; i < matrizen.length; i++){
        addMatrixToSite(matrizen[i]);
        if(i != matrizen.length-1){
            addMultiplicationToSite();
        }
    }

    addEqualToSite();
    addMatrixToSite(multiplyMatrices());

    initCanvas();
    initRectangle();
    transformRectangle();
    drawRectangle();

}

/* Funktion, welche alle Matrizen für die Gesammttransformationsmatrix miteinander multipliziert */
function multiplyMatrices(){
    var m = math.matrix([[1,0,0],[0,1,0],[0,0,1]]);
    for(var i = 0; i < matrizen.length; i++){
        m = math.multiply(m,matrizen[i]);
    }
    return m;
}

/** Funktion, die die Punkte für das Rechteck am Anfang festlegt*/
function initRectangle(){
    rectangle = [];
    var a = [0,0,1];
    var b = [0,2,1];
    var c = [2,2,1]
    var d = [2,0,1];

    rectangle.push(math.matrix(a));
    rectangle.push(math.matrix(b));
    rectangle.push(math.matrix(c));
    rectangle.push(math.matrix(d));
}

/** Funktion, welche das Rechteck auf den Canvas malt*/
function drawRectangle(){
    ctx.strokeStyle="blue";
    ctx.lineWidth=1;
    ctx.beginPath();
    ctx.moveTo(rectangle[3].get([0])*SCALE,rectangle[3].get([1])*SCALE);
    ctx.stroke();
    ctx.lineTo(rectangle[2].get([0])*SCALE,rectangle[2].get([1])*SCALE);
    ctx.stroke();
    ctx.lineTo(rectangle[1].get([0])*SCALE,rectangle[1].get([1])*SCALE);
    ctx.stroke();
    ctx.lineTo(rectangle[0].get([0])*SCALE,rectangle[0].get([1])*SCALE);
    ctx.stroke();
    ctx.closePath();
    ctx.stroke();
    ctx.strokeStyle="gray";
}

function transformRectangle(){
    var ges = multiplyMatrices();
    for(var i = 0; i < rectangle.length; i++){
        rectangle[i] = math.multiply(ges,rectangle[i]);
        console.log(rectangle[i].get([0]),rectangle[i].get([1]));
    }

    console.log("Transformation abgeschlossen");
}

