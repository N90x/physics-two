// module aliases
var Engine = Matter.Engine,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

var engine;
var world;
var runner;

var particles = [];
var particleSize = 3
var maxParticles = 1200

var debugColour;

var bounds;
var boundaries = [];
var menuWidth = 300;
var boundaryThickness = 10

var testValue = 30;

function setup() {    
    createCanvas(900 + menuWidth, 900);
    debugColour = color(255,0,0)
    rectMode(CENTER)

    engine = Engine.create();
    engine.gravity.y = 0
    world = engine.world;

    for (let i = 0; i < maxParticles; i++){
        new Particle(
            random(0, width - menuWidth),  random(0, height), particleCollisionSize, particleDisplaySize, "random"
        )
    }

    bounds = new Bounds(0, 0, width - menuWidth, height, boundaryThickness)

    createMenu()

    runner = Runner.create();
    Runner.run(runner, engine);
}

function mouseDragged() {
    if (Matter.Bounds.contains(bounds.boundingBox, {x: mouseX, y: mouseY}))
    {
        if (keyIsDown(SHIFT)){
            for (let i = 0; i < particles.length; i++) 
            {
                particles[i].attract(mouseX, mouseY)
            }     
        } else
        {
            for (let i = 0; i < particles.length; i++) 
            {
                particles[i].repel(mouseX, mouseY)
            }     
        }


    } else // is over menu
    {
        for (let i = 0; i < menuItems.length; i++) 
        {
            menuItems[i].processDragging()
        }
    }

}

function mousePressed() {
}

function getMouseSpeed(multiplier) {
    return {
        x: (mouseX - pmouseX) * (multiplier || 1),
        y: (mouseY - pmouseY) * (multiplier || 1),
    }
}

function mouseReleased(){
    if (!Matter.Bounds.contains(bounds.boundingBox, {x: mouseX, y: mouseY})) // if over menu
    {
        assignMenuItems()
    }
}

function distance(x1, y1, x2, y2, isAbsolute) {
    if (isAbsolute) {
        return {
            x: abs(x1 - x2),
            y: abs(y1 - y2)
        } 
    } else {
        return {
            x: (x1 - x2),
            y: (y1 - y2)
        } 
    }

}

function draw() {
    background(15)
    
    while (particles.length > maxParticles) {
        Composite.remove(world, particles[1].body)
        particles.shift()
    }

    for (let i = 0; i < particles.length; i++) {
        particles[i].locationId = i
        particles[i].show()
        //particles[i].gravitate()
    }
    for (let i = 0; i < boundaries.length; i++) {
        boundaries[i].show()
    }

    showMenu()
    sortParticlesByPosition()
    fill(debugColour)

}