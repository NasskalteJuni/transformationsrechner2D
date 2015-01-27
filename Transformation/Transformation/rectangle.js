/**
 * Created by NasskalteJuni on 14.01.2015.
 */


/** Rechtecke, welche transformiert und gezeichnet werden können*/
function rectangle(p1,p2,p3,p4){
    var a = math.matrix(p1);
    var b = math.matrix(p2);
    var c = math.matrix(p3);
    var d = math.matrix(p4);

    var ctx;
    var points = [];
    this.getPoints = function (index) {
        return points[index];
    }

    points.push(a);
    points.push(b);
    points.push(c);
    points.push(d);

    this.init = function(context) {
        ctx = context;
        points = [a,b,c,d];
    };

    this.draw = function(r,g,b){

        // Male das Rechteck:
        ctx.strokeStyle="rgba("+r+","+g+","+b+",1)";
        ctx.fillStyle="rgba("+r+","+g+","+b+",0.6)";
        ctx.lineWidth=1;
        ctx.save();
        ctx.scale(1, -1);
        ctx.beginPath();
        ctx.moveTo(points[3].get([0])*SCALE,points[3].get([1])*SCALE*(-1));
        ctx.stroke();
        ctx.lineTo(points[2].get([0])*SCALE,points[2].get([1])*SCALE*(-1));
        ctx.stroke();
        ctx.lineTo(points[1].get([0])*SCALE,points[1].get([1])*SCALE*(-1));
        ctx.stroke();
        ctx.lineTo(points[0].get([0])*SCALE,points[0].get([1])*SCALE*(-1));
        ctx.stroke();
        ctx.closePath();
        ctx.stroke();
        ctx.fill();

        // Beschrifte die Punkte:
        var textabstand = 10;
        ctx.fillStyle="black";
        ctx.fillText("D",points[3].get([0])*SCALE+textabstand,points[3].get([1])*SCALE*(-1)+textabstand);
        ctx.fillText("C",points[2].get([0])*SCALE+textabstand,points[2].get([1])*SCALE*(-1)+textabstand);
        ctx.fillText("B",points[1].get([0])*SCALE+textabstand,points[1].get([1])*SCALE*(-1)+textabstand);
        ctx.fillText("A",points[0].get([0])*SCALE+textabstand,points[0].get([1])*SCALE*(-1)+textabstand);
        ctx.strokeStyle="gray";
        ctx.restore();
    };

    this.transform = function(){
        var ges = multiplyMatrices();
        for(var i = 0; i < points.length; i++){
            points[i] = math.multiply(ges,points[i]);
        }

    };

    this.equals = function(rectangle){
        for(var i = 0; i < points.length; i++){
            for(var j = 0; j < 3; j++){
                if(points[i].get([j]) != rectangle.getPoints(i).get([j])){
                    return false;
                }
            }
        }
        return true;
    };
}

