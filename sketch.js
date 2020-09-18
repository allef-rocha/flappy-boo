const width = 1000
const height = 550

const phrases = [
	"   HAHAHA",
	"  Again???",
	"   Why???",
	"  Hitbox?",
	"  Give up",
	"   Boooo",
]

const imgGroundHeight = 50
const imgGroundWidth = 1300
const imgPipeHeight = 550
const imgPipeWidth = 550
const imgCloudWidth = 100
const imgCloudHeight = 52

const numGhostImgs = 10

const netX = width - 150
const netY = 120

const qtdBirds = 1
const topNumber = Math.ceil(qtdBirds / 30)

const birdX = 150
const birdRadius = 25
const birdJump = 14
const birdMaxSpeed = 15

const pipesDist = 90
const pipeWidth = 80
const pipeGap = 220
const pipeSpeed = 4

const TRAIN = 0
const PLAY = 1

let i = 3

let paused = true

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
let grounds = []
let clouds = []
let stars = []
let nearestPipe
let secondPipe

let count = 0
let lastCount = 0

let currentPoints = 0
let highestPoints = 0

let pScore
let pHighScore

let groundImg
let pipeTopImg
let pipeBtmImg
let cloudImg

let ghostImgs = []
let ghostImgsTint = []

let killButton
let pauseButton

let counterText = ""

let pressEnterText = ""
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

