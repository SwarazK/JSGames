// document.addEventListener("DOMContentLoaded", ()=>{

// Array that contains all the food cards

const cardsArray = [
    {
        name: "fries",
        img: "src/fries.png"
    },
    {
        name: "fries",
        img: "src/fries.png"
    },
    {
        name: "cheeseburger",
        img: "src/cheeseburger.png"
    },
    {
        name: "cheeseburger",
        img: "src/cheeseburger.png"
    },
    {
        name: "hotdog",
        img: "src/hotdog.png"
    },
    {
        name: "hotdog",
        img: "src/hotdog.png"
    },
    {
        name: "ice-cream",
        img: "src/ice-cream.png"
    },
    {
        name: "ice-cream",
        img: "src/ice-cream.png"
    },
    {
        name: "milkshake",
        img: "src/milkshake.png"
    },
    {
        name: "milkshake",
        img: "src/milkshake.png"
    },
    {
        name: "pizza",
        img: "src/pizza.png"
    },
    {
        name: "pizza",
        img: "src/pizza.png"
    },
];

const grid = document.querySelector(".grid");
const resultDisplay = document.querySelector("#result");
let cardsChosen = [];
let cardsChosenId = [];
let cardsWon = [];

//intialize / create grid

function createBoard(){
    cardsArray.sort(() => 0.5 - Math.random());
    for(let i = 0; i < cardsArray.length; i++){
        let card = document.createElement("img");
        card.setAttribute("src", "src/blank.png");
        card.setAttribute("data-id",i);
        card.addEventListener("click", flip);
        grid.appendChild(card);
    }
}

createBoard();

//check for matches
function checkForMatch(){
    var cards = document.querySelectorAll("img");
    const choiceOne = cardsChosenId[0];
    const choiceTwo = cardsChosenId[1];
    if(cardsChosen[0] ===  cardsChosen[1]){
        alert("The cards match!");
        cards[choiceOne].setAttribute("src", "src/white.png");
        cards[choiceTwo].setAttribute("src", "src/white.png");
        cardsWon.push(cardsChosen);
    }
    else{
        alert("The cards dont match! Try again.")
        cards[choiceOne].setAttribute("src", "src/blank.png");
        cards[choiceTwo].setAttribute("src", "src/blank.png");
    }

    cardsChosen = [];
    cardsChosenId = [];

    resultDisplay.textContent = cardsWon.length / 2 ;
    if(cardsWon.length === cardsArray.length){
        resultDisplay.textContent = "Game Complete!!";
    }
}


//flip the cards

function flip(){
    let cardId = this.getAttribute('data-id');
    cardsChosen.push(cardsArray[cardId].name);
    cardsChosenId.push(cardId);
    this.setAttribute("src", cardsArray[cardId].img);
    if(cardsChosen.length === 2){
        setTimeout(checkForMatch, 500);
    }
}

// })