/*----- constants -----*/
const PLAYERS = {
    '1': 'X',   // player 1
    '-1': 'O',  // player 2
    '0': ''     // blank space
};

/*----- app's state (variables) -----*/
var board, winner, turn, clicked;
var clickTracker = 0;

/*----- cached element references -----*/
const msgEl = document.getElementById('msg');
const p1HeadBoard = document.getElementById('p1hb');
const p2HeadBoard = document.getElementById('p2hb');

/*----- event listeners -----*/
document.getElementById("board").addEventListener('click', handleClick);
document.querySelector("button").addEventListener('click', btnClick);


/*----- functions -----*/

init();
// call init() once so that the render() has something to work with

function checkCol(colIdx, rowIdx) {
    let counter = 1;
    if ((rowIdx + counter < board[colIdx].length) && (board[colIdx][rowIdx + counter] === turn)) {
        console.log(`rowIdx+${counter} is true; checking c${colIdx}r${rowIdx + counter}`);
        counter++;
        if ((rowIdx + counter < board[colIdx].length) && (board[colIdx][rowIdx + counter] === turn)) {
            console.log(`rowIdx+${counter} is true; checking c${colIdx}r${rowIdx + counter}`);
            counter++;
        }
    }
    if ((rowIdx - counter >= 0) && (board[colIdx][rowIdx - counter] === turn)) {
        counter++;
        console.log(`rowIdx-${counter} is true; checking c${colIdx}r${rowIdx - counter}`);
        if ((rowIdx - counter >= 0) && (board[colIdx][rowIdx - counter] === turn)) {
            counter++;
            console.log(`rowIdx-${counter} is true; checking c${colIdx}r${rowIdx - counter}`);
        }
    }
    if (counter === 3) {
        console.log(`${PLAYERS[turn]} is the winner!`);
        return true;
    }
    return false;
}

// function checkRight(colIdx, rowIdx, counter){
//     if(counter === 3){
//         console.log(`${PLAYERS[turn]} is the winner!`);
//         return counter;
//     }
//     if ((colIdx + counter < board.length) && (board[colIdx + counter][rowIdx] === turn)) {
//         console.log(`colIdx+${counter} is true; checking c${colIdx+counter}r${rowIdx}`);
//         counter++;
//         checkRight(colIdx, rowIdx, counter);
//     }
//     return counter;
// }



function checkRow(colIdx, rowIdx) {
    let counter = 1;
    if ((colIdx + counter < board.length) && (board[colIdx + counter][rowIdx] === turn)) {
        console.log(`colIdx+${counter} is true; checking c${colIdx + counter}r${rowIdx}`);
        counter++;
        if ((colIdx + counter < board.length) && (board[colIdx + counter][rowIdx] === turn)) {
            console.log(`colIdx+${counter} is true; checking c${colIdx + counter}r${rowIdx}`);
            counter++;
        }
    }
    // checkRight(colIdx,rowIdx,counter);

    if ((colIdx - counter >= 0) && (board[colIdx - counter][rowIdx] === turn)) {
        counter++;
        console.log(`colIdx-${counter} is true; checking c${colIdx - counter}r${rowIdx}`);
        if ((colIdx - counter >= 0) && (board[colIdx - counter][rowIdx] === turn)) {
            counter++;
            console.log(`colIdx-${counter} is true; checking c${colIdx - counter}r${rowIdx}`);
        }
    }
    // checkLeft(colIdx,rowIdx,counter);

    if (counter === 3) {
        console.log(`${PLAYERS[turn]} is the winner!`);
        return true;
    }
    return false;
}

function checkFwdDiag(colIdx, rowIdx) { // checking for FwdDiag "/"
    let counter = 1;
    if ((colIdx + counter < board.length) && (rowIdx + counter < board[colIdx].length) && (board[colIdx + counter][rowIdx + counter] === turn)) {
        console.log(`colIdx+${counter} and rowIdx+${counter} are true; checking c${colIdx + counter}r${rowIdx + counter}`);
        counter++;
        if ((colIdx + counter < board.length) && (rowIdx + counter < board[colIdx].length) && (board[colIdx + counter][rowIdx + counter] === turn)) {
            console.log(`colIdx+${counter} and rowIdx+${counter} are true; checking c${colIdx + counter}r${rowIdx + counter}`);
            counter++;
        }
    }

    if ((colIdx - counter >= 0) && (rowIdx - counter >= 0) && (board[colIdx - counter][rowIdx - counter] === turn)) {
        console.log(`colIdx-${counter} and rowIdx-${counter} are true; checking c${colIdx - counter}r${rowIdx - counter}`);
        counter++;
        if ((colIdx - counter >= 0) && (rowIdx - counter >= 0) && (board[colIdx - counter][rowIdx - counter] === turn)) {
            console.log(`colIdx-${counter} and rowIdx-${counter} are true; checking c${colIdx - counter}r${rowIdx - counter}`);
            counter++;
        }
    }

    if (counter === 3) {
        console.log(`${PLAYERS[turn]} is the winner!`);
        return true;
    }
    return false;
}


