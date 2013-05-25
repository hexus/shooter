if (typeof define !== 'function') { var define = require('amdefine')(module); }
var node = typeof window === 'undefined';

define(['./Entity'],function(Entity){
    var Ray = function(args){
        if(!args){args={};}
        this.super_Entity.constructor.call(this,args);
        this.updateState({
            type:'ray',
            vx:args.vx||0,
            vy:args.vy||0,
            colour:args.colour||'95f',
            owner:args.owner||0
        });
    }
    
    var p = Ray.prototype = new Entity();
    p.super_Entity = Entity.prototype;
    p.constructor = Ray;
    
    return Ray;
});