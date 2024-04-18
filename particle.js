
var particleOptions = {frictionAir: 0.1, restitution: 1}

function Particle(x,y, velocity){
    this.body = Bodies.circle(x, y, particleCollisionSize/2, particleOptions)
    Composite.add(world, [this.body]);

    var vel;
    if (velocity == "random"){
        vel = Matter.Vector.create(random(-2, 2), random(-2, 2))
    } else {
        vel = Matter.Vector.create(velocity.x, velocity.y)
    }

    Matter.Body.setVelocity(this.body, vel)

    particles.push(this)
    //console.log(this.body.id)

    this.show = function() {
        var pos = this.body.position;

        push();
        let col = color(255, 255, 255)
        translate(pos.x, pos.y)
        noStroke();
        fill(col)
        ellipse(0,0, particleDisplaySize)
        pop();

        // Put any escaping particles back in
        if (!Matter.Bounds.contains(bounds.boundingBox, pos)){
            Matter.Body.setPosition(this.body, particles[floor(random(particles.length))].body.position)
            Matter.Body.setSpeed(this.body, 0)
        }
    }


    this.repel = function(x, y) {
        let forcePosition = Matter.Vector.create(x, y)
        let thisPosition = this.body.position
        let offset = Matter.Vector.sub(forcePosition, thisPosition)
        let offsetSqr = Matter.Vector.dot(offset, offset)
        if (offsetSqr < repelRadius * repelRadius)
        {
            var targetAngle = Matter.Vector.angle(this.body.position, forcePosition);
            var force = {
                x: cos(targetAngle) * repelForce,
                y: sin(targetAngle) * repelForce
            }

            Matter.Body.setVelocity(this.body, Matter.Vector.neg(force))
        }
    }

    this.attract = function(x, y) {
        let forcePosition = Matter.Vector.create(x, y)
        let thisPosition = this.body.position
        let offset = Matter.Vector.sub(forcePosition, thisPosition)
        let offsetSqr = Matter.Vector.dot(offset, offset)
        if (offsetSqr < repelRadius * repelRadius)
        {
            var targetAngle = Matter.Vector.angle(this.body.position, forcePosition);
            var force = {
                x: cos(targetAngle) * repelForce,
                y: sin(targetAngle) * repelForce
            }

            Matter.Body.setVelocity(this.body, force)
        }
    }

    this.gravitate = function(){ // broken
        let nextP = particles[this.locationId + 1]
        if (nextP)
        {
            var targetAngle = Matter.Vector.angle(this.body.position, nextP.body.position);
            var force = {
                x: cos(targetAngle) * repelForce,
                y: sin(targetAngle) * repelForce
            }

            Matter.Body.setVelocity(this.body, force)
        }
    }
}

function sortParticlesByPosition(){
    particles.sort(function(p, p1){
        let pos = p.body.position
        let pos1 = p1.body.position
        //return pos1.y - pos.y
        return Matter.Vector.magnitude(pos1) - Matter.Vector.magnitude(pos)
    })
}