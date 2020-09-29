const width = 1000
let height = 540
let mobileWidth = 372

const colors = [
	"#C97A15",
	"#119B28",
	"#67119B",
	"#DCD925",
	"#AE1313",
	"#DADADA",
	"#36CABE",
	"#DF4AC6",
	"#21247B",
	"#000000",
]

const phrases = [
	"   HAHAHA",
	"  Again???",
	"   Why???",
	"  Hitbox?",
	"  Give up",
	"   Boooo",
]

const groundHeight = 50
const imgPipeHeight = 550
const imgPipeWidth = 550
const imgCloudWidth = 100
const imgCloudHeight = 52

const numGhostImgs = 10

const netX = width - 150
const netY = 120

const qtdBirds = 1
const topNumber = Math.ceil(qtdBirds / 30)

let birdX = 150
const birdMobileX = 50
const birdRadius = 25
const birdJump = 14
const birdMaxSpeed = 15

const pipesDist = 90
const pipeWidth = 80
const pipeGap = 220
const pipeSpeed = 4
const pipeDistPixels = 360

const groundStroke = 10

const TRAIN = 0
const PLAY = 1

let i = 3

let paused = false

let gameMode

let color1
let color2
let color3
let color4

let chartXlabels = [0]
let chartYlabels = [0]

let drawNn

let speedSlider
let speedSpan

let score

let bird
let pipes = []
let clouds = []
let stars = []
let nearestPipe
let bones = []

let count = 0

let currentPoints = 0
let highestPoints = 0

let pScore
let pHighScore

let pipeTopImg
let pipeBtmImg
let cloudImgOrig
let cloudImg

let ghostImgs = []
let ghostImgsTint = []

let killButton
let pauseButton

let counterText = ""

let pressEnterText = ""
let pressEnterMobileText = ""
let gameOverText = ""
let gameOver = false

let reset = false
let starting = false
let pulse = false
let init = false
let littleTime = false

let showHitBox = false

let moonLight
let mobileDevice = false

let msg = true

let apple = null
let applesEaten = 0

let canvas
let sky
let fog

let darkness = 150
let increment = 1

const fr = 60

function preload() {
	pipeTopImg = loadImage('assets/pipe_top.png')
	pipeBtmImg = loadImage('assets/pipe_bottom.png')
	cloudImgOrig = loadImage('assets/cloud.png')

	for (i = 0; i < numGhostImgs; i++) {
		ghostImgs[i] = []
		ghostImgs[i].push(loadImage('assets/ghosts/ghost' + (i + 1) + '-0.png'))
		ghostImgs[i].push(loadImage('assets/ghosts/ghost' + (i + 1) + '-1.png'))
	}

	moonLight = loadFont('fonts/Moon Bold.otf')
	if (localStorage.flappy_boo_record) {
		highestPoints = localStorage.flappy_boo_record
	} else {
		localStorage.setItem('flappy_boo_record', 0)
	}
}

p5.Image.prototype.tint = function (img, r, g, b, a) {
	let pg = createGraphics(2 * birdRadius, 2 * birdRadius);
	pg.tint(r, g, b, a == undefined ? 255 : a);
	pg.image(img, 0, 0, 2 * birdRadius, 2 * birdRadius);

	return pg;
}

function detectMob() {
	return (window.innerWidth <= 800 || window.innerHeight >= 1500 || "ontouchstart" in document.documentElement)
}

window.mobileAndTabletCheck = function () {
	let check = false;
	(function (a) {
		if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
	})(navigator.userAgent || navigator.vendor || window.opera);
	return check;
};

function isMobile() {
	return detectMob() || window.mobileAndTabletCheck()
}

function transparence(img, val) {
	img.loadPixels()
	for (let i = 3; i < img.pixels.length; i += 4) {
		img.pixels[i] = img.pixels[i] === 0 ? 0 : val
	}
	img.updatePixels()
	return img
}

