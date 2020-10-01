let d = 1

function Pipe(x, y){
    this.x = x
    this.y =y
    this.w = pipeWidth
    this.gap = pipeGap
    this.speed = pipeSpeed
    this.colided = false
    this.notColided = false
    this.color = 255,100
    d *= -1
    this.dir = d

    this.show = function(){
        // fill(this.color)
        noStroke()
        image(pipeTopImg,this.x,this.y-imgPipeHeight)
        image(pipeBtmImg,this.x,this.y+this.gap, this.w,height-this.y-this.gap+groundStroke,0,0,this.w,height-this.y-this.gap+groundStroke)
        
        // stroke(255,100,100)
        // rect(this.x, 0, this.w, this.y)
        // rect(this.x, this.y + this.gap, this.w, height - this.y - this.gap)

    }

    this.update = function(){
        this.x -= this.speed
        
        let nextY = this.y + this.dir*pipeYspeed
        if(nextY > 0 && nextY + this.gap < height){
            this.y = nextY
        }else{
            this.dir *= -1
            this.y += this.dir*pipeYspeed
        }
        // if(this.colided){
        //     this.color = [255,125,125,100]
        // }else if(this.notColided){
        //     this.color = [125,255,175,100]
        // }else{
        //     this.color = [255,255,255,100]
        // }
    }
}


