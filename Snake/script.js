const squares = document.querySelectorAll(".grid div");
const scoreDisplay = document.querySelector("span");
const startBtn = document.querySelector(".start-btn");

const width = 20;
// let currentIndex = 0;
let foodIndex = 0;
let snake = [2,1,0]; //First element is the position of the head and the last element is the position of the tail
let direction = 1; //Specify directions
let score = 0;
let speed = 0.95;
let intervalTime = 0;
let interval = 0;

// to start or restart the game
function startGame(){

    //First clear the board and any intervals
    snake.forEach(index => squares[index].classList.remove("snake"));
    squares[foodIndex].classList.remove("food");
    clearInterval(interval);

    //Then reset all the variables to their default states
    score = 0;
    direction = 1;
    scoreDisplay.textContent = score;
    intervalTime = 500;
    snake = [2,1,0];
    // currentIndex = 0;
    placeFood();

    //Render the snake
    snake.forEach(index => squares[index].classList.add("snake"));

    //Start the move input interval
    interval = setInterval(moveOutcomes, intervalTime);
}

startBtn.addEventListener("click",startGame);

//Determines the outcome of the moves and changes the game state correspondingly
function moveOutcomes(){
    // Cases where the game ends => either snake hits itself of the wall(s)
    if(
        (snake[0] + width >= (width*width) && direction === width) || //When the snake hits the bottom wall, as width*widht-1 is the last cell
        (snake[0] % width === width -1 && direction === 1) || //When the snake hits the right wall, Ex. width is 10 and snake head is at a cell indexed 9/19/99...
        (snake[0] % width === 0 && direction === -1) || //When the snake hits the left wall, Ex. width is 10 and snake head is at a cell indexed 0/10/20...
        (snake[0] - width < 0 && direction === -width) ||//When the snake the top wall, as 0 is the first index
        (squares[snake[0] + direction].classList.contains("snake")) //When the snake hits itself
    ){ 
        alert("game over!!");
        return clearInterval(interval); // this will stop the snake from moving and end the game
    }

    // Default case of the snake moving
    const tail = snake.pop();
    squares[tail].classList.remove("snake");
    snake.unshift(snake[0] + direction);

    //When the snake eats an food
    if(squares[snake[0]].classList.contains("food")){
        squares[snake[0]].classList.remove("food");
        squares[tail].classList.add("snake");
        snake.push(tail);
        placeFood() //function that picks a random spot(outside the snake) to place a food in the grid
        score++;
        scoreDisplay.textContent = score;
        clearInterval(interval)
        intervalTime = intervalTime * speed;
        interval = setInterval(moveOutcomes, intervalTime);
    }
    squares[snake[0]].classList.add("snake"); //Add snake class to the head to increase the size of the snake
} 

function placeFood(){
    do{
        foodIndex = Math.floor(Math.random() * squares.length);
    }while(squares[foodIndex].classList.contains("snake"));
    squares[foodIndex].classList.add("food");
    console.log(foodIndex);
}

// Set the direction of the snake based on keyboard input 
function control(e){
    // squares[currentIndex].classList.remove('snake');
    
    if(e.keyCode === 39){
        direction = 1; //For right arrow key
    }
    else if(e.keyCode === 38){
        direction = -width; //For up key
    }
    else if(e.keyCode === 37){
        direction = -1; //For left arrow key
    }
    else if(e.keyCode === 40){
        direction = width; //For the down key 
    }
}

document.addEventListener("keyup", control);