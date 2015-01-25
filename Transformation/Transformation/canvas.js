/**
 * Created by NasskalteJuni on 25.01.2015.
 */


/** initiiert den Canvas als Element auf der Seite, bereitet den Context vor, speichert ihn in globaler Variable 'ctx' (ohne Anführungszeichen)*/
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