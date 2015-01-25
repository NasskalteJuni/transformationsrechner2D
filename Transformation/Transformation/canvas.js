/**
 * Created by NasskalteJuni on 25.01.2015.
 */



/** Objekte, welche intern mit dem Canvas-Objekt arbeiten, es also erzeugen, initialisieren*/
function canvas() {


    // Der genutzte Canvas, sollte nicht unbedingt rausgegeben werden.
    var can;


    /** initiiert den Canvas als Element auf der Seite, bereitet den Context vor, speichert ihn in globaler Variable 'ctx' (ohne Anführungszeichen)*/
    this.initCanvas = function() {

        // entferne gegebenenfalls genutze Canvas
        if (document.getElementById("canvas")) {
            var rem = document.getElementById("canvas");
            rem.parentNode.removeChild(rem);
        }
        // erstelle den Canvas
        canvasContainer = document.getElementById("canvasContainer");
        can = document.createElement("canvas");
        can.setAttribute("id", "canvas");
        can.setAttribute("width", "" + CANVAS_WIDTH);
        can.setAttribute("height", "" + CANVAS_HEIGHT);
        canvasContainer.appendChild(can);

        // initiiere den Context
        ctx = can.getContext("2d");
        ctx.fillStyle = "white";
        ctx.strokeStyle = "gray";
        ctx.lineWidth = 1;
        ctx.fillRect(0, 0, can.width, can.height);

        ctx.translate(can.width / 2, can.height / 2);
        ctx.scale(1, -1);

        // male Achsen und Koordinatensystem
        this.drawAxis();
        this.drawGrid();
    };


    /** Eine Funktion, die das Gitter auf den Canvas malt */
    this.drawGrid = function() {
        ctx.strokeStyle = "gray";
        ctx.lineWidth = 1;
        // senkrechte Striche
        for (var x = 0; x <= can.width; x += SCALE) {
            ctx.moveTo(x, (-can.height / 2) * SCALE);
            ctx.lineTo(x, (can.height / 2) * SCALE);
            ctx.stroke();
            ctx.moveTo(-x, (-can.height / 2) * SCALE);
            ctx.lineTo(-x, (can.height / 2) * SCALE);
            ctx.stroke();
        }
        // wagerechte Striche
        for (var y = 0; y <= can.height; y += SCALE) {
            ctx.moveTo((-can.width / 2) * SCALE, y);
            ctx.lineTo((can.width / 2) * SCALE, y);
            ctx.stroke();
            ctx.moveTo((-can.width / 2) * SCALE, -y);
            ctx.lineTo((can.width / 2) * SCALE, -y);
            ctx.stroke();
        }

    };


    /** Eine Funktion, die die X- und Y-Achse malt */
    this.drawAxis = function() {
        ctx.strokeStyle = "black";
        ctx.lineWidth = 5;
        ctx.moveTo(0, (can.height / 2) * SCALE);
        ctx.lineTo(0, -(can.height / 2) * SCALE);
        ctx.stroke();
        ctx.moveTo((can.width / 2) * SCALE, 0);
        ctx.lineTo(-(can.width / 2) * SCALE, 0);
        ctx.stroke();

    };

}