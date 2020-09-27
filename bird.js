const powerTime = 500
let stage = 0

function Bird() {
    this.x = birdX
    this.y = height / 2
    this.r = birdRadius
    this.velocity = 0
    this.acc = 0.8
    this.maxSpeed = birdMaxSpeed
    this.onTheGround = false
    this.imageIndex = floor(random(ghostImgsTint.length))
    this.color = color(colors[this.imageIndex])
    this.color.setAlpha(125)
    this.image = ghostImgsTint[this.imageIndex]
    this.score = 0
    this.intangible = false
    this.clock = 0

    this.show = function () {
        // fill(this.color)
        noFill()
        //tint(255,100)
        // if (!mobileDevice && !stage!=1) {
        if (stage == 1) {
            imageMode(CENTER)
            if (this.velocity > 0 || this.onTheGround) {
                image(this.image[0], this.x, this.y)
            } else {
                image(this.image[1], this.x, this.y)
            }
            // noTint()
            imageMode(CORNER)
        } else if (stage == 2){
            noFill()
            stroke(255)
            strokeWeight(2)
            ellipse(this.x, this.y, this.r * 2)
            line(this.x + 5, this.y + 13, this.x + 17, this.y + 13)
            if (this.velocity > 0 || this.onTheGround) {
                ellipse(this.x + 5, this.y, 15)
                ellipse(this.x + 20, this.y + 1, 10, 12)
            } else {
                line(this.x, this.y, this.x + 12.5, this.y)
                line(this.x + 15, this.y, this.x + 25, this.y)
            }
        }else if(stage == 0){
            fill(this.color)
            stroke(255)
            strokeWeight(1)
            ellipse(this.x, this.y, this.r * 2)
            line(this.x + 5, this.y + 13, this.x + 17, this.y + 13)
            if (this.velocity > 0 || this.onTheGround) {
                fill(117, 192, 255, 125)
                ellipse(this.x + 5, this.y, 15)
                ellipse(this.x + 20, this.y + 1, 10, 12)
            } else {
                line(this.x, this.y, this.x + 12.5, this.y)
                line(this.x + 15, this.y, this.x + 25, this.y)
            }

            noStroke()
            noFill()
            noStroke()
        }
        if (showHitBox) {
            noFill()
            stroke(255, 0, 0)
            ellipse(this.x, this.y, this.r * 2)
        }
        noStroke()
    }
    this.update = function () {
        if (this.intangible) {
            this.clock++
            if (this.clock > powerTime) {
                this.toNormal()
            } else if (this.clock > powerTime * 0.75) {
                if (count % 25 === 0) {
                    stage = stage === 1 ? 2 : 1
                }
            }
        }
        this.velocity = min(this.velocity + this.acc, this.maxSpeed)
        this.y += this.velocity
        if (this.y < this.r) {
            this.y = this.r
            this.velocity = 0
        } else if (this.y > height - this.r + groundStroke) {
            this.onTheGround = true
            this.y = height - this.r + groundStroke
            this.velocity = 0
        } else {
            this.onTheGround = false
        }

        this.score++
    }

    this.jump = function (jumpSize = birdJump) {
        this.velocity = -jumpSize
    }

    this.powerUp = function () {
        this.intangible = true
        this.clock = 0
        stage = 1
    }

    this.toNormal = function () {
        this.intangible = false
        this.clock = 0
        stage = 0
    }

}
