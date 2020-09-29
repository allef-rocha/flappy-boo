const BONE = 0
const HEAD = 1
const STONE = 2

const SHAPES = [STONE, BONE, STONE, HEAD, STONE, BONE, STONE]

function Bone(x, type) {
    this.speed = createVector(-pipeSpeed, 0)
    this.type = type || random(SHAPES)
    let y = random(height + 20, height + groundHeight)
    if(this.type == STONE) y -= 20
    this.pos = createVector(x, y)
    this.angle = random(-PI, PI)
    this.size = map(this.pos.y, height, height+groundHeight, 0.2*groundHeight, 0.5*groundHeight)
    
    this.reset = function (x) {
        this.type = random(SHAPES)
        let y = random(height + 20, height + groundHeight)
        if(this.type == STONE) y -= 20
        this.pos = createVector(x, y)
        this.angle = random(-PI, PI)
        this.size = map(this.pos.y, height, height+groundHeight, 0.2*groundHeight, 0.5*groundHeight)
        
    }

    this.update = function () {
        this.pos.add(this.speed)
        if (this.pos.x < -2 * this.size)
            this.reset(width + 4 * this.size)
    }

    this.show = function () {

        switch (this.type) {
            case BONE:
                this.bone()
                break;
            case HEAD:
                this.head()
                break;
            case STONE:
                this.stone()
                break;
            default:
                break;
        }
        rectMode(CORNER)
        scale(1)
    }

    this.head = function () {
        push()
        rectMode(CENTER)
        translate(this.pos.x, this.pos.y)
        rotate(this.angle/4 - PI/2)
        scale(this.size / 100)
        noStroke();
        fill(160);
        strokeWeight(2);
        stroke(100);
        ellipse(0, 0, 100);
        noStroke();
        rect(0, 50, 50, 20);
        fill(100);
        ellipse(22, 0, 30, 20);
        ellipse(-22, 0, 30, 20)
        ellipse(0, 25, 15, 10);
        ellipse(0, 20, 10, 20);
        stroke(100);
        for (let i = -25; i <= 25; i += 10) {
            line(i, 45,
                i, 60);
        }
        line(-25, 60, 25, 60);

        pop()
    }

    this.bone = function () {
        push()
        rectMode(CENTER)
        translate(this.pos.x, this.pos.y)
        rotate(this.angle/3)
        scale(this.size / 100)
        fill(200)
        noStroke()
        rect(0, 0, 100, 20)
        ellipse(-50, -8, 20)
        ellipse(-50, 8, 20)
        ellipse(50, -8, 20)
        ellipse(50, 8, 20)

        pop()
    }

    this.stone = function () {
        push()
        rectMode(CENTER)
        translate(this.pos.x, this.pos.y)
        rotate(this.angle/6)
        scale(this.size / 200)
        fill(180)
        strokeWeight(2)
        stroke(140)
        beginShape()
        vertex(-35, 50)
        vertex(35, 50)
        vertex(50, 15)
        vertex(15, -50)
        vertex(-15, -50)
        vertex(-50, 15)
        endShape(CLOSE)

        pop()
    }
}