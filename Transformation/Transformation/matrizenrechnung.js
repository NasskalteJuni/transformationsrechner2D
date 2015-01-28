/**
 * Created by NasskalteJuni on 11.01.2015.
 */


levelmanager = new levels();

levelmanager.setRectangles();

canvas = new canvas();
canvas.initCanvas();

square.init(ctx);
square.draw(0, 0, 255);


target.init(ctx);
target.draw(255, 0, 0);

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
    matrizen = [];
    page.updateSite();
});

document.addEventListener('levelComplete',function(){
    page.showCompleteMessage();
    levelmanager.setRectangles();
});

setbutton.addEventListener("click",function(){
    function field(fieldname){
        return parseFloat(document.getElementById(fieldname).value);
    }

    square = new rectangle([field('rx0'),field('ry0'),1],[field('rx1'),field('ry1'),1],[field('rx2'),field('ry2'),1],[field('rx3'),field('ry3'),1]);
    target = new rectangle([field('tx0'),field('ty0'),1],[field('tx1'),field('ty1'),1],[field('tx2'),field('ty2'),1],[field('tx3'),field('ty3'),1]);

    page.updateSite();
});

slider.addEventListener("click",function(){
   if(slider.innerHTML == "v"){
        page.showCustomlevel();
       slider.innerHTML="^";
   }else{
       page.hideCustomlevel();
       slider.innerHTML = "v";
   }
});


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
