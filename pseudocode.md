2 players mode (red and green evil circle), WASD, and Arrow Keys for 2 players at once. Keep track of both scores.

add red circle 

red circle will move by WASD:
addEventListener keydown and keyup

add green circle

red circle will move by Arrow Keys
addEventListener keydown and keyup

...................................................................
function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}
...................................................................

