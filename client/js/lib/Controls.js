define(['jquery'],function($){
    var game;
    var Controls = function(g){
        game = g;
        this.initialize();
    },
    keysDown={},
    keysLast={},
    controlMap = {
        up : {
            key:87,
            down:function(){
                game.player.state.moveUp = true;
            },
            up:function(){
                game.player.state.moveUp = false;
            }
        },
        down : {
            key:83,
            down:function(){
                game.player.state.moveDown = true;
            },
            up:function(){
                game.player.state.moveDown = false;
            }
        },
        left : {
            key:65,
            down:function(){
                game.player.state.moveLeft = true;
            },
            up:function(){
                game.player.state.moveLeft = false;
            }
        },
        right : {
            key:68,
            down:function(){
                game.player.state.moveRight = true;
            },
            up:function(){
                game.player.state.moveRight = false;
            }
        },
        useLeft : {
            key:'mouse0',
            down:function(){
                game.player.shoot();
            },
            up:function(){
                
            }
        },
        useRight : {
            key:'mouse2',
            down:function(){
                
            },
            up:function(){
                
            }
        }
    }
    
    Controls.prototype.initialize = function(){
        // Disable context menu on right click
        $('#canvas').bind('contextmenu',function(){
            return false;
        });
        
        // Key handlers
        $(window).keydown(function(e){
            var k = e.keyCode || e.which;
            keysDown[k] = true;
            //console.log(k);
        });
        
        $(window).keyup(function(e){
            var k = e.keyCode || e.which;
            keysDown[k] = false;
        });
        
        // Mouse handlers
        $('#canvas').mousedown(function(e){
            var k = e.button || e.which-1;
            keysDown['mouse'+k] = true;
            return false;
        });
        
        $('#canvas').mouseup(function(e){
            var k = e.button || e.which-1;
            keysDown['mouse'+k] = false;
        });
        
    }
    
    Controls.prototype.tick = function(){
        for(var c in controlMap){
            o = controlMap[c];
            if(keysDown[o.key]){
                if(typeof o.down === 'function'){
                    if(keysDown[o.key]!=keysLast[o.key] || o.repeat===true){
                        keysLast[o.key] = keysDown[o.key]; 
                        o.down();
                        //console.log(o.key);
                    }
                }
            }else{
                if(typeof o.up === 'function'){
                    if(keysDown[o.key]!=keysLast[o.key]){
                        keysLast[o.key] = keysDown[o.key];
                        o.up();
                        //console.log(o.key);
                    }
                }
            }
        }
    }
    
    return Controls;
});