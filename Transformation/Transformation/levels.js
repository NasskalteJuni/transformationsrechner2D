/**
 * Created by NasskalteJuni on 28.01.2015.
 */


function levels(){


    var currentLevel = 0;

    var level = [
         /* level1 */
        {
            square: new rectangle([-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]),
            target: new rectangle([0,2,1],[0,0,1],[2,0,1],[2,2,1])
        },

        /* level 2 */
        {
            square: new rectangle([0,0,1],[0,2,1],[2,2,1],[2,0,1]),
            target: new rectangle([3,5,1],[3,3,1],[6,3,1],[6,5,1])
            },
        /* level 3 */
        {
            square: new rectangle([2,2,1],[5,2,1],[5,4,1],[2,4,1]),
            target: new rectangle([0,0,1],[-1,1,1],[0,2,1],[1,1,1])
        }
        /* beliebige andere Level hinzufügen...*/
    ];

    /** Returnt das aktuelle Level und geht danach eins weiter, ähnlich zur Funktion next() eines Iterators*/
    this.getNextLevel = function(){
        var l = level[currentLevel];
        currentLevel = (currentLevel == level.length - 1) ? 0 : currentLevel + 1;
        return l;

    }

    /** Bringt das Level wieder auf den Startzustand */
    this.reset = function(){
        currentLevel = 0;
        this.setRectangles();
    }

    this.setRectangles = function(){
        var l = this.getNextLevel();
        square = l.square;
        target = l.target;
    }


}