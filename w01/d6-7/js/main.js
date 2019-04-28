/*----- constants -----*/
const COLORS = {
    '1': 'X',
    '-1': 'O',
    '0': ''
};

/*----- app's state (variables) -----*/
var board, winner, turn;
var tracker = 0; // delete this alongside tracker++ in handleClick(); should be right above render();

/*----- cached element references -----*/
const msgEl = document.getElementById('msg');

/*----- event listeners -----*/
document.getElementById("board").addEventListener('click', handleClick);


/*----- functions -----*/

init();

function handleClick(evt) {
    const slot = evt.target;
    const colIdx = parseInt(slot.id.charAt(1));
    console.log(`colIdx: ${colIdx}`);
    const rowIdx = parseInt(slot.id.charAt(3)); 
    //ugly fucking code. hard coding is bad but you're too stupid to find a better working solution
    console.log(`rowIdx: ${rowIdx}`);
    board[colIdx][rowIdx] = turn;
 
    turn *= -1;
    render();

}




function render() {
    // Display the board
    board.forEach(function (colArr, colIdx) {
        colArr.forEach(function (cell, rowIdx) {
            // Access the correct div in the section
            const div = document.getElementById(`c${colIdx}r${rowIdx}`);
            // console.log(`cell: ${cell}, pos: c${colIdx}r${rowIdx}, COLOR: ${COLORS[cell]}`);
            div.textContent = COLORS[cell];
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