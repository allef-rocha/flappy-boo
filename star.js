function Star(x, y) {
    this.x = x || random(width)
    this.y = y || random(height / 2)
    this.r = ceil(random(3))

    this.show = function () {
        noStroke();
        fill(255, 255, 255, 255 - (this.r-1)*55);
        ellipse(this.x, this.y, this.r, this.r);
        stroke(255)
        strokeWeight(1)
        noStroke();
    }

    this.update = function(){
        this.r -=1
        if(this.r == 0){
            this.x = random(width)
            this.y = random(height / 2)
            this.r = 3
        }
        
    }
}