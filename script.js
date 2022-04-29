
let board = document.getElementById('bored')
let playerOne = document.getElementById('playerOne')
let playerTwo = document.getElementById('playerTwo')

// let game = ['blank', 'blank', 'blank', 'blank', 'blank', 'blank','blank', 'blank', 'blank']
let game = ["", "", "", "", "", "", "", "", ""];
let turnCounter = 0;
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

function checkWin() {
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
  }
  
    // if(game[0] === 'X' && game[1] === 'X' && game[2] === 'X' ||
    //    game[3] === 'X' && game[4] === 'X' && game[5] === 'X' ||
    //    game[6] === 'X' && game[7] === 'X' && game[8] === 'X' ||
    //    game[0] === 'X' && game[3] === 'X' && game[6] === 'X' ||
    //    game[1] === 'X' && game[4] === 'X' && game[7] === 'X' ||
    //    game[2] === 'X' && game[5] === 'X' && game[8] === 'X' ||
    //    game[0] === 'X' && game[4] === 'X' && game[8] === 'X' ||
    //    game[2] === 'X' && game[4] === 'X' && game[6] === 'X' 
    // ) {
    //     console.log('Player One wins')
    // }
}


board.addEventListener('click', e => {
     turnCounter++;
    let addClass = document.getElementById(`${e.target.id}`)
console.log(Number(e.target.id))


    if(playerOne.classList.contains('activePlayer')){
        if(addClass.classList.contains('used')){
            console.log('Block has already been chosen, please choose another')
        } else {
            addClass.classList.add('clickX')
            addClass.classList.add('used')
            playerOne.classList.remove('activePlayer')
            playerTwo.classList.add('activePlayer')
            game[e.target.id] = 'X'
            checkWin()
        }
    } else if(playerTwo.classList.contains('activePlayer')){
        if(addClass.classList.contains('used')){
            console.log('Block has already been chosen, please choose another')
        } else {
            addClass.classList.add('clickO')
            addClass.classList.add('used')
            playerTwo.classList.remove('activePlayer')
            playerOne.classList.add('activePlayer')
            game[e.target.id] = 'O'
            checkWin()
        }
    }

    console.log(game)
})