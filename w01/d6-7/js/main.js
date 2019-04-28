/*----- constants -----*/
const COLORS = {
    '1': 'lime',
    '-1': 'purple',
    '0': 'white'
};

/*----- app's state (variables) -----*/
var board, winner, turn;
var tracker = 0; // delete this alongside tracker++ in handleClick(); should be right above render();

/*----- cached element references -----*/
const msgEl = document.getElementById('msg');

/*----- event listeners -----*/
document.getElementById('col-markers').addEventListener('click', handleClick);
// we added markers (the grey triangles) that will listen for clicks from the user
// note that we added the listener to the PARENT element (that is, div #col-markers, which
// holds/contains the div#0-6 elements); example of event delegation

/*----- functions -----*/

init();

function handleClick(evt) {
    const marker = evt.target;
    // .target is a reference to the object that dispatched the event; in this case, we are referencing the
    // marker (which is why we're naming the variable the same)
    const colIdx = parseInt(marker.id.replace("col", ""));
    // marker.id will return a string object, which is why we can then call on the string method .replace()
    if (isNaN(colIdx)) return;
    // line above is for catching the cases if the user clicks on the space between markers; does nothing 
    // if clicked; this might be affected by the grid-gap property in #col-markers{} in the CSS file
    const rowIdx = board[colIdx].indexOf(0);
    if (rowIdx === -1) return;
    // line above makes it so that handleClick() does nothing (via return) if the column is filled
    board[colIdx][rowIdx] = turn;
    // console.log(`value of winner in handleclick() ${winner}`);

    tracker++;
    console.log(`click tracker: ${tracker}. you just inserted ${COLORS[turn]} into c${colIdx}r${rowIdx}`);

    winner = getWinner(colIdx, rowIdx);
    turn *= -1; // after every click, the turn is switched to the other player
    render();   // want to render the board every time after we update the app state
    // note that handleClick() doesn't do anything except update the game logic; returns nothing

}

function getWinner(colIdx, rowIdx) {
    // the colIdx and rowIdx that are being passed in represent the position of the newly added chip
    let winner = null;
    // for (let colIdx = 0; colIdx < board.length; colIdx++) {
    //     // iterate over each COLUMN
    //     winner = checkCol(colIdx, 0, 0);
    //     // hard coded checkCol to be initialized with 0 for rowIdx and counter; no reason not to
    //     // otherwise you'd be arbitrarily starting at some other row, which wouldn't make sense
    //     console.log(`winner value in getWinner(): ${winner}`);
    //     if (winner) break;
    //     for (let rowIdx = 0; rowIdx < board[colIdx].length; rowIdx++) {
    //         // console.log("you even in here?");
    //         winner = checkRow(rowIdx, 0, 0);
    //         if (winner) break;
    //     }
    // }
    winner = checkCol(colIdx, rowIdx, 0);
    winner = checkRow(rowIdx, colIdx, 0);
    // console.log(`value of winner in getWinner(): ${winner}`);
    return winner;
}



function checkCol(colIdx, rowIdx, counter) {
    // console.log("you in checkCol");
    let localBoo = false;
    console.log(`   you're in your ${counter}-th iteration of checkCol`);
    if (counter === 3) {
        console.log(`counter: ${counter}; ${COLORS[turn]} wins!`);
        localBoo = true;
        return localBoo;
    } else {
        console.log(`       value of rowIdx-1: ${rowIdx - 1}`);
        if ((rowIdx - 1) >= 0) {
            if (board[colIdx][rowIdx - 1] === turn) {
                // TERN this (heh) into a ternary expression, where everything that's currently in the {} 
                // can go in an anonymous function; so something like: (rowIdx+1 < board[colIdx].length) ? function{} : false;
                counter++;
                console.log("       recursion success!");
                checkCol(colIdx, rowIdx - 1, counter);
            }
            // console.log(`           there are no more ${COLORS[turn].toUpperCase()} chips below (c${colIdx}r${rowIdx - counter})`);
            // because of recursion, once an iteration fails, we spit back up to this line
        }
        // console.log(`           you failed to enter the ${counter + 1}-th recursive iteration in checkCol`);
    }

    console.log(`localBoo: ${localBoo}`);
    return localBoo;
}

function checkRow(rowIdx, colIdx, counter) {
    /**
     * row is gonna be a little tricker than checkCol. we have to recursively search to the left and right
     */
    // console.log("you in checkRow");
    console.log(`   you're in your ${counter}-th iteration of checkRow`);
    if (counter === 3) {
        console.log(`counter: ${counter}; ${COLORS[turn]} wins!`);
        return true;
    } else {
        if ((colIdx - 1) >= 0) {
            if (board[colIdx - 1][rowIdx] === turn) {
                counter++;
                console.log(`           you're in your ${counter}-th iteration of checkCol`);
                checkCol(colIdx - 1, rowIdx, counter);
            }
            console.log("       you failed to meet the conditions for the next recursive iteration in checkRow (colIdx-1 >=0)");
        } else {
            // ((colIdx + 1) < board.length)
            if (board[colIdx + 1][rowIdx] === turn) {
                counter++;
                console.log(`           you're in your ${counter}-th iteration of checkCol`);
                checkCol(colIdx + 1, rowIdx, counter);
            }
            console.log("       you failed to meet the conditions for the next recursive iteration in checkRow (colIdx+1 <board.length)");
        }
    }
    return false;
}

function render() {
    // Display the board
    board.forEach(function (colArr, colIdx) {
        // update col markers
        const marker = document.getElementById(`col${colIdx}`);
        marker.style.borderTopColor = colArr.includes(0) ? 'grey' : 'white';
        // the line above makes it so that if the col directly below (col[0]) is EMPTY, then set (or rather, let)
        // the color of the marker be grey. otherwise, that means there IS a tile in that slot, so set the marker white
        colArr.forEach(function (cell, rowIdx) {
            // Access the correct div in the section
            const div = document.getElementById(`c${colIdx}r${rowIdx}`);
            // console.log(`cell: ${cell}, pos: c${colIdx}r${rowIdx}, COLOR: ${COLORS[cell]}`);
            div.style.backgroundColor = COLORS[cell];
        });
    });


    // Display message
    if (winner) {
        console.log("you in side if(winner); means var winner should be true");
        if (winner === 'T') {
            msgEl.textContent = "It's a Tie!";
        } else {
            console.log(`${COLORS[turn].toUpperCase()} wins!`);
        }
    } else {
        msgEl.textContent = `${COLORS[turn].toUpperCase()}'s Turn`;
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
    render();
}