// Made by: EzekelRAGE#8335, nykoretta#0305, solid_wake#7464, freezi#9414

let board = document.getElementById('board');
let playerOne = document.getElementById('playerOne').classList;
let playerTwo = document.getElementById('playerTwo').classList;
let resetBtn = document.getElementById('reset');
let overLayText = document.getElementById('text');
let game = new Array(9).fill('');
let clickCount = 0;

let playerObj = {
    activePlayerToggle() {
        // this changes the active player
        playerOne.toggle('activePlayer');
        playerTwo.toggle('activePlayer');
    },
    playerXMark(addClass, id) {
        //Behavior for when Player X is active player
        addClass.classList.add('clickX');
        addClass.classList.add('used');
        document.getElementById(id).textContent = 'X';
        game[id] = 'X';
        clickCount++;
    },
    playerOMark(addClass, id) {
        // Behavior for when Player O is active player
        addClass.classList.add('clickO');
        addClass.classList.add('used');
        document.getElementById(id).textContent = 'O';
        game[id] = 'O';
        clickCount++;
    },
};

let gameObj = {
    winningConditions: [
        // array used in function to decide if there is a winnner
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ],
    placeMark(addClass, id) {
        // Decides which player is active and behaves accordingly
        if (addClass.classList.contains('used')) {
            // lets user know they are trying to click in an already marked box
            alert('Block has already been chosen, please choose another');
        } else if (playerOne.contains('activePlayer')) {
            // Checks active player and acts accordingly
            playerObj.playerXMark(addClass, id);
            playerObj.activePlayerToggle();
            this.gameState();
        } else {
            playerObj.playerOMark(addClass, id);
            playerObj.activePlayerToggle();
            this.gameState();
        }
    },
    gameState() {
        //checks if there is a winner after each player mark
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = this.winningConditions[i];
            let a = game[winCondition[0]];
            let b = game[winCondition[1]];
            let c = game[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                // player wins
                roundWon = true;
                playerObj.activePlayerToggle(); //OCD just keeping the winner as the active player
                let winArr = this.winningConditions[i];
                winArr.forEach(
                    (x, z) =>
                        (document.getElementById(winArr[z]).style.background =
                            'red')
                ); // changes background of winning cells to red
                overLayText.innerText = `Player ${a} wins! Hit reset to play again!`; // displays winner msg on an overlay
                board.classList.add('inactive');
                this.on(); // makes overlay visible
                window.speechSynthesis.speak(
                    new SpeechSynthesisUtterance(
                        `Winner winner chicken dinner. Player ${a} wins! Hit reset to play again!`
                    )
                );
                break;
            }
        }
        if (roundWon) {
            board.removeEventListener('click', gameObj.gameBehavior);
            return;
        }

        let roundDraw = !game.includes('');
        if (roundDraw) {
            //behavior for when there is a tie
            board.classList.add('inactive');
            overLayText.textContent = `Game is tied! Hit reset to play again!`;
            board.removeEventListener('click', gameObj.gameBehavior);
            this.on();
            window.speechSynthesis.speak(
                new SpeechSynthesisUtterance(
                    `Game is tied! Hit reset to play again!`
                )
            );
        }
    },
    //resets the gamestate
    resetGame() {
        for (let i = 0; i < 9; i++) {
            document.getElementById('overlay').style.display = 'none';
            document.getElementById(i).innerText = '';
            document.getElementById(i).classList.remove('used');
            document.getElementById(i).classList.remove('clickX');
            document.getElementById(i).classList.remove('clickO');
            board.classList.remove('inactive');
            playerTwo.remove('activePlayer');
            playerOne.add('activePlayer');
            document.getElementById(i).style.background = 'transparent';
            game[i] = '';
            board.addEventListener('click', gameObj.gameBehavior);
            clickCount = 0;
        }
        playerOne.contains('activePlayer')
            ? null
            : playerObj.activePlayerToggle(); // makes PlayerX the active player
    },
    gameBehavior(e) {
        if (e.target.classList.contains('boardPiece')) {
            //checks to make sure clicked target is a box and not empty space
            let addClass = document.getElementById(`${e.target.id}`); // grabs id of the clicked box
            gameObj.placeMark(addClass, e.target.id); // uses clicked box id to run function allowing player to mark
        }
    },
    on() {
        // turns winning overlay on
        document.getElementById('overlay').style.display = 'block';
    },
};

board.addEventListener('click', gameObj.gameBehavior);
resetBtn.addEventListener('click', gameObj.resetGame);
