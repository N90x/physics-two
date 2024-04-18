function Bounds(x, y, w, h, thickness) {

    this.boundingBody = Bodies.rectangle(x + w/2, y + h/2, w, h, {isStatic: true})
    this.boundingBox = Matter.Bounds.create(this.boundingBody.vertices)

    this.bodyLeft = Bodies.rectangle(
        x, 
        y + h/2, 
        thickness,
        h
    );

    this.bodyRight = Bodies.rectangle(
        x + w, 
        y + h/2, 
        thickness, 
        h
    );

    this.bodyFloor = Bodies.rectangle(
        x + w/2, 
        y + height, 
        width,
        thickness
    );

    this.bodyTop = Bodies.rectangle(
        x + w/2, 
        y, 
        width, 
        thickness
    );

    this.body = Matter.Body.create({
        parts: [this.bodyLeft, this.bodyRight, this.bodyFloor, this.bodyTop],
        isStatic:true, restitution: 1
    })

    this.w = w; this.h = h;
    
    boundaries.push(this);
    Composite.add(world, [this.body]);

    this.show = function() {        
        var pos = this.body.position;
        push();
        translate(pos.x, pos.y)
        noFill()
        strokeWeight(thickness)
        stroke(30)
        rect(0, 0, this.w, this.h)
        pop();
    }

}

function getRandomPositionInBounds(){
    let vertices = bounds.boundingBody.vertices
    return {
        x: random(vertices[1].x, vertices[3].x),
        y: random(vertices[1].y, vertices[3].y),
    }
}