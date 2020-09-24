function Apple(x){
    this.r = 25
    this.pos = createVector(x, random(this.r, height - this.r))


    this.show = function(){
        fill(158, 20, 20, 255)
        stroke(255)
        ellipse(this.pos.x, this.pos.y, this.r)
        noStroke()
    }

    this.update = function(){
        let a = map(count%60,0,59,-PI,PI)
        this.pos.x+=2*sin(a)
        this.pos.y+=5*cos(3*a)
        this.pos.x -= pipeSpeed
    }

    this.eaten = function(bird){
        return (this.pos.x - bird.x)**2 + (this.pos.y - bird.y)**2 < (this.r+bird.r)**2
    }
}
