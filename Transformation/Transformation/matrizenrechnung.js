/**
 * Created by NasskalteJuni on 11.01.2015.
 */

canvas = new canvas();
canvas.initCanvas();

square = new rectangle([0,0,1],[0,2,1],[2,2,1],[2,0,1]);
square.init(ctx);
square.draw();

//target = new rectangle([])

page = new DOM();







/** Eventlistener für Nutzereingaben */
moreButton.addEventListener("click",function(){
    var  isChanged = page.processInput();
    if(isChanged) {
        page.updateSite();
    }
},false);

lessButton.addEventListener("click",function(){
    matrizen.pop();
    page.updateSite();
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
