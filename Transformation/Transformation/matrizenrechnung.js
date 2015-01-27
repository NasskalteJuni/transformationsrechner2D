/**
 * Created by NasskalteJuni on 11.01.2015.
 */

canvas = new canvas();
canvas.initCanvas();
                    //  A       B       C       D
square = new rectangle([0,0,1],[0,2,1],[2,2,1],[2,0,1]);
square.init(ctx);
square.draw(0,0,255);

target = new rectangle([3,5,1],[3,3,1],[6,3,1],[6,5,1]);
target.init(ctx);
target.draw(255,0,0);

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
    page.hideErrorMessage();
},false);

gewinnbutton.addEventListener("click",function(){
    page.hideCompleteMessage();
})


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
