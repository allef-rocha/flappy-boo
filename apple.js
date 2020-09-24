function Apple(x){
    this.r = 25
    this.pos = createVector(x, random(this.r, height - this.r))


    this.show = function(){
        fill(158, 20, 20, 255)
        stroke(255)
        strokeWeight(1)
        ellipse(this.pos.x, this.pos.y, this.r)
        noStroke()
    }

    this.update = function(){
        angleMode(RADIANS)
        let a = count*0.1
        let x_off=10*sin(a*2)
        let y_off=10*cos(a/2)
        this.pos.x += x_off
        this.pos.y += y_off
        this.pos.x -= pipeSpeed
    }

    this.eaten = function(bird){
        return (this.pos.x - bird.x)**2 + (this.pos.y - bird.y)**2 < (this.r+bird.r)**2
    }
}
