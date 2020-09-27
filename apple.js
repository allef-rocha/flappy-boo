function Apple(x) {
    this.r = 25
    this.pos = createVector(x, random(this.r, height - this.r))
    this.x_off = 0
    this.y_off = 0

    this.show = function () {
        fill(158, 20, 20, 255)
        stroke(255)
        strokeWeight(1)
        ellipse(this.pos.x + this.x_off, this.pos.y + this.y_off, this.r)
        noStroke()
    }

    this.update = function () {
        angleMode(RADIANS)
        let a = count * 0.1
        this.x_off = 20 * sin(a)
        this.y_off = 50 * cos(a / 2)
        this.pos.x -= pipeSpeed
    }

    this.eaten = function (bird) {
        return (this.pos.x + this.x_off - bird.x) ** 2 + (this.pos.y + this.y_off - bird.y) ** 2 < (this.r + bird.r) ** 2
    }
}