define(['createjs'],function(createjs){
    var Cursor = function(){
        this.initialize();
        this.graphics.f('#0ff').dc(0,0,10);
    }
    
    var p = Cursor.prototype = new createjs.Shape();
    
    return Cursor;
});

