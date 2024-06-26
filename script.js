const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");


let currentPlayer;
let GameGrid;


const winningPosition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function initGame() {
    currentPlayer = "X";
    GameGrid = ["", "", "", "", "", "", "", "", ""];
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList=`box box${index+1}`;
    })
    
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
    
}
initGame();

function swapTurn() {
    if (currentPlayer === "X") {
        currentPlayer = "0";
    }
    else {
        currentPlayer = "X";
    }
    gameInfo.innerText = `Current player -${currentPlayer}`;
}

function checkGameOver() {
    let answer = "";
    winningPosition.forEach((position) => {
        if ((GameGrid[position[0]] !== "" || GameGrid[position[1]] !== "" || GameGrid[position[2]] !== "")
            && (GameGrid[position[0]] === GameGrid[position[1]] && GameGrid[position[1]] === GameGrid[position[2]])) {

            if (GameGrid[position[0]] === "X")
                answer = "X";
            else
                answer = "0";

            boxes.forEach((box) => {
                box.style.pointerEvents = "none"
            })

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    if (answer !== "") {
        gameInfo.innerText = `Winner player -${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    let fillCount=0;
    GameGrid.forEach((box)=>{
        if(box!=="")
            fillCount++;
    });

    if(fillCount===9){
        gameInfo.innerText="Game Tied !";
        newGameBtn.classList.add("active");
    }
    // newGameBtn.classList.add("active");
}

function handleClick(index) {
    if (GameGrid[index] === "") {
        boxes[index].innerText = currentPlayer;
        GameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        swapTurn();
        checkGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
})

newGameBtn.addEventListener("click", initGame)