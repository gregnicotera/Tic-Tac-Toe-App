let board = document.getElementById('bored')
let playerOne = document.getElementById('playerOne')
let playerTwo = document.getElementById('playerTwo')
let resetBtn = document.getElementById('reset')
playerTwo.classList.remove('activePlayer')
playerOne.classList.add('activePlayer')
let turnCounter = 0

let game = ['', '', '', '', '', '','', '', '']
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
// function used to check if there is a winner or if game is tied
function gameState() {
   let roundWon = false;
  for(let i = 0; i <= 7; i++){
    const winCondition = winningConditions[i];
    let a = game[winCondition[0]];
    let b = game[winCondition[1]];
    let c = game[winCondition[2]];
    if (a === '' || b === '' || c === '') {
            continue;
    }
     if (a === b && b === c) {
            roundWon = true;
            console.log(`Player ${a} wins!`)
            break
    }
    
    if(turnCounter == 9){
      console.log('Game Tied!')
    }
}}

// Reset Game
function resetGame() {
    for(let i = 0; i < 9; i++) {
        document.getElementById(i).textContent = "" // removes marks from boxes
        document.getElementById(i).classList.remove('used') //removes used class so you can mark box again
        game[i] = "" // resets array used for CheckWin
        turnCounter = 0 // resets turnCounters
    }
}

// function used to check if there is a winner or if game is tied

// function checkWin() {
//     if(game[0] === 'X' && game[1] === 'X' && game[2] === 'X' ||
//        game[3] === 'X' && game[4] === 'X' && game[5] === 'X' ||
//        game[6] === 'X' && game[7] === 'X' && game[8] === 'X' ||
//        game[0] === 'X' && game[3] === 'X' && game[6] === 'X' ||
//        game[1] === 'X' && game[4] === 'X' && game[7] === 'X' ||
//        game[2] === 'X' && game[5] === 'X' && game[8] === 'X' ||
//        game[0] === 'X' && game[4] === 'X' && game[8] === 'X' ||
//        game[2] === 'X' && game[4] === 'X' && game[6] === 'X' 
//     ) {
//         alert('Player X wins! Click New Game to play again!')
//         board.removeEventListener('click', e => {})
//     } else if (game[0] === 'O' && game[1] === 'O' && game[2] === 'O' ||
//     game[3] === 'O' && game[4] === 'O' && game[5] === 'O' ||
//     game[6] === 'O' && game[7] === 'O' && game[8] === 'O' ||
//     game[0] === 'O' && game[3] === 'O' && game[6] === 'O' ||
//     game[1] === 'O' && game[4] === 'O' && game[7] === 'O' ||
//     game[2] === 'O' && game[5] === 'O' && game[8] === 'O' ||
//     game[0] === 'O' && game[4] === 'O' && game[8] === 'O' ||
//     game[2] === 'O' && game[4] === 'O' && game[6] === 'O' ) {
//         alert('Player O wins! Click New Game to play again!')
//         board.removeEventListener('click', e => {})
//     } else if(turnCounter == 9){
//                 alert('Game Tied! Click New Game to play again!')
//                 board.removeEventListener('click', e => {})
//               }
// }

// puts mark from active player onto the gameboard
function placeMark(addClass, id) {
    turnCounter++
    if(playerOne.classList.contains('activePlayer')){
        if(addClass.classList.contains('used')){
            alert('Block has already been chosen, please choose another')
        } else {
            addClass.classList.add('clickX')
            addClass.classList.add('used')
            playerOne.classList.remove('activePlayer')
            playerTwo.classList.add('activePlayer')
            document.getElementById(id).textContent = 'X'
            game[id] = 'X'
            gameState()
        }
    } else if(playerTwo.classList.contains('activePlayer')){
        if(addClass.classList.contains('used')){
            alert('Block has already been chosen, please choose another')
        } else {
            addClass.classList.add('clickO')
            addClass.classList.add('used')
            playerTwo.classList.remove('activePlayer')
            playerOne.classList.add('activePlayer')
            document.getElementById(id).textContent = 'O'
            game[id] = 'O'
            gameState()
        }
    }

}

board.addEventListener('click', e => {
    if(e.target.classList.contains('boxes')) { //checks to make sure clicked target is a box and not empty space
    let addClass = document.getElementById(`${e.target.id}`)
    placeMark(addClass, e.target.id)
    }
    
})
resetBtn.addEventListener("click", resetGame)