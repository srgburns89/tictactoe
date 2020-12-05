const classNames = {
    cell: 'cell',
    cellContent: 'cell-content',
    populated: 'populated',

    
};

const user = {
    x: 'X',
    o: 'O'
};


const winningMatrix = {
    0: [[1,2],[3,6],[4,8]],
    1: [[0,2],[4,7]],
    2: [[0,1],[5,8],[4,6]],
    3: [[0,6],[4,5]],
    4: [[3,5],[1,7],[0,8]],
    5: [[3,4],[2,8]],
    6: [[7,8],[0,3],[2,4]],
    7: [[6,8],[1,4]],
    8: [[6,7],[2,5],[0,4]]
};

const winningCombos = 
[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
    ];



let cellValue = ['', '', '','', '', '','', '', ''];
let xIsNext = true;
let winningUser; 
let numberOfTurnsLeft =9; 
let draw = true;
let playerone = $('.player1')

const cells = document.querySelectorAll(`.${classNames.cell}`);
const modalOverlay = document.querySelector('.modal-overlay');
const winnerDetails = document.querySelector('.winner-container > span');
const newGameButton = document.querySelector('.new-game-button');


function calculateWinner(chosenIndex) {
    const winningRanges = winningMatrix[chosenIndex];

    for(let i=0; i < winningRanges.length; i++){
        const currentEntry = cellValue[chosenIndex];
        const firstOption = cellValue[winningRanges[i][0]];
        const secondOption = cellValue[winningRanges[i][1]];

        if(currentEntry === firstOption && firstOption === secondOption) {
            winningUser = currentEntry;
            winningCombo = [chosenIndex, winningRanges[i][0], winningRanges[i][1]];
            return true;
        }
    }

    if (numberOfTurnsLeft === 0) {
        winningUser = draw;
        winningCombo = [];
        return true;
    }
    return false;
};



function showModal () {
    if (winningUser === draw) {
        winnerDetails.innerHTML = "DRAW";
    } else {
    winnerDetails.innerHTML = `${winningUser} WINS!                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  `;

    }
    modalOverlay.style.display = 'flex';

};

function restartGame() {
    cellValue = ['', '', '','', '', '','', '', ''];
xIsNext = true;
winningUser = undefined; 
numberOfTurnsLeft =9; 
draw = true;

cells.forEach((c,i) => {
    const cellContent= c.querySelector(`.${classNames.cellContent}`);
    cellContent.innerHTML = cellValue[i];
    cellContent.classList.remove(classNames.populated);
    c.classList.remove(classNames.winner);
});  

modalOverlay.style.display = 'none';

}

newGameButton.addEventListener('click', () => {
    restartGame();
});




cells.forEach((c, i) => {
    c.addEventListener('click', () => {
        if (!cellValue[i]) {
            cellValue[i] = xIsNext ? user.x : user.o;
            xIsNext = !xIsNext;
            numberOfTurnsLeft--; 
            

            if(calculateWinner(i)) {
                showModal();
            }
    
            const cellContent = c.querySelector(`.${classNames.cellContent}`);
            cellContent.innerHTML = cellValue[i];
            cellContent.classList.add(classNames.populated)

        }
      
    })
}
);



