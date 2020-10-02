const powerTime = 500
let stage = 0
let flagTransitSound = true


function Bird() {
    stage = 0
    this.x = birdX
    this.y = height * 0.36
    this.r = birdRadius
    this.velocity = 0
    this.acc = 0.8
    this.maxSpeed = birdMaxSpeed
    this.onTheGround = false
    this.imageIndex = floor(random(ghostImgsTint.length))
    this.color = color(colors[this.imageIndex])
    this.color.setAlpha(200)
    this.image = ghostImgsTint[this.imageIndex]
    this.score = 0
    this.intangible = false
    this.nauseable = false
    this.clock = 0
    this.nauseClock = 0
    this.dead = false

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
        } else if (stage == 2) {
            noFill()
            stroke(255)
            strokeWeight(2)
            ellipse(this.x, this.y, this.r * 2)
            // arc(this.x+11,this.y+17,15,10,PI+0.4,-0.4,OPEN) 
            ellipse(this.x + 5, this.y, 15)
            ellipse(this.x + 20, this.y + 1, 10, 12)
        } else if (stage == 0 || stage == 3) {
            fill(this.color)
            stroke(255)
            strokeWeight(1)
            ellipse(this.x, this.y, this.r * 2)
            if (this.dead || stage == 3) {
                fill(191, 242, 255, 200)
                arc(this.x + 5, this.y, 15, 15, -HALF_PI + 0.9, PI, CHORD)
                arc(this.x + 20, this.y + 1, 10, 12, 0, -HALF_PI - 0.7, CHORD)
                noFill()
                arc(this.x + 11, this.y + 17, 15, 10, PI + 0.4, -0.4, OPEN)
            } else {
                if (this.velocity === this.maxSpeed) {
                    fill("#eee")
                    ellipse(this.x + 13, this.y + 13, 7)
                    fill(191, 242, 255, 200)
                    ellipse(this.x + 5, this.y, 15)
                    ellipse(this.x + 20, this.y + 1, 10, 12)
                } else if (this.velocity > 0 || this.onTheGround) {
                    fill("#eee")
                    arc(this.x + 11, this.y + 11, 15, 10, 0.2, PI - 0.2, CHORD)
                    fill(191, 242, 255, 200)
                    ellipse(this.x + 5, this.y, 15)
                    ellipse(this.x + 20, this.y + 1, 10, 12)
                } else {
                    fill("#eee")
                    arc(this.x + 11, this.y + 11, 15, 13, 0.2, PI - 0.2, CHORD)
                    noFill()
                    arc(this.x + 6, this.y + 1, 12, 8, -PI, PI)
                    arc(this.x + 20, this.y + 1, 9, 6, PI, -PI)
                }
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
                if (flagTransitSound) {
                    sTransition.play()
                    flagTransitSound = false
                }
                if (count % 25 === 0) {
                    stage = stage === 1 ? 2 : 1
                }
            }
        }
        if (this.nauseable) {
            this.nauseClock++
            if (this.nauseClock > powerTime) {
                pipeYspeed = 0
                stage = 0
                this.nauseClock = 0
                this.nauseable = false
                bgGreen = 70
                flagTransitSound = true
            } else if (this.nauseClock > powerTime*0.9) {
                bgGreen = constrain(bgGreen + (powerTime*0.9 - this.nauseClock)/6,70,90)
                if (flagTransitSound) {
                    sTransition.play()
                    sMusic.rate(1)
                    flagTransitSound = false
                }
            } else {
                bgGreen = constrain(this.nauseClock/6 + 70, 70, 90)
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
        sJump.play()
        this.velocity = -jumpSize
    }

    this.powerUp = function () {
        this.intangible = true
        this.clock = 0
        stage = 1
    }

    this.nausea = function () {
        pipeYspeed = 0.5
        sMusic.rate(0.95)
        this.nauseable = true
        this.nauseaClock = 0
        bgGreen = 110
        stage = 3
    }

    this.toNormal = function () {
        flagTransitSound = true
        this.intangible = false
        this.clock = 0
        stage = 0
    }

}
