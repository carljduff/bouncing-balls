// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d'); //context is like a piece of paper

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
}

