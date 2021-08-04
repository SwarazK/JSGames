const square = document.querySelectorAll(".square");
const mole = document.querySelectorAll(".mole");
const score = document.querySelector("#score")
const timeLeft = document.querySelector("#time-left");

let result  = 0;
let hitPosition;
let currentTime = Number(timeLeft.textContent);

function randomSquare(){
    square.forEach(className => {
        className.classList.remove("mole");
    })

    let randomPosition = square[Math.floor(Math.random() * 9)];
    randomPosition.classList.add("mole");

    hitPosition = randomPosition.id;

}

square.forEach( id => {
    id.addEventListener("click", () => {
        if(id.id === hitPosition){
            result += 1;
            score.textContent = result;
        }
    })
})

let timerId = null;
function moveMole(){
    timerId = setInterval(randomSquare, 1000);
}

moveMole();

function countDown(){
    currentTime--;
    timeLeft.textContent = currentTime;
    
    if(currentTime <= 0){
        clearInterval(timerId);
        clearInterval(runId);
        alert("Time Up! Your score: " + result);
    }
}

let runId = setInterval(countDown, 1000);