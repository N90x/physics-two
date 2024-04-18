var menuItems = []
var menuItemOffset = {x: 10, y: 10}
var menuItemSize = 30;
var menuSlider = {w: menuWidth - menuItemOffset.x*2, h: menuItemSize/2}

function showMenu(){
    for (let i = 0; i < menuItems.length; i++){
        menuItems[i].show()
    }
}

var repelForce = 4
var repelRadius = 100
var particleDisplaySize = 4
var particleCollisionSize = 8
var particleDensity = 1 // remember to divide by 1000.
var airResistance = 100 // divide by 1000
var particleInertia = 0

function createMenu(){
    repelForceMenuItem = new menuItem("Repel Force", repelForce, 0, 50, 0)
    repelRadiusMenuItem = new menuItem("Repel Radius", repelRadius, 0, 300, 0)
    gravityMenuItem = new menuItem("Gravity", engine.gravity.y, 0, 2, 3)
    particleDispSizeMenu = new menuItem("Particle Size", particleDisplaySize, 0, 100, 0)
    densityMenuItem = new menuItem("Particle Density", particleDensity, 1, 300, 0)
    airResistanceMenuItem = new menuItem("Air Resistance", airResistance, 0, 200, 0)
    intertiaMenuItem = new menuItem("Intertia", particleInertia, 0, 1000000000, 0)
}

function assignMenuItems(){
    repelForce = repelForceMenuItem.value
    repelRadius = repelRadiusMenuItem.value
    engine.gravity.y = gravityMenuItem.value
    particleDisplaySize = particleDispSizeMenu.value
    
    if (particleDensity != densityMenuItem.value) // if density was changed
    {   
        particleDensity = densityMenuItem.value
        for (let i = 0; i < particles.length; i++)
        {
            Matter.Body.setDensity(particles[i].body, particleDensity/1000)
        }
    }

    if (airResistance != airResistanceMenuItem.value) // if air resistance was changed
    {   
        airResistance = airResistanceMenuItem.value
        for (let i = 0; i < particles.length; i++)
        {
            Matter.Body.set(particles[i].body, "frictionAir", airResistance/1000)
        }
    }

    if (particleInertia != intertiaMenuItem.value) // if inertia was changed
    {   
        particleInertia = intertiaMenuItem.value
        for (let i = 0; i < particles.length; i++)
        {
            Matter.Body.setInertia(particles[i].body, -1)
        }
    }
}

function menuItem(label, initialValue, min, max, dp){
    this.value = initialValue
    this.label = label
    this.min = min
    this.max = max
    this.dp = dp

    this.position = {
        x: width - menuWidth + menuItemOffset.x,
        y: menuItemSize * menuItems.length + menuItemOffset.y * (menuItems.length+2)
    }

    this.slider = {
        body: Bodies.rectangle(
            this.position.x + menuSlider.w/2, 
            this.position.y + menuItemSize/2, 
            menuSlider.w, 
            menuSlider.h
        )
    }

    this.slider.boundingBox = Matter.Bounds.create(this.slider.body.vertices)

    menuItems.push(this)

    this.show = function(){
        
        push();
        /*rect(
            this.position.x + menuSlider.w/2, 
            this.position.y + menuItemSize/2, 
            menuSlider.w, 
            menuSlider.h
        )*/
        let v = this.slider.body.vertices

        // inside rect denoting value
        fill(255)
        noStroke()        
        rectMode(CORNER)
        rect(v[0].x, v[0].y, menuSlider.w * (this.value/this.max), menuSlider.h)        

        // outside rect
        stroke(0)
        strokeWeight(5)
        noFill()
        rectMode(CORNER)        
        rect(v[0].x, v[0].y, menuSlider.w, menuSlider.h)  

        pop()

        textSize(menuItemSize/2);
        fill(255);
        stroke(0);
        strokeWeight(3);
        textAlign(LEFT, CENTER);
        text(this.label.concat(...[': ', this.value.toFixed(this.dp), ' / ', this.max]), this.position.x, this.position.y);        

    }

    this.updateValue = function(value){
        this.value = Math.max(value, this.min)
    }

    this.processDragging = function()
    {
        let mousePos = {x: mouseX, y: mouseY}

        if (Matter.Bounds.contains(this.slider.boundingBox, mousePos))
        {
            let v = this.slider.body.vertices
            let dist = (mouseX - v[0].x) / menuSlider.w
            this.updateValue(this.max * dist)
        }
    }
}