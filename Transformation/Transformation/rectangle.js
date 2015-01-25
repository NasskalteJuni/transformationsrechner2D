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

    points.push(a);
    points.push(b);
    points.push(c);
    points.push(d);

    this.init = function(context) {
        ctx = context;
        points = [a,b,c,d];
    };

    this.draw = function(){
        ctx.strokeStyle="rgba(0,0,255,1)";
        ctx.fillStyle="rgba(0,0,255,0.75)";
        ctx.lineWidth=1;
        ctx.beginPath();
        ctx.moveTo(points[3].get([0])*SCALE,points[3].get([1])*SCALE);
        ctx.stroke();
        ctx.lineTo(points[2].get([0])*SCALE,points[2].get([1])*SCALE);
        ctx.stroke();
        ctx.lineTo(points[1].get([0])*SCALE,points[1].get([1])*SCALE);
        ctx.stroke();
        ctx.lineTo(points[0].get([0])*SCALE,points[0].get([1])*SCALE);
        ctx.stroke();
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
        ctx.strokeStyle="gray";
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
                if(points[i].get(j) != rectangle[i].get(j)){
                    return false;
                }
            }
        }
        return true;
    };
}

