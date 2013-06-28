requirejs.config({
    waitSeconds:2,
    paths:{
        'jquery':'jquery-1.8.2',
        'createjs':'createjs-2013.05.14.min',
        'shared':'/js/shared',
        'socket.io':'//'+window.location.hostname+':7002/socket.io/socket.io'
    },
    shim:{
        'createjs':{
            exports:'createjs'
        }
    }
});

require(['jquery','createjs','socket.io','lib/Controls','lib/ClientGame','lib/Ui','shared/Player'],
function($,createjs,sio,Controls,CGame,Ui,Player){
    var init = function(){
        var fps = 40;
        var stage = new createjs.Stage('canvas');
        var ticker = createjs.Ticker;
        var game = new CGame();
        var ui = new Ui(game);
        var controls = new Controls(game);
        
        stage.addChild(game.container);
        stage.addChild(ui);
        
        // Tick handler
        ticker.setFPS(fps);
        var handleTick = function(event){
            if(ticker.getTicks()%10==0){
                ui.status.text = Math.round(ticker.getMeasuredFPS());
            }
            ui.cursor.x = stage.mouseX;
            ui.cursor.y = stage.mouseY;
            
            game.tick();
            controls.tick();
            stage.update();
        };
        ticker.addEventListener("tick",handleTick);
        stage.snapToPixelEnabled = true;
        
        window.game = game;
    }
    
    $(function(){
        init();
    });
});
