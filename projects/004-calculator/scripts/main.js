// Create button variables
const numbers = document.querySelectorAll('.numbers');
const operators = document.querySelectorAll('.operators');
const clear = document.querySelector('.clear');
const backspace = document.querySelector('.backspace');
const equals = document.querySelector('.equals');
const decimal = document.querySelector('.decimal');
const displayDiv = document.querySelector('.display');

// display & calculation variables
let displayValue = '';
let firstNumber = null;
let secondNumber = null;
let operatorValue = null;
let currentValue = null;
let decimalValue = null;

equals.addEventListener('click', evaluate);
clear.addEventListener('click', clearScreen);
backspace.addEventListener('click', deleteNumber);
decimal.addEventListener('click', addDecimal);

// Numbers
numbers.forEach((button) => { 
    button.addEventListener('click', () => {
        currentValue = button.textContent;
        displayValue += currentValue;
        displayDiv.textContent = displayValue;
    });
});

// Operators
operators.forEach((operator) => {
    operator.addEventListener('click', () => {
        firstNumber = parseFloat(displayValue);
        displayValue = `${firstNumber} ${operator.textContent} `;
        displayDiv.textContent = displayValue;
        displayValue = '';
        operatorValue = operator.textContent;
    });
});

function evaluate() {
    // if (displayValue.includes(`.`) && secondNumber !== null) {
    //     secondNumber = parseFloat(displayValue);
    // } else if (displayValue.includes(`.`) && secondNumber === null) {
    //     firstNumber = parseFloat(displayValue);
    // }
    secondNumber = parseFloat(displayValue);
    displayValue = operation(operatorValue, firstNumber, secondNumber);
    displayDiv.textContent = displayValue;
}

function clearScreen() {
    displayValue = '';
    firstNumber = null;
    secondNumber = null;
    operatorValue = null;
    displayDiv.textContent = displayValue;
}

function deleteNumber() {
    displayValue = displayValue.toString().slice(0, -1);
    displayDiv.textContent = displayValue;
}

function addDecimal() {
    displayValue += '.';
    decimalValue = displayValue.includes(`${secondNumber}`) ? secondNumber = parseFloat(displayValue) : firstNumber = parseFloat(displayValue);
    displayDiv.textContent = decimalValue;
}

// Add two numbers
function add(a, b) {
    return a + b;
}

// Subtract two numbers
function subtract(a, b) {
    return a - b;
}

// Divide two numbers
function divide(a, b) {
    if (b === 0) {
        displayDiv.textContent = 'Yo!';
    };

    return a / b;
}

// Multiply two numbers
function multiply(a, b) {
    return a * b;
}

// calls the above functions
function operation(operator, a, b) {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '/':
            return divide(a, b);
        case '*':
            return multiply(a, b);
        default:
            return null;
    }
}