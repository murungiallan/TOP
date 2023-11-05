// create variables to reference the necessary DOM nodes
const body = document.querySelector('body');
const container = document.querySelector('#container');
const colorBtn = document.querySelector('.color-btn');
const rgbBtn = document.querySelector('.rgb-btn');
const eraseBtn = document.querySelector('.erase-btn');
const resetBtn = document.querySelector('.reset-btn');
const clearBtn = document.querySelector('.clear-btn');

const defaultNumber = 16;
createGrid(defaultNumber);
activateButtons();

// set event listeners to the buttons
function activateButtons() {
    colorBtn.addEventListener('click', () => { hoverDefaultColor(); })
    rgbBtn.addEventListener('click', () => { hoverRandomColor(); })
    eraseBtn.addEventListener('click', () => { erase(); })
    resetBtn.addEventListener('click', () => { reset(); })
    clearBtn.addEventListener('click', () => { clear(); })
}

function createGrid(number) {
    // create a specified number of rows
    for (let r = 1; r <= number; r++) {
        const gridRow = document.createElement('div');
        gridRow.className = 'row';
        container.appendChild(gridRow);

        // create a number of cells in each row
        for (let c = 1; c <= number; c++) {
            const gridCell = document.createElement('div');
            gridCell.className = 'cell';
            gridRow.appendChild(gridCell);
        }
    }
}

// Create a hover effect that changes the color of a grid cell to black when the mouse passes over it
function hoverDefaultColor() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(
        cell => cell.addEventListener('mouseover', () => {
            cell.style.backgroundColor = 'black';
        })
    )
}

// Create a hover effect that changes the color of a grid cell to a random color when the mouse passes over it
function hoverRandomColor() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(
        cell => cell.addEventListener('mouseover', () => {
            cell.style.backgroundColor = randomColor();
        })
    )
}

// create a function that generates random letters to form a random color
function randomColor(){
    let color = '#';
    for (let i = 0; i < 6; i++){
        color += Math.floor(Math.random() * 16).toString(16);
    }
    return color;
}

// erase the hover effect
function erase(){
    const cells = document.querySelectorAll('.cell');
    cells.forEach(
        cell => cell.addEventListener('mouseover', () => {
            cell.style.backgroundColor = 'white';
        })
    )
}

// reset the grid to a new size
function reset() {
    const cell = document.querySelector('.cell');
    let newSize = prompt('Enter a new size for the grid');
    if (newSize > 100 || newSize < 1) {
        alert('Please enter a number between 1 and 100');
    } else {
        (newSize > 30) ? cell.style.cssText = 'width: 18px; height: 18px;' 
            : (newSize > 50) ? cell.style.cssText = 'width: 8px; height: 8px;' 
            : cell.style.cssText = 'width: 27px; height: 27px;';
        removeGrid();
        createGrid(newSize);
        hoverDefaultColor();
    }
}

// clear the grid
function clear(){
    const cells = document.querySelectorAll('.cell');
    cells.forEach(
        cell => cell.style.backgroundColor = 'white'
    )
}

// remove grid after reset
function removeGrid() {
    const rows = document.querySelectorAll('.row');
    rows.forEach(
        row => row.remove()
    )
}