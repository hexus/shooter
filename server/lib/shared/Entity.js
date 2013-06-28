if (typeof define !== 'function') { var define = require('amdefine')(module); }
var node = typeof window === 'undefined';

define(function(){ // Abstract
    var Entity = function(args){
        //console.log(args);
        if(!args){args={};}
        this.id = 0;
        this.state = {
            type:'entity',
            x:args.x||0,
            y:args.y||0,
            rotation:0,
            alpha:args.alpha||1
        }
        this.lastState = {};
    };
    
    var p = Entity.prototype;

    /* How to inherit this class:
    var p = SubClass.prototype = new Entity(); // Inheritance
    p.super_Entity = Entity.prototype; // Superclass reference
    p.constructor = SubClass; // Constructor reassignment
    */
    
    p.tick = function(){
        
    }
    
    p.updateState = function(stateDelta){
        for(var s in stateDelta){
            this.state[s] = stateDelta[s];
        }
    }
    
    return Entity; 
});
