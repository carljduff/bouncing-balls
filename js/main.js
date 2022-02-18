// setup canvas
const canvas = document.querySelector('canvas');

//makes ctx like the piece of paper
const ctx = canvas.getContext('2d'); 

//making the canvas width/height change with the window width/height
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number
function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

// function to generate random color
function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

class Ball {
    constructor(x, y, velX, velY, color, size) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.size = size;
    }

    draw() {
        ctx.beginPath(); // states that we want to draw a shape on the paper(ctx).
        ctx.fillStyle = this.color; // defines what color we want the shape to be... "this.color" sets it to the ball's color property.
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI); //traces an arc shape on the paper. X & Y position of the arc's center, specifying their properties. The radius is the ball's size property. The last two parameters specify the start and end number of degrees around the circle that the arc is drawn betwee. 0 degrees and 2 * PI is 360 degrees in radians which is a circle. 
        ctx.fill(); // fills the area of the circle with the color specified in fillStyle.
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
                    ball.size = 35;
                }
            }
        }
    }
}

//a place to store the balls
const balls = [];

while (balls.length < 10) { //how many balls
    const size = random(10,20); //controlling their size with the random function
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
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, width, height);

    for (const ball of balls) {
        ball.draw();
        ball.update();
        ball.collisionDetect();
    }
    requestAnimationFrame(loop);
}

loop();



