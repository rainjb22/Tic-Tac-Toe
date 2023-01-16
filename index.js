
// created variables to access the html elements
const cells = document.querySelectorAll(".cell");
const gameStatus = document.querySelector("#gameStatus");
const restart = document.querySelector("#restart");

/* created an array of arrays to define the possible winning combinations.
Each inner array contains 3 numbers and represents a winning combination if occupied by the same player */

const howToWin = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// created an array with empty strings. It represents the cells in the game board. Its values are updated as the players make their moves.

let holder = ["", "", "", "", "", "", "", "", ""];  

let currentPlayer = "X"; 
let running = false;

gameStart();

/* 1st line = added an event listener so that when a cell is clicked, the clickCell function will be called. forEach method will go through each element of the cells array which contain cell */
// 2nd line = added an event listener to restart button to call the restartGame() function when clicked. 
// 3rd line = I used the textContent property to set the text on the gameStatus id. 

function gameStart () {
    cells.forEach(cell => cell.addEventListener("click", clickCell)); 
    restart.addEventListener("click", restartGame);
    gameStatus.textContent = `${currentPlayer}, kaw na`;
    running = true;
}

function clickCell() {
    const cellNum = this.getAttribute("cellNum");

    if(holder[cellNum] !="" || !running){
        return;
    }
    
    updateCell(this, cellNum);
    whoWins();
}

function updateCell(cell, index) {
    holder[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function playerChange() {
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    gameStatus.textContent = `${currentPlayer}, kaw na`;
}

function whoWins() {
    let winGame = false;

    for(let i = 0; i < howToWin.length; i++) {
        const toWin = howToWin[i];
        const cell1 = holder[toWin [0]];
        const cell2 = holder[toWin [1]]; 
        const cell3 = holder[toWin [2]];  

        if(cell1 == "" || cell2 == "" || cell3 == "") {
            continue;
        }
        if(cell1 == cell2 && cell2 == cell3) {
            winGame = true;
            break;
        }
    }

    if (winGame){
        gameStatus.textContent = `Panalo si ${currentPlayer}!`;
        running = false;
    }
    else if(!holder.includes("")){
        gameStatus.textContent = 'Haha walang nanalo!';
        running = false;
    }
    else {
        playerChange();
    }
}

function restartGame(){
    currentPlayer = "X";
    holder = ["", "", "", "", "", "", "", "", ""];
    gameStatus.textContent = `${currentPlayer}, kaw na`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}

