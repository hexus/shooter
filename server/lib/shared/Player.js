if (typeof define !== 'function') { var define = require('amdefine')(module); }
var node = typeof window === 'undefined';

define(['./Entity','./Ray'],function(Entity,Ray){
    var Player = function(args){
        this.super_Entity.constructor.call(this,args);
        this.updateState({
            type:'player',
            size:10,
            speed:5,
            colour:args.colour||"95f",
            mx:this.state.x,
            mx:this.state.y,
            moveUp:false,
            moveDown:false,
            moveLeft:false,
            moveRight:false
        });
        this.ray = new Ray();
        this.game = args.game||false;
        this.shootCooldown = 0;
    };
    
    var p = Player.prototype = new Entity(); // Inheritance
    p.super_Entity = Entity.prototype; // Superclass reference
    p.constructor = Player; // Constructor reassignment
    
    p.tick = function(){
        this.super_Entity.tick.call(this);
        var s = this.state;
        s.x += s.moveLeft && !s.moveRight ? -s.speed : s.moveRight && !s.moveLeft ? s.speed : 0;
        s.y += s.moveUp && !s.moveDown ? -s.speed : s.moveDown && !s.moveUp ? s.speed : 0;
        this.shootCooldown -= this.shootCooldown>0 ? 1 : 0;
    }
    
    p.shoot = function(){
        if(!this.shootCooldown>0){
            var s = this.state;
            this.ray = new Ray({
                owner:this.id,
                x:s.x,
                y:s.y,
                vx:s.mx-s.x,
                vy:s.my-s.y
            });
            game.addEntity(this.ray);
            this.shootCooldown = 40;
        }
    }
    
    p.lerp = function(n,m,t){
        return n+(m-n)*t;
    }
    
    p.intersect = function(ray) {
        // Instead of multiple arguments:
        var rad = this.state.size; // Radius
        var c = { // Circle
            x:this.state.x, // Position
            y:this.state.y
        };
        var r = { // Ray/line
            x:ray.state.x, // Position
            y:ray.state.y,
            vx:ray.state.vx, // Direction
            vy:ray.state.vy
        };
        
        // Quadratic shit
        var a = r.vx*r.vx + r.vy*r.vy;
        var b = 2 * ((r.vx) * (r.x-c.x) + (r.vy) * (r.y-c.y));
        var cc = c.x * c.x + c.y * c.y + r.x * r.x + r.y * r.y - 2 * (c.x * r.x + c.y * r.y) - rad * rad;
        var i = b*b - 4 * a * cc;
        
        var result = {
            intersection:false,
            tangent:false,
            inside:false,
            enter:false,
            exit:false
        };
        
        if(i<0){
            result.inside = false;
        } else {
            var e = Math.sqrt(i);
            var u1 = (-b + e) / (2 * a);
            var u2 = (-b - e) / (2 * a);
            if ((u1 < 0 || u1 > 1) && (u2 < 0 || u2 > 1)) {
                if ((u1 < 0 && u2 < 0) || (u1 > 1 && u2 > 1)) {
                    result.inside = false;
                } else {
                    result.inside = true;
                }
            } else {
                result.intersection = true;
                result.enter = 0<=u2 && u2<=1 ? {x:this.lerp(r.x,r.x+r.vx,u2),y:this.lerp(r.y,r.y+r.vy,u2)} : false;
                result.exit = 0<=u1 && u1<=1 ? {x:this.lerp(r.x,r.x+r.vx,u1),y:this.lerp(r.y,r.y+r.vy,u1)} : false;
                result.tangent = result.enter && result.exit && result.enter.x==result.exit.x && result.enter.y==result.exit.y;
            }
        }
        
        return result;
    }
    
    return Player; 
});
