define(['createjs','shared/Game','shared/Player'],function(createjs,Game,Player){
    var shapeCount = 0;
    
    var CGame = function(args){
        if(!args){args={};}
        this.entityViews = {};
        this.shapes = {};
        this.container = new createjs.Container();
        this.player = args.player || new Player({x:400,y:225});
        this.addEntity(this.player);
        this.entityDisplayProperties = ['x','y','rotation','alpha'];
        this.__defineGetter__('stage',function(){
            return this.container.getStage();
        });
        this.test();
    }
    
    var p = CGame.prototype = new Game(); // Inheritance
    p.super_Game = Game.prototype; // Superclass reference
    p.constructor = CGame; // Constructor reassignment
    
    p.tick = function(){
        this.player.state.mx = this.stage.mouseX;
        this.player.state.my = this.stage.mouseY;
        this.super_Game.tick.call(this);
        for(var e in this.entities){
            var entity = this.entities[e];
            var entityView = this.entityViews[e];
            var state = entity.state;
            
            if(!entityView){ // Draw entity
                var shape = new createjs.Shape();
                switch(state.type){
                    case "player":
                        shape.graphics.f('#'+state.colour).dc(0,0,state.size);
                        break;
                    case "ray":
                        shape.graphics.ss(1).s('#'+state.colour).mt(0,0).lt(state.vx,state.vy);
                        break;
                }
                entityView = this.entityViews[entity.id] = this.container.addChild(shape);
            }
            
            // Update positions
            for(var p in this.entityDisplayProperties){
                var property = this.entityDisplayProperties[p];
                entityView[property] = state[property];
            }
        }
        
        for(var s in this.shapes){
            var shape = this.shapes[s];
            if(!this.container.contains(shape)){
                this.container.addChild(shape);
            }
            if(shape.alpha>0){
                shape.alpha -= 0.01;
            }else{
                this.container.removeChild(shape);
                delete(this.shapes[s]);
            }
        }
    }
    
    p.addEntity = function(entity){
        var entity = this.super_Game.addEntity.call(this,entity);
        //var shape = new createjs.Shape();
        //var state = entity.state;
        return entity;
    }
    
    p.removeEntity = function(eid){
        var entity = this.super_Game.removeEntity.call(this,eid);
        entity = this.container.removeChild(this.entityViews[eid]);
        delete(this.entityViews[eid]);
        return entity;
    }
    
    p.mark = function(x,y){
        var shape = new createjs.Shape();
        shape.graphics.f('#f00').dc(0,0,3);
        shape.x = x; shape.y = y;
        this.shapes[++shapeCount] = shape;
    }
    
    p.test = function(){
        this.enemy = new Player({x:600,y:225,colour:'f55'});
        this.addEntity(this.enemy);
    }
    
    return CGame;
});
