const APPLE = 0
const POISON = 1

function Apple(x, type = APPLE) {
    this.type = type
    this.r = 25
    this.pos = createVector(x, random(this.r, height - this.r))
    this.x_off = 0
    this.y_off = 0

    this.show = function () {
        if (this.type == APPLE) {
            fill(158, 20, 20, 255)
        } else if (this.type == POISON) {
            fill(20, 20, 158, 255)
        }
        stroke(255)
        strokeWeight(1)
        let x = this.pos.x + this.x_off
        let y = this.pos.y + this.y_off
        let a = count * 0.1
        ellipse(x, y, this.r)
        stroke(23, 222, 43)
        let leaf = map(cos((PI + a)), -1, 1, 2, 4)
        strokeWeight(leaf)
        line(x, y - this.r / 2 + 2 * (leaf - 2), x + this.r / 6 * sin(a), y - this.r * 0.75 + 2 * (leaf - 2))
        noStroke()
    }

    this.update = function () {
        angleMode(RADIANS)
        let a = count * 0.1
        this.x_off = 20 * sin(a)
        this.y_off = 50 * cos(a / 2)
        this.pos.x -= pipeSpeed
        if (this.pos.x < -3 * this.r) apple = null
    }

    this.eaten = function (bird) {
        return (this.pos.x + this.x_off - bird.x) ** 2 + (this.pos.y + this.y_off - bird.y) ** 2 < (this.r + bird.r) ** 2
    }
}