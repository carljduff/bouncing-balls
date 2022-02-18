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


//Creating the parent class for others to inherit
class Shape {
	constructor(x, y, velX, velY) {
        //x & y state where the ball starts on the screen
		this.x = x; 
		this.y = y;
        //velX & velY is for velocity
		this.velX = velX;
		this.velY = velY;

	}
}


//Creating a ball class so it can have it's own properties and behaviors by achieving...
//inheritance from class Shape
class Ball extends Shape {
    //still have to assign the parameters from parent constructor, but can add additional
    constructor(x, y, velX, velY, color, size) { 
        //calls the parent constructor
        super(x, y, velX, velY); 
        this.color = color; 
        this.size = size;
        this.exists = true;
    }

    draw() {
        //states that we want to draw a shape on the paper(ctx).
        ctx.beginPath(); 
        //defines what color we want the shape to be... "this.color" sets it to the ball's color property.
        ctx.fillStyle = this.color;
        //traces an arc shape on the paper. X & Y position of the arc's center, specifying their properties. The radius is the ball's size property. 
        //The last two parameters specify the start and end number of degrees around the circle that the arc is drawn between, 0 degrees 
        //and 2 * PI is 360 degrees in radians which is a circle. 
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI); 
        //fills the area of the circle with the color specified in fillStyle.
        ctx.fill(); 
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
        //adds where the balls start and their velocity to move them by this much on each frame
        //each time this method is called
        this.x += this.velX;
        this.y += this.velY;
    }

    collisionDetect() {
        //algorithm that works by taking the center points of the two circles
        //and ensuring the distance between the center points are less than the two radii added together
        for (const ball of balls) {
            if (!(this === ball) && ball.exists) {
                const dx = this.x - ball.x;
                const dy = this.y - ball.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.size + ball.size) {
                    ball.color = this.color = randomRGB();
                    //when balls collide, their size randomly change
                    ball.size = this.size = random(5, 20);
                }
            }
        }
    }
}

//new class inherited from Ball
class EvilOne extends Ball {
    constructor(x, y) {
        //calls the Ball constructor 
        super(x, y, 20, 20); 
        this.color = 'green';
        this.size = 30;

    }

    draw() {
        ctx.beginPath();
        ctx.lineWidth = 5;
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
        
    
    }

    collisionDetect() {
        for (const ball of balls) {
            if (ball.exists) {
                const dx = this.x - ball.x;
                const dy = this.y - ball.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.size + ball.size) {
                    //removes the last ball from the array
                    //balls.pop(ball);
                    ball.exists = false;
                    
                }
            }
        }
    }
    
}

//creating a new instance of EvilOne
const evilBall = new EvilOne(
    //starts in the top left corner
    random(0, width),
    random(0, height),

    window.addEventListener("keydown", (event) => {
        switch (event.key) {
           case "ArrowLeft":
            evilBall.x -= evilBall.velX;
           break;
           case "ArrowRight":
            evilBall.x += evilBall.velX;
           break;
           case "ArrowUp":
            evilBall.y -= evilBall.velY;
           break;
           case "ArrowDown":
            evilBall.y += evilBall.velY;
           break;
        }
    })
);

//a place to store the balls
const balls = [];

//how many balls
while (balls.length < 50) { 
    const size = random(5, 10);
    //create a new instance of Ball
    //ball position always drawn at least one ball width
    //away from the edge of the cavas to avoid drawing errors
    const ball = new Ball( 
        random(0 + size,width - size),
        random(0 + size,height - size),
        random(-7, 7),
        random(-7, 7),
        //changed starting color to blue
        'blue',
        size
    );
    balls.push(ball); 
}

function loop() {
    //sets the canvas fill color to semi-transparent black
    ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
    //draws a rectangle of the color across the whole width/height
    //of the canvas. It covers up the previous frame's drawing before the next is drawn.
    ctx.fillRect(0, 0, width, height);

    for (const ball of balls) {
        if (ball.exists) {
        ball.draw();
        ball.update();
        ball.collisionDetect(); 
        }
        
        
    }

    evilBall.draw();
    evilBall.updateEvilOne();
    evilBall.collisionDetect();
    
    requestAnimationFrame(loop);
    
}  



//starts the program
loop();