function preload() {
	groundImg = loadImage('assets/ground.png')
	pipeTopImg = loadImage('assets/pipe_top.png')
	pipeBtmImg = loadImage('assets/pipe_bottom.png')
	cloudImg = loadImage('assets/cloud.png')

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

window.mobileAndTabletCheck = function() {
	let check = false;
	(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
	return check;
  };

function setup() {
	mobileDevice = window.mobileAndTabletCheck()
	noLoop()

	for (i = 0; i < numGhostImgs; i++) {
		ghostImgsTint[i] = []
		ghostImgsTint[i] = ghostImgs[i].map((img) => img.tint(img, 255, 255, 255, 150))
	}

	let canvas = createCanvas(width, height + imgGroundHeight)
	canvas.parent('gameContainer')

	color1 = color(10, 10, 40, 0);
	color2 = color(70, 70, 70, 220);
	color3 = color(10, 10, 40);
	color4 = color(70, 70, 70);

	speedSlider = select('#speedSlider');
	speedSpan = select('#speed');

	pScore = document.getElementById("score")
	pHighScore = document.getElementById("highScore")

	pipes.push(new Pipe(width, random(5, height - pipeGap - 5), pipeWidth, pipeGap))
	nearestPipe = pipes[0]
	secondPipe = null



	grounds.push(new Ground(0, height, imgGroundWidth, imgGroundHeight))

	while (grounds[grounds.length - 1].x < width) {
		grounds.push(new Ground(grounds[grounds.length - 1].x + imgGroundWidth, height, imgGroundWidth, imgGroundHeight))
	}

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
	background(0)
	count++
	if (reset) resetGame()
	if (starting) {
		counterText = i
		if (count % 30 == 0) {
			i--
		}
		if (i < 1) {
			counterText = ""
			starting = false
			i = 3
		}
	} else {
		// compute point
		if (nearestPipe.x < birdX - birdRadius - pipeWidth) {
			nearestPipe.notColided = true
			nearestPipe = pipes[pipes.indexOf(nearestPipe) + 1]
			secondPipe = pipes[pipes.indexOf(nearestPipe) + 1]
			if (++currentPoints > highestPoints) {
				highestPoints = currentPoints
				localStorage.flappy_boo_record = highestPoints
			}
		}

		//check colision and update the bird
		bird.update()


		//update the pipes and remove if pipe is off-screen
		pipes.forEach(pipe => {
			pipe.update()
		})
		pipes.forEach((pipe, index) => {
			if (pipe.x < -pipeWidth - 5) {
				pipes.splice(index, 1)
			}
		})

		// add a new pipe each 'pipeDist' frames
		if (count % pipesDist == 0) {
			pipes.push(new Pipe(width, random(5, height - pipeGap - 5), pipeWidth, pipeGap))
			if (secondPipe == null && pipes[pipes.indexOf(nearestPipe) + 1]) {
				secondPipe = pipes[pipes.indexOf(nearestPipe) + 1]
			}
		}

		grounds.forEach((ground, index) => {
			ground.update()
			if (ground.isOffScreen()) {
				grounds.splice(index, 1)
				grounds.push(new Ground(grounds[grounds.length - 1].x + imgGroundWidth, height, imgGroundWidth, imgGroundHeight))
			}
		})

		clouds.forEach((cloud, index) => {
			cloud.update()
			if (cloud.isOffScreen()) {
				clouds.splice(index, 1)
				clouds.push(new Cloud(width))
			}
		})

		stars.forEach(star => {
			if (random(1) < 0.001)
				star.update()
		})
	}


	// show all assets
	setGradient(0, 0, width, height + imgGroundHeight, color3, color4);

	clouds.forEach((cloud, index) => {
		cloud.show()
	})
	stars.forEach(star => {
		star.show()
	})

	bird.show()
	pipes.forEach(pipe => {
		pipe.show()
	})

	grounds.forEach(ground => {
		ground.show()
	})

	setGradient(0, 0, width, height + imgGroundHeight, color1, color2);

	if (pipeColision(bird, nearestPipe) || yColision(bird)) {
		endGame()
	}

	fill(255)
	textSize(30)
	text("Score  " + currentPoints, 10, 40)
	textSize(15)
	text("Record  " + highestPoints, 10, 70)

	if (!init) {
		fill(255, 150)
		textSize(30)
		textAlign(CENTER)
		text("Press \"SPACE\" to start", width / 2, height / 2)
		textAlign(LEFT, BASELINE)
	}


	fill(255, 255, 255, 100)
	textSize(100)
	text(gameOverText, 200, height / 2)
	textSize(17)
	text(pressEnterText, 380, height / 2 + 40)

	textSize(100)
	textAlign(CENTER)
	text(counterText, width / 2, height / 2)
	textAlign(LEFT, BASELINE)

	if (pulse) {
		noLoop()
		pulse = false
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
		if (dist(bird.x, bird.y, corners[i][0], corners[i][1]) < birdRadius) {
			return true
		}
	}
	return false
}

// function that remove all the pipes, select the 'topNumber' best birds to create 
function endGame() {
	gameOver = true
	gameOverText = "Game Over"
	pressEnterText = "Press 'Space' to restart"
	noLoop()
	reset = true
	setTimeout(() => {
		littleTime = true
	}, 600)
}

function resetGame() {
	count = 1
	bird = new Bird()
	pipes = []
	pipes.push(new Pipe(width, random(5, height - pipeGap - 5), pipeWidth, pipeGap))
	nearestPipe = pipes[0]
	secondPipe = null
	currentPoints = 0
	reset = false
}

function setGradient(x, y, w, h, c1, c2) {
	noFill();
	let strWeight = 12
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
	if (!starting) {
		if (!gameOver) {
			bird.jump()
			if (!paused) {
				lastCount = count
			} else {
				countAndPay()
				paused = false
			}
			init = true
		} else if (gameOver && littleTime) {
			pressEnterText = ""
			gameOver = false
			littleTime = false
			push()
			fill(5, 195, 255, 70)
			textSize(50)
			textAlign(CENTER)
			translate(width / 2, height * 0.7)
			let rot = random(0.5, 1) * PI / 8
			random(1) > 0.5 ? rotate(-rot) : rotate(rot)
			text("Gooo!", 0, 0)
			textAlign(LEFT, BASELINE)
			pop()

			// gameOverText = random(phrases)
			pulse = true
			setTimeout(() => {
				loop()
				countAndPay()
			}, 800)
		}
	}
}

function keyPressed() {
	if (!starting) {
		if ((keyCode === ENTER || keyCode === UP_ARROW || key === " ") && !gameOver) {
			bird.jump()
			if (!paused) {
				lastCount = count
			} else {
				countAndPay()
				paused = false
			}
			init = true
		}
		// else if (keyCode === BACKSPACE && !gameOver) {
		// 	if (paused) {
		// 		loop()
		// 	} else {
		// 		noLoop()
		// 	}
		// 	paused = !paused
		// } 
		else if ((keyCode === ENTER || keyCode === UP_ARROW || key === " ") && gameOver && littleTime) {
			pressEnterText = ""
			gameOver = false
			littleTime = false
			push()
			fill(5, 195, 255, 70)
			textSize(50)
			textAlign(CENTER)
			translate(width / 2, height * 0.7)
			let rot = random(0.5, 1) * PI / 8
			random(1) > 0.5 ? rotate(-rot) : rotate(rot)
			text("Gooo!", 0, 0)
			textAlign(LEFT, BASELINE)
			pop()

			// gameOverText = random(phrases)
			pulse = true
			setTimeout(() => {
				loop()
				countAndPay()
			}, 800)
		}
	}
}

countAndPay = function () {
	gameOverText = ""
	gameOver = false
	starting = true
	loop()
	bird.jump()
}