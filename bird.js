function Bird() {
    this.x = birdX
    this.y = height / 2
    this.r = birdRadius
    this.velocity = 0
    this.acc = 0.8
    this.maxSpeed = birdMaxSpeed
    this.onTheGround = false

    this.image = random(ghostImgsTint)

    this.score = 0

    this.show = function () {
        // fill(this.color)
        noFill()
        imageMode(CENTER)
        //tint(255,100)
        if(this.velocity > 0 || this.onTheGround){
            image(this.image[0],this.x,this.y, this.r*2, this.r*2)
        }else{
            image(this.image[1],this.x,this.y)
        }
        noTint()
        imageMode(CORNER)
        if(showHitBox){
            noFill()
            stroke(255,0,0)
            ellipse(this.x, this.y, this.r * 2)
        }
    }
    this.update = function () {
        this.velocity = min(this.velocity + this.acc, this.maxSpeed)
        this.y += this.velocity
        if (this.y < this.r) {
            this.y = this.r
            this.velocity = 0
        }else if(this.y > height-this.r){
            this.onTheGround = true
            this.y = height - this.r
            this.velocity = 0
        }else{
            this.onTheGround = false
        }

        this.score++
    }

    this.jump = function (jumpSize = birdJump) {
        this.velocity = -jumpSize
    }

}