function setup() {
	mobileDevice = isMobile()
	setFrameRate(fr)
	noLoop()

	cloudImg = transparence(cloudImgOrig, 125)

	for (i = 0; i < numGhostImgs; i++) {
		ghostImgsTint[i] = []
		ghostImgsTint[i][0] = transparence(ghostImgs[i][0], 125)
		ghostImgsTint[i][1] = transparence(ghostImgs[i][1], 125)
	}

	if (window.innerWidth < 700 || mobileDevice) {
		let h1 = document.querySelector('h1')
		h1.style.display = 'none'
		mobileWidth = min(window.innerWidth, width)
		height = min(window.innerHeight - groundHeight, imgPipeHeight + pipeGap)
		canvas = createCanvas(mobileWidth, height + groundHeight)
		birdX = birdMobileX
	} else {
		canvas = createCanvas(width, height + groundHeight)
	}
	canvas.parent('gameContainer')

	color1 = color(10, 10, 40, 0);
	color2 = color(70, 70, 70, 200);
	color3 = color(10, 10, 40);
	color4 = color(70, 70, 70);
	speedSlider = select('#speedSlider');
	speedSpan = select('#speed');

	pScore = document.getElementById("score")
	pHighScore = document.getElementById("highScore")

	for (let i = 0; i < 4; i++) {
		pipes.push(new Pipe(width + i * pipeDistPixels, random(5, height - pipeGap - 5), pipeWidth, pipeGap))
		bones.push(new Bone(i * pipeDistPixels * random(0.6, 1.4)))
		bones.push(new Bone(i * pipeDistPixels * random(0.6, 1.4)))
	}
	nearestPipe = pipes[0]

	for (let i = 0; i < 4; i++) {
		clouds.push(new Cloud())
	}

	for (let i = 0; i < 10; i++) {
		stars.push(new Star())
	}

	textFont(moonLight);
	textAlign(LEFT, BASELINE)
	textSize(30)

	bird = new Bird()

	i = 3
	background(0)
}

