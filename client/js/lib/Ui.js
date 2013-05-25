define(['jquery','createjs'],function($,createjs){
    var game;
    var Ui = function(g){
        this.initialize();
        game = g || false;
        if(game){
            game.ui = this;
            
            // FPS Display
            var status = new createjs.Text('Boop.','12px Courier','#95f');
            status.x = status.y = 10;
            this.status = this.addChild(status);
            
            // Console input
            var console = new createjs.DOMElement($('#console')[0]);
            this.console = this.addChild(console);
            console.x = console.regX = console.regY = 0;
            console.y = 430;
            
            // Mouse dot
            var cursor = new createjs.Shape();
            cursor.graphics.f('#07f').dc(0,0,4);
            this.cursor = this.addChild(cursor);
        }
    }
    
    var p = Ui.prototype = new createjs.Container();
    p.constructor = Ui;
    
    return Ui;
});
