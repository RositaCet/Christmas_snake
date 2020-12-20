const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

//create a unit 
const box = 32;

//load image
const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

//creat the snake 
let snake = [];
let christmas = ['S', 'U', 'K', 'A', 'L', 'Ė', 'D', 'O', 'M', 'I', 'S'];
let k = 2;
let j = 0;

snake[0] = {
    x: 9 * box,
    y: 10 * box
}

//creat the food

let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
}

// creat the score var 
let score = 0;

//control the snake
let d;

document.addEventListener("keydown", direction)

function direction(event) {
    let key = event.keyCode;
    if (key == 37 && d != "RIGHT") {

        d = "LEFT";
    }
    else if (key == 38 && d != "DOWN") {
        d = "UP";
    }
    else if (key == 39 && d != "LEFT") {
        d = "RIGHT";
    }
    else if (key == 40 && d != "up") {
        d = "DOWN";
    }

}

// check for collision
function collation(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

//drew everything to the cenvas
function draw() {
    ctx.drawImage(ground, 0, 0);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }
    ctx.drawImage(foodImg, food.x, food.y);

    //Old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;



    //withch direction
    if (d == "LEFT") snakeX -= box;
    if (d == "UP") snakeY -= box;
    if (d == "RIGHT") snakeX += box;
    if (d == "DOWN") snakeY += box;

    //if the snake eats food
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        }

    } else {
        //remove the tatil
        snake.pop();
    }

    //ADD NEW HEAD

    let newHead = {
        x: snakeX,
        y: snakeY
    }



    //game over
    if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box ||
        snakeY > 17 * box || collation(newHead, snake)) {
        if (confirm('Pralaimejote. Paspauskite "ok" pradeti išnaujo.')) {
            window.location = '/'
        }
        clearInterval(game);

    }








    snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font = "45px Change pne";
    ctx.fillText(score, 2 * box, 1.5 * box);


    ctx.fillStyle = "red";
    ctx.font = "45px Change pne";
    ctx.fillText(christmas[1], 4 * box, 1.5 * box);

    //if (score == k) {
    //    drawChristmas();
    //
    // }


}
let n = 4;
function drawChristmas() {

    j++;
}

//call draw funcion every 100ms
let game = setInterval(draw, 100);