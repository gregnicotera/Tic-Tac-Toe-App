let board = document.getElementById('bored')
let playerOne = document.getElementById('playerOne')
let playerTwo = document.getElementById('playerTwo')
let resetBtn = document.getElementById('reset')
let turnCounter = 0
let game = ['', '', '', '', '', '','', '', '']

let gameObj = {
    // puts mark from active player onto the gameboard, after it mark runs gamestate and changes active player if game isnt over
    placeMark(addClass, id) {
    turnCounter++ // variable used to keep track of round count in case that feature is implement
    if(addClass.classList.contains('used')){
        alert('Block has already been chosen, please choose another')
    } else if(playerOne.classList.contains('activePlayer')) {
        addClass.classList.add('clickX')
        addClass.classList.add('used')
        this.activePlayerToggle()
        document.getElementById(id).textContent = 'X'
        game[id] = 'X'
        this.gameState()    
    } else {
        addClass.classList.add('clickO')
        addClass.classList.add('used')
        this.activePlayerToggle()
        document.getElementById(id).textContent = 'O'
        game[id] = 'O'
        this.gameState()
    }
},
    
    gameState() {
        //checks if there is a winner after each player mark
        let roundWon = false;
        let stopTie = 0
       for(let i = 0; i <= 7; i++){
         const winCondition = winningConditions[i];
         let a = game[winCondition[0]];
         let b = game[winCondition[1]];
         let c = game[winCondition[2]];
         if (a === '' || b === '' || c === '') {
                 continue;
         }
          if(a === b && b === c) {
                 roundWon = true;
                 console.log(`Player ${a} wins!`)
                 stopTie++
                 console.log(stopTie)
                 break
         } 
    }  roundWon && stopTie < 1 ? console.log('Game Tied') : null // tells user game is tied
},
    
    resetGame() {
        for(let i = 0; i < 9; i++) {
            document.getElementById(i).textContent = "" // removes marks from boxes
            document.getElementById(i).classList.remove('used') //removes used class so you can mark box again
            game[i] = "" // resets array used for CheckWin
            turnCounter = 0 // resets turnCounters            
        }
        playerOne.classList.contains('activePlayer') ? null : 
        playerOne.classList.toggle('activePlayer'), playerTwo.classList.remove('activePlayer')


    },
    activePlayerToggle() {
        playerOne.classList.toggle('activePlayer')
        playerTwo.classList.toggle('activePlayer')
    }
}


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


board.addEventListener('click', e => {
    if(e.target.classList.contains('boxes')) { //checks to make sure clicked target is a box and not empty space
    let addClass = document.getElementById(`${e.target.id}`)
    gameObj.placeMark(addClass, e.target.id)
    }
    
})
resetBtn.addEventListener("click", gameObj.resetGame)
