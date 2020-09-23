function Ground(x,y,w,h){
    this.x = x
    this.y = y
    this.w = w
    this.h = h

    this.show = function(){
        noFill()
        stroke(200,100,100)
        //strokeWeight(4)
        // rect(this.x,this.y,this.w, this.y)
        image(groundImg,this.x,this.y)
        strokeWeight(1)
    }

    this.update = function(){
        this.x -= pipeSpeed
    }

    this.isOffScreen = function(){
        return (this.x < -this.w)
    }
}