function draw() {
	background(10, 10, 40)
	count++

	if (reset) resetGame()
	if (starting) {
		counterText = i
		if (count % fr == 0) {
			i--
		}
		if (i < 1) {
			counterText = ""
			i = 3
			msg = false
			starting = false
		}
	} else {
		if (apple && apple.eaten(bird)) {
			applesEaten++
			// console.log("comeu")
			apple = null
			bird.powerUp()
		}
		// compute point
		if (nearestPipe.x < birdX - birdRadius - pipeWidth) {
			nearestPipe.notColided = true
			let nextIndex = pipes.indexOf(nearestPipe) + 1 >= pipes.length ? 0 : pipes.indexOf(nearestPipe) + 1
			nearestPipe = pipes[nextIndex]
			darkness += increment
			if (darkness > 196 || darkness < 140) increment *= -1
			if (++currentPoints > highestPoints) {
				highestPoints = currentPoints
				localStorage.flappy_boo_record = highestPoints
			}
			if ((currentPoints + 3) % 10 == 0 && random(applesEaten) < 0.9) {
				apple = new Apple(nearestPipe.x + pipeDistPixels * 3 - pipeDistPixels / 2 + pipeWidth / 2)
				// console.log("maçã")
			}
		}

		//check colision and update the bird
		bird.update()

		//update the pipes and remove if pipe is off-screen
		pipes.forEach((pipe, index) => {
			pipe.update()
			if (pipe.x < -pipeWidth - 5) {
				pipe.x = pipes.length * pipeDistPixels - pipeWidth - 5
				pipe.y = random(1, height - 1 - pipeGap)
			}
		})


		clouds.forEach((cloud, index) => {
			cloud.update()
			if (cloud.isOffScreen()) {
				cloud.x = width + imgCloudWidth
			}
		})

		stars.forEach(star => {
			if (random(1) < 0.001)
				star.update()
		})
		bones.forEach(bone => {
			bone.update()
		})
		if (apple)
			apple.update()
	}

	clouds.forEach((cloud, index) => {
		cloud.show()
	})
	stars.forEach(star => {
		star.show()
	})

	noStroke()
	fill("#5a5945")
	rect(-groundStroke / 2, height, width + groundStroke, groundStroke)

	fill("#84674c")
	rect(-groundStroke / 2, height + groundStroke, width + groundStroke, groundHeight - groundStroke)

	fill("#94765a")
	// rect(-groundStroke / 2, height+2*groundStroke, width + groundStroke, groundHeight-2*groundStroke)
	fill("#9d7d60")
	rect(-groundStroke / 2, height + 2.6 * groundStroke, width + groundStroke, groundHeight - 2 * groundStroke)

	
	if (apple)
	apple.show()
	
	fill(0, 80)
	rect(-groundStroke / 2, height, width + groundStroke, groundHeight)
	
	pipes.forEach(pipe => {
		pipe.show()
	})
	
	bones.forEach(bone => {
		// bone.update()
		bone.show()
	})
	// setGradient(-groundStroke / 2, height+groundStroke/4, width + groundStroke, groundHeight, color(0,155), color(0,0))

	if (pipeColision(bird, nearestPipe)) {
		bird.dead = true
		endGame()
	}
	bird.show()

	background(70, 70, 70, darkness)

	fill(255)
	textSize(30)
	text("Score  " + currentPoints, 10, 40)
	textSize(15)
	text("Record  " + highestPoints, 10, 70)
	if (msg) {
		if (!init) {
			fill(255, 150)
			textAlign(CENTER)
			if (mobileDevice) {
				textSize(30)
				text("Press to start", mobileWidth / 2, height / 2)

			} else {
				textSize(30)
				text("Press \"SPACE\" to start", width / 2, height / 2)
			}
			textAlign(LEFT, BASELINE)
		}

		fill(255, 255, 255, 100)
		if (mobileDevice) {
			textAlign(CENTER)
			textSize(50)
			text(gameOverText, mobileWidth / 2, height / 2)
			textSize(9)
			text(pressEnterMobileText, mobileWidth / 2, height / 2 + 40)

			textSize(50)
			text(counterText, mobileWidth / 2, height / 2)
			textAlign(LEFT, BASELINE)
		} else {
			textAlign(CENTER)
			textSize(100)
			text(gameOverText, width / 2, height / 2)
			textSize(17)
			text(pressEnterText, width / 2, height / 2 + 40)

			textSize(100)
			text(counterText, width / 2, height / 2)
			textAlign(LEFT, BASELINE)
		}
	}
	if (mobileDevice && init && !starting) {
		fill(255, 200)
		noStroke()
		if (!paused) {
			rect(mobileWidth - 50, 20, 10, 40)
			rect(mobileWidth - 30, 20, 10, 40)
		} else {
			beginShape()
			vertex(mobileWidth - 50, 20)
			vertex(mobileWidth - 20, 40)
			vertex(mobileWidth - 50, 60)
			endShape(CLOSE)
		}
	}

	if (pulse) {
		noLoop()
		pulse = false
	}
	if (paused && init && !starting) {
		textAlign(CENTER)
		fill(255, 200)
		textSize(40)
		let w = mobileDevice ? mobileWidth : width
		text("Paused", w / 2, height / 2)
	}
}


// functions that verify colisions
function yColision(bird) {
	if (bird.y > height - birdRadius) {
		return true
		// return false
	}
	return false
}

function pipeColision(bird, pipe) {
	// return false
	if (bird.intangible) {
		return false
	}
	// return false
	if (bird.x > pipe.x &&
		bird.x < pipe.x + pipeWidth &&
		(bird.y < pipe.y + birdRadius || bird.y > pipe.y + pipeGap - birdRadius)) {
		return true
	}

	if (bird.x + birdRadius > pipe.x &&
		(bird.y < pipe.y || bird.y > pipe.y + pipeGap)) {
		return true
	}
	let corners = [
		[pipe.x, pipe.y],
		[pipe.x + pipeWidth, pipe.y],
		[pipe.x, pipe.y + pipeGap],
		[pipe.x + pipeWidth, pipe.y + pipeGap]
	]

	for (let i = 0; i < corners.length; i++) {
		// if (dist(bird.x, bird.y, corners[i][0], corners[i][1]) < birdRadius) {
		if ((bird.x - corners[i][0]) * (bird.x - corners[i][0]) +
			(bird.y - corners[i][1]) * (bird.y - corners[i][1]) <
			birdRadius * birdRadius) {
			return true
		}
	}
	return false
}

