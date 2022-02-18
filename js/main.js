// setup canvas
const canvas = document.querySelector('canvas');

//makes ctx like the piece of paper
const ctx = canvas.getContext('2d'); 

//making the canvas width/height change with the window width/height
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

/*let rightPressed = false;
let leftPressed = false;
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);*/

// function to generate random number
function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

// function to generate random color
function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}


//Creating the parent class
class Main {
	constructor(x, y, velX, velY) {
		this.x = x;
		this.y = y;
		this.velX = velX;
		this.velY = velY;
	}
}


//Creating a ball class so it can have it's own properties... 
class Ball extends Main {
    constructor(x, y, velX, velY, color, size) {
        super(x, y, velX, velY);
        this.collide = true;
        this.color = color;
        this.size = size;
    }

    draw() {
        ctx.beginPath(); //states that we want to draw a shape on the paper(ctx).
        ctx.fillStyle = this.color; //defines what color we want the shape to be... "this.color" sets it to the ball's color property.
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI); //traces an arc shape on the paper. X & Y position of the arc's center, specifying their properties. The radius is the ball's size property. The last two parameters specify the start and end number of degrees around the circle that the arc is drawn betwee. 0 degrees and 2 * PI is 360 degrees in radians which is a circle. 
        ctx.fill(); //fills the area of the circle with the color specified in fillStyle.
    }

    update() {
        //if the x coord. is greater than the width of the canvas (the ball is going off the right edge).
        if ((this.x + this.size) >= width) {
            this.velX = -(this.velX);
        }
        //if the x coord. is smaller than 0 (the ball is going off the left edge).
        if ((this.x - this.size) <= 0) {
            this.velX = -(this.velX);
        }
        //if the y coord. is greater than the height of the canvas (the ball is going off the bottom edge).
        if ((this.y + this.size) >= height) {
            this.velY = -(this.velY);
        }
        //if the y coord. is smaller than 0 (the ball is going off the top edge).
        if ((this.y - this.size) <= 0) {
            this.velY = -(this.velY);
        }
        //adds them together..the ball is in effect moved each time this method is called.
        this.x += this.velX;
        this.y += this.velY;
    }

    collisionDetect() {
        for (const ball of balls) {
            if (!(this === ball)) {
                const dx = this.x - ball.x;
                const dy = this.y - ball.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.size + ball.size) {
                    ball.color = this.color = randomRGB();
                    ball.size = random(5, 20);
                }
            }
        }
    }
}


class EvilOne extends Main {
    constructor(x, y) {
        super(x, y, 5, 5);
        this.color = 'green';
        this.size = 100;


    }

    draw() {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.stroke();
    }

    updateEvilOne() {
       
        if ((this.x + this.size) >= width) {
            this.velX = -(this.velX);
        }
       
        if ((this.x - this.size) <= 0) {
            this.velX = -(this.velX);
        }
        
        if ((this.y + this.size) >= height) {
            this.velY = -(this.velY);
        }
        
        if ((this.y - this.size) <= 0) {
            this.velY = -(this.velY);
        }
        
        this.x += this.velX;
        this.y += this.velY;
    
    }

    collisionDetect() {
        for (const ball of balls) {
            if (!(this === ball) && ball.collide) {
                const dx = this.x - ball.x;
                const dy = this.y - ball.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.size + ball.size) {
                    ball.collide = false;
                    balls.pop();
                }
            }
        }
    }
    
}


const evilBall = new EvilOne(
    random(0, width),
    random(0, height)
);

//a place to store the balls
const balls = [];

while (balls.length < 25) { //how many balls
    const size = random(5, 10); //controlling their size with the random function
    const ball = new Ball( 
        random(0 + size,width - size),
        random(0 + size,height - size),
        random(-7, 7),
        random(-7, 7),
        'blue',
        size
    );
    balls.push(ball);
}

function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
    ctx.fillRect(0, 0, width, height);

    for (const ball of balls) {
        ball.draw();
        ball.update();
        ball.collisionDetect();
    }

evilBall.draw();
evilBall.updateEvilOne();
evilBall.collisionDetect();
    requestAnimationFrame(loop);
    
}  
loop();






