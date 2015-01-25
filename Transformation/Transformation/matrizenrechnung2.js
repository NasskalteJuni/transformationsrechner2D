/**
 * Created by NasskalteJuni on 11.01.2015.
 */


initCanvas();

square = new rectangle([0,0,1],[0,2,1],[2,2,1],[2,0,1]);
square.init(ctx);
square.draw();

target = new rectangle([])





/** Eventlistener für Nutzereingaben */
moreButton.addEventListener("click",function(){
    var  isChanged = processInput();
    if(isChanged) {
        updateSite();
    }
},false);

lessButton.addEventListener("click",function(){
    matrizen.pop();
    updateSite();
},false);

fehlerbutton.addEventListener("click",function(){
    document.getElementById("fehlermeldung").style.display="none";
},false);



/***************************************************************************************************************************/


/* Funktion, welche alle Matrizen für die Gesammttransformationsmatrix miteinander multipliziert */
function multiplyMatrices(){
    var m = math.matrix([[1,0,0],[0,1,0],[0,0,1]]);
    for(var i = 0; i < matrizen.length; i++){
        m = math.multiply(m,matrizen[i]);
    }
    return m;
}



/***************************************************************************************************************************/



/** Nimmt die Daten aus den Eingabefeldern endgegen und erzeugt aus ihnen eine Matrix.
 * Wenn dies erfolgreich ist, wird true zurückgegeben, wenn keine neue Matrix gebildet wird,
 * dann wird false zurückgegeben.*/
function processInput() {
    var valid = true;
    var array = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
    for (var i = 0; i < array.length; i++) {
        for (var j = 0; j < array.length; j++) {
            var index = (i * 3 + j + 1) + "";
            var input = document.getElementById(index).value.toLowerCase();
            if (input != "" && input != undefined) {
                if (input.indexOf("sin") != -1 || input.indexOf("sinus") != -1 || input.indexOf("cosinus") != -1 || input.indexOf("cos") != -1) {
                    input = input.replace("sinus", "sin");
                    input = input.replace("cosinus", "cos");
                    array[i][j] = eval(input);
                } else {
                    array[i][j] = parseFloat(document.getElementById(index).value); // nehme den Wert aus dem Eingabefeld und speichere ihn an die entsprechende Arrayposition
                }
            } else {
                valid = false;
            }
        }
    }
    var m = math.matrix(array); // erzeuge eine math.js Matrix aus diesem Array
    if (valid) {
        matrizen.push(m); // speichere die Matrix im Array matrizen
        return true;
    }else{
        document.getElementById("fehlermeldung").style.display="block";
        return false;
    }
}



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
    square.init(ctx);
    square.transform();
    square.draw();

}
