function Star(x, y) {
    this.x = x || random(width)
    this.y = y || random(height / 2)
    this.r = 2

    this.show = function () {
        noStroke();
        fill(255, 255, 255);
        ellipse(this.x, this.y, this.r, this.r);
    }

    this.update = function(){
        this.r -=1
        if(this.r == 0){
            this.x = random(width)
            this.y = random(height / 2)
            this.r = 2
        }
        
    }
}