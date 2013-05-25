if (typeof define !== 'function') { var define = require('amdefine')(module); }
var node = typeof window === 'undefined';

define(['./Entity'],function(Entity){
    var entityCount = 0;
    var rayCount = 0;
    
    var Game = function(args){
        this.entities = {};
        this.rays = [];
    }
    
    var p = Game.prototype;
    
    p.tick = function(){
        for(var e in this.entities){
            var entity = this.entities[e];
            var state = entity.state;
            entity.tick();
            if(state.type=='ray'){
                if(state.alpha==1){
                    for(var c in this.entities){
                        var cEntity = this.entities[c];
                        var cState = cEntity.state;
                        if(cState.type!='ray' && cEntity.id!=state.owner){
                            var intersect = cEntity.intersect(entity);
                            //console.log(JSON.stringify(intersect));
                            if(!node){
                                if(intersect.enter){
                                    this.mark(intersect.enter.x,intersect.enter.y);
                                }
                                if(intersect.exit){
                                    this.mark(intersect.exit.x,intersect.exit.y);
                                }
                            }
                        }
                    }
                }
                if(state.alpha>0){
                    state.alpha -= 0.01;
                }else{
                    this.removeEntity(entity.id);
                }
            }
        }
    }
    
    p.addEntity = function(entity){
        if(!this.entities[entity.id]){
            entity.id = !entity.id ? ++entityCount : entity.id;
            this.entities[entity.id] = entity;
            entity.game = this;
        }
        return this.entities[entity.id] || false;
    }
    
    p.removeEntity = function(eid){
        var entity = this.entities[eid];
        entity.game = false;
        delete(this.entities[eid]);
        return entity;
    }
    
    return Game;
});