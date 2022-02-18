1. Create a canvas, get the canvas and getContext from canvas.

2. Canvas needs to take the size of the window viewport.

3. Create a Function for a random number and a function for random color.

4. Create a Class for the Ball.
* constructor method will contain x & y axis and velocities, color, size
* assign the instance properties... I.E: this.x = x, this.y = y....
* add methods to draw, update, collision detection 

6. Draw Function will only draw the ball in position.
* beginPath();
* fillStyle for color
* arc for circle
* fill to fill the circle completely

7. Update Function for updating the ball's data and to move the ball...
* check IF the x coordinate is going off the right edge... IF it is send it back to the left. (x coordinate is > the width of the canvas)
* check IF the x coordinate is going off the left edge... IF it is send it back to the right. (x coordinate is < 0)
* check IF the y coordinate is going off the bottom edge... IF it is send it back up. (y coordinate is > the height of the canvas)
* check IF the y coordinate is going off the top edge... IF it is send it back down. (y coordinate < 0)

8. Create place to store/populate
* create an empty array to store the balls and populate
* WHILE the arrayname.length is < a number, make the size = random FUNCTION
* make a new instance of the ball by using new Ball(x, y, velX, velY, color, size); 
* push the balls into the array with arrayname.push(new instance name);
* ENDWHILE

9. Add a method for collision detection.
* for each ball, check every other ball to see if it has collided with the current ball.
* start a FOR OF loop to loop through all the balls in the array.
* use an IF statement to check whether the current ball being looped through is the same ball as the one we are currently checking. (you don't want to check whether a ball has collided with itself)
* use a common algorithm to check the collision of the two circles and whether any of the two circle's areas overlap.
* if collision is detected, set the color property of both circles to a new random color.

10. Create a function for animation
* set the canvas fill color to semi-transparent black
* draw a recetangle of the color across the whole width and height of the canvas
* use fillRect() to cover up the previous frame's drawing before the next one is drawn...
* it needs to loop through all the balls in the array created and run each the draw and update Function to draw each one on the screen then updates to the position and velocity in time for the next frame.
* use the method requestAnimationFrame(function name created for animation) to repeatedly run and pass in the same function name so it's done recursively and recalls itself every time it runs.
* invoke the draw, update and collision detection methods.

11. Call your function for animation and the program should run. 


