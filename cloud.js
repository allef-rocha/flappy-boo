function Cloud(x){
    this.x = x || floor(random(width))
    this.y = floor(random(height/2))
    this.z = random(1,3)
    this.w = imgCloudWidth / this.z
    this.h = imgCloudHeight / this.z
    
    this.velocity = 2/this.z

    this.show = function(){
        // tint(255,126)
        image(cloudImg,this.x,this.y, this.w, this.h)
        // noTint()
    }

    this.update = function(){
        this.x -= this.velocity
    }

    this.isOffScreen = function(){
        return(this.x < -this.w)
    }

}
