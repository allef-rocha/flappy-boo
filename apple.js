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
        this.pos.x+=50*sin(count/6)
        this.pos.y+=50*cos(count/6)
        this.pos.x -= pipeSpeed
    }

    this.eaten = function(bird){
        return (this.pos.x - bird.x)**2 + (this.pos.y - bird.y)**2 < (this.r+bird.r)**2
    }
}