function checkBckDiag(colIdx, rowIdx) { // checking for BckDiag "\"
    let counter = 1;
    if ((colIdx - counter >= 0) && (rowIdx + counter < board[colIdx].length) && (board[colIdx - counter][rowIdx + counter] === turn)) {
        console.log(`colIdx-${counter} and rowIdx+${counter} are true; checking c${colIdx - counter}r${rowIdx + counter}`);
        counter++;
        if ((colIdx - counter >= 0) && (rowIdx + counter < board[colIdx].length) && (board[colIdx - counter][rowIdx + counter] === turn)) {
            console.log(`colIdx-${counter} and rowIdx+${counter} are true; checking c${colIdx - counter}r${rowIdx + counter}`);
            counter++;
        }
    }

    if ((colIdx + counter < board.length) && (rowIdx - counter >= 0) && (board[colIdx + counter][rowIdx - counter] === turn)) {
        console.log(`colIdx+${counter} and rowIdx-${counter} are true; checking c${colIdx + counter}r${rowIdx - counter}`);
        counter++;
        if ((colIdx + counter < board.length) && (rowIdx - counter >= 0) && (board[colIdx + counter][rowIdx - counter] === turn)) {
            console.log(`colIdx+${counter} and rowIdx-${counter} are true; checking c${colIdx + counter}r${rowIdx - counter}`);
            counter++;
        }
    }

    if (counter === 3) {
        console.log(`${PLAYERS[turn]} is the winner!`);
        return true;
    }
    return false;

}



function btnClick() {
    init();
    // just simply call the init() function (which is the initial state of the game)
    // don't even have to worry about taking in any arguments
}

function handleClick(evt) {
    clickTracker++;
    console.log(`clickTracker: ${clickTracker}`);
    const slot = evt.target;
    const colIdx = parseInt(slot.id.charAt(1));
    // console.log(`colIdx: ${colIdx}`);
    const rowIdx = parseInt(slot.id.charAt(3));
    //ugly fucking code. hard coding is bad but you're too stupid to find a better working solution
    // console.log(`rowIdx: ${rowIdx}`);
    if (isNaN(colIdx)) return;
    // this is for catching clicks that go in between the divs; does nothing when clicked;
    if (!clicked[colIdx][rowIdx]) {
        board[colIdx][rowIdx] = turn;
        // recall that objects are a collection of KEY : VALUE pairs
        // by setting 'turn' to be the KEY, we can pass that in (using square brackets) to PLAYERS[]
        // and get the corresponding VALUE

        if (checkCol(colIdx, rowIdx)) {
            endGame();
            render();
            return;
        }
        if (checkRow(colIdx, rowIdx)) {
            endGame();
            render();
            return;
        }
        if (checkFwdDiag(colIdx, rowIdx)) {
            endGame();
            render();
            return;
        }
        if (checkBckDiag(colIdx, rowIdx)) {
            endGame();
            render();
            return;
        }
        // CHECK TIE IS BROKEN. FIX IT.
        if (checkTie()) {
            winner = 'T';
            render();
            return;
        }

        turn *= -1;
        // by multiplying 'turn' by -1 after every click, we are alternating each player's turn after
        // every click
    }
    clicked[colIdx][rowIdx] = true;
    // since we don't want players to be able to change a slot that's already taken, we change
    // the boolean at clicked[colIdx][rowIdx] to be true; there's an if statement above that
    // catches the cases when clicked === false;
    render();

}

// function declareWinner(){
//     winner = true;
//     msgEl.textContent = ``
// }

function endGame() {
    clicked.forEach(function (colArr, colIdx) {
        colArr.forEach(function (content, rowIdx) {
            // console.log(`content of clicked ${content} at c${colIdx}r${rowIdx}`);
            clicked[colIdx][rowIdx] = true;
        });
    });
    winner = true;
}

// CHECH TIE IS BROKEN. YOU. ARE. NOT. DONE.
function checkTie() {
    let localBool = null;
    board.forEach(function (colArr, colIdx) {
        if (colArr.includes(0)) {
            localBool = false;
        } else {
            localBool = true;
        }
    });
    return localBool;
}




function render() {
    // Display the board
    board.forEach(function (colArr, colIdx) {
        colArr.forEach(function (content, rowIdx) {
            // Access the correct div in the section
            const div = document.getElementById(`c${colIdx}r${rowIdx}`);
            // console.log(`cell: ${cell}, pos: c${colIdx}r${rowIdx}, COLOR: ${COLORS[cell]}`);
            div.textContent = PLAYERS[content];
            // in handleClick(), we SET the element at board[colIdx][rowIdx] to turn (which holds 
            // a KEY to a property in the PLAYERS object )
            // so in the line above, when we render the content of the div, we pass in that
            // KEY to PLAYERS[]; because of the square brackets, it'll return the appropriate value
        });
    });


    // Display Player's turn by highlighting:
    p1HeadBoard.textContent = `Player X's turn.`;
    p2HeadBoard.textContent = `Player O's turn.`;
    // refactor this later to dynamically reflect who's turn it is (also have it be able to draw from PLAYERS)
    // so that if PLAYER 1 wants to use @'s instead of X's, it'll render properly
    p1HeadBoard.style.color = (turn===1) ? 'red' : 'black';
    p2HeadBoard.style.color = (turn===-1) ? 'red' : 'black';

    // Display message
    if (winner) {
        msgEl.textContent = `${PLAYERS[turn].toUpperCase()} WINS!!!`;
        if (winner === 'T') {
            msgEl.textContent = "It's a Tie!";
            //  YOU'RE NOT FUCKING DONE. SOMETHING IS WRONG WITH TIE. FIX IT
        } else {
            console.log(`${PLAYERS[turn].toUpperCase()} wins!`);
        }
    }
}

function init() {
    board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
    winner = null;
    turn = 1;
    clicked = [
        [false, false, false],
        [false, false, false],
        [false, false, false]
    ]
    // ugly ass code again. when refactoring, look to combine board[] and clicked[] into one object
    render();
}