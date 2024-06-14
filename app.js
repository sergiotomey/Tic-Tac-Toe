let container = document.querySelector(".container");
let turnIndicator = document.querySelector('.turn-indicator')
let containerGrid = document.createElement("div");
let player1Input = document.querySelector(".player1-name");
let player2Input = document.querySelector(".player2-name");
let startButton = document.querySelector(".start-button");
let insertCoin = document.querySelector('.insert-coin')
let playerNamesDiv = document.querySelector('.player-names-div')
let newGameBoard;
let gameWon = false
let turns = 0;
containerGrid.classList.add("grid");

/*===================Factory Functions===================*/

function playerFactory(name) {
    const player = {
        name,
        gameAvatar: "",
        playerArray: [],
        recordMove: function (index) {
            this.playerArray.push(index)
        },
    };
    return player;
}

function gameBoard(array) {
    const gameBoard = {
        array,
    };
    return gameBoard;
}

/*========================Main Game Code==================================*/

function startGame() {
    playerNamesDiv.style.display = 'none'
    document.getElementsByClassName('start-button')[0].style.display = 'none'

    if (container.contains(containerGrid)) {
        return;
    }
    let gameBoardArray = [];

    let player1 = playerFactory(player1Input.value);
    if (player1Input.value.length === 0) {
        player1.name = 'Player 1'
    }
    player1.gameAvatar = "X";

    let player2 = playerFactory(player2Input.value);
    if (player2Input.value.length === 0) {
        player2.name = 'Player 2'
    }
    player2.gameAvatar = "O";

    /*=======================Grid Making Code======================*/

    for (let i = 0; i < 9; i++) {
        let gridSquares = document.createElement("div");
        gridSquares.classList.add("grid-squares");
        gameBoardArray.push(gridSquares);
        containerGrid.appendChild(gridSquares);
        container.append(containerGrid);
    }
    newGameBoard = gameBoard(gameBoardArray);

    /*================== Writing X and O on board, recording moves in player arrays and updating turn count ====================*/

    turnIndicator.textContent = `Its ${player1.name}'s turn`;

    newGameBoard.array.forEach((gridSquares, index) => {
        gridSquares.addEventListener("click", () => {

            if (gameWon || gridSquares.textContent != 0) {
                return;

            } else if (turns === 0 || turns % 2 === 0) {
                gridSquares.textContent = player1.gameAvatar;
                player1.recordMove(index)
                let gameWinner = findingWinner(player1.playerArray)
                if (gameWinner) {
                    gameWon = true
                    turnIndicator.textContent= `${player1.name} Wins!`
                } else {
                    turnIndicator.textContent = `Its ${player2.name}'s turn`;
                    turns++;
                }

            } else {
                gridSquares.textContent = player2.gameAvatar;
                player2.recordMove(index)
                let gameWinner = findingWinner(player2.playerArray)
                if (gameWinner) {
                    gameWon = true
                    turnIndicator.textContent= `${player2.name} Wins!`
                } else {
                    turnIndicator.textContent = `Its ${player1.name}'s turn`;
                    turns++;
                }
            }

            if (turns === 9 && !gameWon) {
                turnIndicator.textContent = 'Its a Draw!'
            }
        });
    });
}


/*================function for deciding the victor=================*/

let GameWinningArray = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],];

function findingWinner(playerArray) {
    for (let i = 0; i < GameWinningArray.length; i++) {
        const winningCombination = GameWinningArray[i]
        const isWinner = winningCombination.every(index => playerArray.includes(index));
        if (isWinner) {
            return true
        }
    }
    return false
}


/*================Event listeners (start game)===========================*/

insertCoin.addEventListener('click', () => {
    playerNamesDiv.style.display = 'flex'
    document.getElementsByClassName('start-button')[0].style.display = 'block'
    insertCoin.style.display = 'none'
})
startButton.addEventListener('click', startGame);