// function that remove all the pipes, select the 'topNumber' best birds to create 
function endGame() {
	gameOver = true
	msg = true
	gameOverText = "Game Over"
	pressEnterText = "Press 'Space' to restart"
	pressEnterMobileText = "Press to restart"
	noLoop()
	reset = true
	setTimeout(() => {
		littleTime = true
	}, 600)
}

function resetGame() {
	count = 1
	applesEaten = 0
	bird = new Bird()
	pipes = []
	bones = []
	for (let i = 0; i < 4; i++) {
		pipes.push(new Pipe(width + i * pipeDistPixels, random(5, height - pipeGap - 5), pipeWidth, pipeGap))
		bones.push(new Bone(i * pipeDistPixels * random(0.6, 1.4)))
		bones.push(new Bone(i * pipeDistPixels * random(0.6, 1.4)))
	}
	nearestPipe = pipes[0]
	currentPoints = 0
	apple = null
	reset = false
}

function setGradient(x, y, w, h, c1, c2) {
	noFill();
	let strWeight = groundStroke / 2
	strokeWeight(strWeight)
	for (let i = y; i <= y + h; i += strWeight) {
		var inter = map(i, y, y + h, 0, 1);
		var c = lerpColor(c1, c2, inter);
		stroke(c);
		line(x, i, x + w, i);
	}
	strokeWeight(1)
}

function touchStarted(e) {
	e.preventDefault()
	let x, y
	if (e.touches) {
		x = e.touches[0].clientX
		y = e.touches[0].clientY
	}
	if (x > 300 && y < 60 && mobileDevice && init && !starting) {
		if (paused) {
			paused = false
			countAndPlay(false)
		} else {
			paused = true
			noLoop()
		}
	} else if (!starting) {
		if (!gameOver) {
			bird.jump()
			if (!paused && !init) {
				countAndPlay()
			}
			init = true
		} else if (gameOver && littleTime) {
			msg = false
			pressEnterText = ""
			pressEnterMobileText = ""
			gameOver = false
			littleTime = false
			push()
			fill(bird.color)
			textAlign(CENTER)
			textSize(50)
			if (mobileDevice) {
				translate(mobileWidth / 2, height * 0.7)
			} else {
				translate(width / 2, height * 0.7)
			}
			let rot = random(0.5, 0.8) * PI / 8
			random(1) > 0.5 ? rotate(-rot) : rotate(rot)
			text("Go!", 0, 0)
			textAlign(LEFT, BASELINE)
			pop()

			// gameOverText = random(phrases)
			pulse = true
			setTimeout(() => {
				loop()
				countAndPlay()
			}, 800)
		}
	}
}

function keyPressed() {
	if (!starting) {
		if ((keyCode === ENTER || keyCode === UP_ARROW || key === " ") && !gameOver) {
			bird.jump()
			if (!paused && !init) {
				countAndPlay()
			}
			init = true
		} else if (keyCode === BACKSPACE && !gameOver && init) {
			if (paused) {
				paused = false
				countAndPlay(false)
			} else {
				paused = true
				noLoop()
			}
		} else if ((keyCode === ENTER || keyCode === UP_ARROW || key === " ") && gameOver && littleTime) {
			msg = false
			pressEnterText = ""
			pressEnterMobileText = ""
			gameOver = false
			littleTime = false
			push()
			fill(bird.color)
			textSize(50)
			textAlign(CENTER)
			translate(width / 2, height * 0.7)
			let rot = random(0.5, 1) * PI / 8
			random(1) > 0.5 ? rotate(-rot) : rotate(rot)
			text("Go!", 0, 0)
			textAlign(LEFT, BASELINE)
			pop()

			// gameOverText = random(phrases)
			pulse = true
			setTimeout(() => {
				loop()
				countAndPlay()
			}, 800)
		}
	}
}

countAndPlay = function (willJump = true) {
	msg = true
	gameOverText = ""
	gameOver = false
	starting = true
	paused = false
	count = 1
	loop()
	if (willJump) bird.jump()
}