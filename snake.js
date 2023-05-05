
//boared
var blockSize = 25;
var rows =20;
var cols = 20;
var board;
var context;

// snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var volocityX = 0;
var volocityY = 0;

var snakeBody = [];

// food
var foodX;
var foodY;

var gameOver = false

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); //used for drawing on board

    placeFood();
    document.addEventListener("keyup", changeDirection);
    //update();
    setInterval(update, 130,10);
}

function update() {
    if (gameOver) {
        return;
    }

    context.fillStyle="Black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle="Red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY])
        placeFood();
    }

    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }
    context.fillStyle="Lime";
    snakeX += volocityX * blockSize;
    snakeY += volocityY * blockSize;
    context.fillRect(snakeX, snakeY,  blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    
   //game over conds
   if (snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize) {
    gameOver = true
    alert("Game Over");
   }

   for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
        gameOver = true
        alert("Game Over")
    }
   }
    
}

function changeDirection(e) {
if (e.code == "ArrowUp" && volocityY != 1) {
    volocityX = 0;
    volocityY = -1;
}
 else if (e.code == "ArrowDown" && volocityY != -1) {
    volocityX = 0;
    volocityY = 1;
}
else if (e.code == "ArrowLeft" && volocityX != 1) {
    volocityX = -1;
    volocityY = 0;
}
if (e.code == "ArrowRight" && volocityX != -1) {
    volocityX = 1;
    volocityY = 0;
}
}


function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}